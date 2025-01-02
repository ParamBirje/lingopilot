import { Switch } from "@nextui-org/switch";
import { Moon, Sun } from "phosphor-react";
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
          <Moon className={className} />
        ) : (
          <Sun className={className} />
        )
      }
    ></Switch>
  );
}
