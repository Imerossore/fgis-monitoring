import { iconMap, menuItems } from "@/lib/contants";
import Logo from "./Logo";
import SidebarLink from "./SideBarLink";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getProfile } from "@/lib/getAuthUser";
import MenuOption from "./MenuOption";

export default async function Sidebar() {
  const user = await getProfile();

  return (
    <nav className="absolute inset-4 bg-card shadow-lg rounded-2xl p-3 pt-4 flex flex-col">
      <div className="flex items-center justify-center gap-2 pb-7">
        <Logo href="/dashboard" height={95} />
        <span className="h-16 w-[1.5px] bg-black dark:bg-slate-100"></span>
        <div className="flex flex-col items-center">
          <h1 className="text-6xl font-bold text-primary leading-none dark:text-slate-100">
            NIA
          </h1>
          <p className="font-semibold tracking-[0.3rem] leading-none">UPRIIS</p>
          <p className="text-[0.6rem] font-semibold leading-none">
            FGIS MONITORING
          </p>
        </div>
      </div>

      <hr className="w-[80%] mx-auto bg-black dark:bg-white" />

      <div className="flex-grow">
        {menuItems.map((section) => (
          <div key={section.title} className="my-5">
            <h2 className="text-sm font-semibold uppercase text-gray-800 mb-2 px-2 dark:text-slate-100">
              {section.title}
            </h2>

            <ul className="space-y-1">
              {section.items.map((item) => {
                const IconComponent = iconMap[item.icon];

                return (
                  <SidebarLink
                    key={item.label}
                    icon={<IconComponent />}
                    label={item.label}
                    href={item.href}
                  />
                );
              })}
              <hr className="w-[80%] mx-auto bg-black dark:bg-white" />
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-slate-200 flex items-center justify-between p-2 gap-2 rounded-2xl mt-auto">
        <Avatar>
          {user?.avatar_url ? (
            <AvatarImage src={user.avatar_url} alt="User profile" />
          ) : (
            <AvatarImage
              src="/images/user-placeholder.png"
              alt="User profile"
            />
          )}

          <AvatarFallback>
            {user?.firstname?.charAt(0)}
            {user?.lastname?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col leading-none">
          <h1 className="font-semibold">
            {user ? `${user.first_name} ${user.last_name}` : "Guest"}
          </h1>
          <span className="text-xs">{user?.role || "User"}</span>
        </div>
        <MenuOption variant="more" iconClassName="text-black" />
      </div>
    </nav>
  );
}
