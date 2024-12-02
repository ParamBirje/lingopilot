import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { siteConfig } from "~/lib/siteConfig";
import { UserOnboarding } from "~/types";
import { title } from "~/components/primitives";
import { Button } from "@nextui-org/button";
import { GaugeIcon, LanguagesIcon } from "lucide-react";
import { Divider } from "@nextui-org/divider";
import { Select, SelectItem } from "@nextui-org/select";
import React from "react";
import {
  getSupabaseEnv,
  getSupabaseWithUserSessionAndHeaders,
} from "~/lib/supabase.server";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useSupabase } from "~/lib/supabase";
import { getFromLanguages, getToLanguages } from "~/services/api/languages";
import { getAvailableDifficulty } from "~/services/api/difficulty";

export async function loader({ request }: LoaderFunctionArgs) {
  const { serverSession, headers, user } =
    await getSupabaseWithUserSessionAndHeaders({ request });

  if (!user) {
    throw redirect(siteConfig.links.signin);
  }

  if (user.user_metadata?.onboarding) {
    throw redirect(siteConfig.links.dashboard);
  }

  const fromLang = await getFromLanguages();
  const toLang = await getToLanguages();
  const difficulties = await getAvailableDifficulty();

  return {
    env: getSupabaseEnv(),
    serverSession,
    headers,
    fromLang,
    toLang,
    difficulties,
  };
}

function Onboarding() {
  const { serverSession, env, fromLang, toLang, difficulties } =
    useLoaderData<typeof loader>();
  const { supabase } = useSupabase({ env, session: serverSession });
  const [loading, setLoading] = React.useState(false);
  const [onboarding, setOnboarding] = React.useState<UserOnboarding>();
  const navigate = useNavigate();

  async function handleSave() {
    if (!onboarding?.toLang) return;
    if (!onboarding?.fromLang) return;
    if (!onboarding?.difficulty) return;

    setLoading(true);
    try {
      await supabase.auth.updateUser({
        data: {
          onboarding: onboarding,
        },
      });
      navigate(siteConfig.links.dashboard);
      // TODO: show toast
    } catch (error) {
      console.error(error);
      // TODO: show toast
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col gap-8 items-center justify-center max-w-5xl mx-auto">
      <h1 className={title()}>Onboarding</h1>

      <Card className="w-full md:w-1/2">
        <CardHeader className="flex gap-3">
          <Button disabled isIconOnly color="danger">
            <LanguagesIcon />
          </Button>
          <div className="flex flex-col">
            <p className="text-md">Language Setup</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="py-5 px-3 flex flex-col gap-4">
          <p className="text-default-500 text-sm">
            This will be the language that will be used to teach you the new
            language.
          </p>

          <Select
            disallowEmptySelection
            disabledKeys={toLang
              .filter((lang) => lang.isDisabled)
              .map((lang) => lang.key)}
            label="Language You Speak"
            placeholder="Select here"
            onSelectionChange={(keys) => {
              const selectedKey = keys.currentKey;
              setOnboarding((prev) => ({
                ...prev,
                fromLang: fromLang.find((lang) => lang.key === selectedKey),
              }));
            }}
          >
            {fromLang.map((lang) => (
              <SelectItem key={lang.key} startContent={lang.flag}>
                {lang.name}
              </SelectItem>
            ))}
          </Select>

          <Divider />

          <p className="text-default-500 text-sm">
            This will be the language that will be taught to you.
          </p>

          <Select
            disallowEmptySelection
            disabledKeys={toLang
              .filter((lang) => lang.isDisabled)
              .map((lang) => lang.key)}
            label="Language You Want to Learn"
            placeholder="Select here"
            onSelectionChange={(keys) => {
              const selectedKey = keys.currentKey;
              setOnboarding((prev) => ({
                ...prev,
                toLang: toLang.find((lang) => lang.key === selectedKey),
              }));
            }}
          >
            {toLang.map((lang) => (
              <SelectItem key={lang.key} startContent={lang.flag}>
                {lang.name}
              </SelectItem>
            ))}
          </Select>
        </CardBody>
      </Card>

      <Card className="w-full md:w-1/2">
        <CardHeader className="flex gap-3">
          <Button disabled isIconOnly color="warning">
            <GaugeIcon />
          </Button>

          <div className="flex flex-col">
            <p className="text-md">Difficulty</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="py-5 px-3 flex flex-col gap-4">
          <Select
            disallowEmptySelection
            aria-label="difficulty"
            placeholder="Select here"
            selectionMode="single"
            onSelectionChange={(keys) => {
              const selectedKey = Number(keys.currentKey);
              setOnboarding((prev) => ({
                ...prev,
                difficulty: difficulties.find(
                  (diff) => diff.id === selectedKey
                ),
              }));
            }}
          >
            {difficulties.map((diff) => (
              <SelectItem key={diff.id} startContent={diff.emoji}>
                {diff.label}
              </SelectItem>
            ))}
          </Select>

          {/* <p className="text-default-500 text-sm"> */}
          {/*   You can change the difficulty level at any time in the settings. */}
          {/* </p> */}
        </CardBody>
      </Card>

      <Card className="w-full md:w-1/2">
        <CardFooter className="flex justify-between gap-4">
          <p className="text-default-500 text-xs w-full md:w-1/2">
            This data will be used to personalize your learning experience.
          </p>
          <Button
            isDisabled={loading}
            isLoading={loading}
            onClick={handleSave}
            color="primary"
            variant="solid"
            className="w-fit"
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Onboarding;
