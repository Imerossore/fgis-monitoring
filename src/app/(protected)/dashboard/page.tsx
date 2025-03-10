import DivisionCard from "@/components/DivisionCard";
import { Divisions } from "@/lib/contants";

export default function DashboardPage() {

  return (
    <div className="flex flex-col gap-3 pr-3">
      <section className=" grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-3">
        {Divisions.map((division) => (
          <DivisionCard
            key={division.id}
            name={division.name.toUpperCase().replace("-", " ")}
            link={division.systems.map((system) => system.link)[0]}
          />
        ))}
      </section>
    </div>
  );
}
