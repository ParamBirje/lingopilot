import { Link } from "@nextui-org/link";
import { AlarmSmokeIcon } from "lucide-react";

export default function Logo() {
  return (
    <Link color="foreground" href="/">
      <AlarmSmokeIcon size={18} />
      <p className="ml-2 font-bold text-inherit">VAPOR // WAVE</p>
    </Link>
  );
}
