"use client";

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { User } from "@phosphor-icons/react";
import { UserButton, useUser } from "@stackframe/stack";
import { siteConfig } from "@/config/site";

export default function UserButtonClient() {
  const user = useUser();

  if (user) {
    return <UserButton />;
  } else {
    return (
      <Button
        as={Link}
        className="text-sm font-normal text-default-600 bg-default-100"
        href={siteConfig.links.signin}
        startContent={<User size={16} weight="fill" />}
        variant="flat"
      >
        Sign In
      </Button>
    );
  }
}
