import { IoNotifications } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ToggleMode from "./toggleMode";
import { getProfile } from "@/lib/getAuthUser";
import MenuOption from "./MenuOption";
import { getAvatarColor, getInitials } from "@/lib/bg-color-profile";
import { User } from "lucide-react";

export default async function Header() {
  const user = await getProfile();
  const avatar = user?.avatar_url;
  const fname = user?.first_name;
  const lname = user?.last_name;

  const initials = fname && lname && getInitials(fname, lname);

  return (
    <header className="flex justify-end items-center gap-3 py-3">
      <IoNotifications fill="white" size={27} />
      <ToggleMode />
      <div className="flex items-center gap-1 glassmorphic  py-1 pl-2 pr-1 rounded-tr-none rounded-br-none rounded-tl-lg rounded-bl-lg border-r-0">
        <Avatar>
          <AvatarImage src={avatar} alt="Avatar" className="object-cover" />
          <AvatarFallback
            style={{
              backgroundColor: initials ? getAvatarColor(initials) : "white",
            }}
          >
            {initials || <User />}
          </AvatarFallback>
        </Avatar>
        <MenuOption variant="dropdown" buttonClassName="hover:bg-white/25" />
      </div>
    </header>
  );
}
