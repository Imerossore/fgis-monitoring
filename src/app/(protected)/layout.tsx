import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import Image from "next/image";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

      <div className=" w-[20%] h-full relative">
        <SideBar />
      </div>

      <div className="flex flex-col flex-1">
        <div className="h-20 ">
          <Header />
        </div>

        <main className="flex-1 pb-4">{children}</main>
      </div>
    </div>
  );
}
