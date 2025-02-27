import { IoNotifications } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ToggleMode from "./toggleMode";
import { getProfile } from "@/lib/getAuthUser";
import MenuOption from "./MenuOption";

export default async function Header() {
  const user = await getProfile();
  const avatar = user?.avatar_url;
  const fname = user?.first_name;
  const lname = user?.last_name;

  return (
    <header className="flex justify-end items-center gap-3 py-3">
      <IoNotifications fill="white" size={27} />
      <ToggleMode />
      <div className="flex items-center gap-1 glassmorphic  py-1 pl-2 pr-1 rounded-tr-none rounded-br-none rounded-tl-lg rounded-bl-lg border-r-0">
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>
            {fname?.charAt(0)}
            {lname?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <MenuOption variant="dropdown" buttonClassName="hover:bg-white/25" />
      </div>
    </header>
  );
}
