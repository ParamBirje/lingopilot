"use client";
import { Progress } from "@nextui-org/progress";
import React from "react";

export default function FakeProgressBar({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const [progress, setProgress] = React.useState({
    value: 0,
  });

  React.useEffect(() => {
    const intervalDelay = 1500;
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * 10) + 1;

      if (progress.value + random >= 100) {
        clearInterval(interval);
        setProgress({ value: 100 });
      } else {
        setProgress((prev) => ({
          value: prev.value + random,
        }));
      }
    }, intervalDelay);

    return () => clearInterval(interval);
  }, []);

  return (
    <Progress
      size={size}
      aria-label="Loading..."
      value={progress.value}
      className={"w-full " + className}
    />
  );
}
