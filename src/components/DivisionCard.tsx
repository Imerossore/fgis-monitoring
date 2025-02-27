import { Card, CardContent } from "./ui/card";
import Link from "next/link";

export default function DivisionCard({
  name,
  link,
}: {
  name: string;
  link: string;
}) {
  return (
    <Card className="glassmorphic h-32 bg-opacity-0 rounded-2xl p-4 hover:scale-[1.02] duration-300">
      <CardContent className="p-0 flex flex-col justify-between  gap-2 h-full">
        <div>
          <h1 className="text-white font-bold text-3xl leading-none m-0 ">
            {name}
          </h1>
        </div>

        <div className="flex justify-center  ">
          <button className="glassmorphic bg-opacity-0 text-white font-semibold py-2 rounded-full w-36 overflow-hidden">
            <Link href={link}>View Division</Link>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
