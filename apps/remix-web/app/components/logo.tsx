import { Link } from "@nextui-org/link";
import { BotIcon } from "lucide-react";

export default function Logo() {
  return (
    <Link color="foreground" href="/">
      <BotIcon size={18} />
      <p className="ml-2 font-bold text-inherit">
        <span className="text-pink-500">LINGO</span>PILOT
      </p>
    </Link>
  );
}
