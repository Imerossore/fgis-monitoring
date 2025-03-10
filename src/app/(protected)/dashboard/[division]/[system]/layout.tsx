"use client";
import { Divisions } from "@/lib/contants";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { division, system } = useParams();

  const divisionData = Divisions.find((item) => item.name === division);
  const systemData = divisionData?.systems.find((item) => item.name === system);

  if (!divisionData) {
    return (
      <div className="glassmorphic mr-3 p-3 text-white">
        <h1>Division not found</h1>
      </div>
    );
  }
  if (!systemData) {
    return (
      <div className="glassmorphic mr-3 p-3 text-white">
        <h1>System not found</h1>
      </div>
    );
  }

  return (
    <div className="glassmorphic mr-3 p-3 text-white space-y-2 flex flex-col h-full">
      <h1 className="text-3xl font-semibold">
        {division?.toLocaleString().replace(/-/g, " ").toUpperCase()}
      </h1>
      <div className="bg-card p-5 text-muted-foreground rounded-sm ">
        <ul className="list-none flex space-x-1">
          {divisionData.systems?.map((system) => (
            <li key={system.id}>
              <Link
                href={system.link}
                className={`px-2 py-1   ${
                  system.id === systemData.id
                    ? "bg-primary text-white rounded-sm"
                    : "hover:bg-slate-200 duration-300"
                }`}
              >
                {system.name.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {children}
    </div>
  );
}
