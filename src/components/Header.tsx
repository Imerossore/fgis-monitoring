import { IoNotifications } from "react-icons/io5";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { IoMdArrowDropdown } from "react-icons/io";
import ToggleMode from "./toggleMode";

export default function Header() {
  return (
    <header className="flex justify-end items-center gap-3  py-3">
      <IoNotifications fill="white" size={27} />
      <ToggleMode />
      <div className="flex items-center gap-1 glassmorphic  py-1 px-2 rounded-tr-none rounded-br-none rounded-tl-lg rounded-bl-lg border-r-0">
        <Avatar>
          <AvatarFallback>RP</AvatarFallback>
        </Avatar>

        <IoMdArrowDropdown fill="white" size={20} />
      </div>
    </header>
  );
}
