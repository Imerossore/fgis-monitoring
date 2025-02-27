import Header from "@/components/Header";
import SetupProfile from "@/components/Setup-profile";
import SideBar from "@/components/SideBar";
import { getProfile } from "@/lib/getAuthUser";
import Image from "next/image";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getProfile();
  const role = user?.id;

  return (
    <div className="flex h-full ">
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-gradient -z-10 bg-gradient">
        <Image
          src="/images/bg-pattern.svg"
          alt="Background Pattern"
          fill
          style={{ objectFit: "cover" }}
          className="fixed top-0 left-0 w-full h-full opacity-50"
        />
      </div>
      {role && (
        <div className=" w-[20%] h-full relative">
          <SideBar />
        </div>
      )}

      <div className="flex flex-col flex-1">
        <div className="h-20 ">
          <Header />
        </div>

        <main className="flex-1">{!role ? <SetupProfile /> : children}</main>
      </div>
    </div>
  );
}
