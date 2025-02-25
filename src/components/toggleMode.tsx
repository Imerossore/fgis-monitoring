"use client";

import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { MdSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import { useState } from "react";

export default function ToggleMode() {
  const { setTheme } = useTheme();
  const [isOpen, setisOpen] = useState(false);

  const toggleDropdown = () => {
    setisOpen(!isOpen);
  };
  return (
    <DropdownMenu open={isOpen} onOpenChange={toggleDropdown}>
      <DropdownMenuTrigger asChild>
        <span
          className={` relative  rounded-full overflow-hidden hover:bg-white/20  ${
            isOpen ? "bg-white/30" : "bg-white/10"
          }`}
        >
          <MdSunny
            size={43}
            className={`scale-100 rotate-0 transition-all dark:-rotate-90 dark:scale-0  ${
              isOpen ? "permanentColor" : "fill-white"
            }  p-2.5 cursor-pointer active:scale-75`}
          />
          <IoMdMoon
            size={43}
            className={`absolute top-0 scale-0 rotate-90 transition-all dark:rotate-0 dark:scale-100 ${
              isOpen ? "permanentColor" : "fill-white"
            }  p-2.5 cursor-pointer active:scale-75`}
          />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className=" dark:bg-primary">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
