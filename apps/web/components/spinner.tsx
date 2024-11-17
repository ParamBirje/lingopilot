import { CircularProgress } from "@nextui-org/progress";
import React from "react";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] w-full">
      <CircularProgress color="secondary" aria-label="Loading..." />
    </div>
  );
}
