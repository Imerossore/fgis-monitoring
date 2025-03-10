import { getSystemData } from "@/actions/system";
import SystemDataComponent from "@/components/SystemDataComponent";
import { getAuthUser } from "@/lib/getAuthUser";

export default async function SystemPage() {
  const data = await getSystemData();
  const user = await getAuthUser();

  return (
    <div className="h-full bg-card rounded-sm">
      {user && <SystemDataComponent data={data} user={user} />}
    </div>
  );
}
