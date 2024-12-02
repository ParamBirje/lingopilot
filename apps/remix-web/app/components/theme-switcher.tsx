import { Switch } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeSwitcher({ size = "md" }: { size?: string }) {
  const { theme, setTheme } = useTheme();

  function handleToggle(isSelected: boolean) {
    setTheme(isSelected ? "dark" : "light");
  }

  return (
    <Switch
      defaultSelected={theme === "dark"}
      size={size as "sm" | "md" | "lg"}
      color="secondary"
      onValueChange={handleToggle}
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <MoonIcon className={className} />
        ) : (
          <SunIcon className={className} />
        )
      }
    ></Switch>
  );
}
