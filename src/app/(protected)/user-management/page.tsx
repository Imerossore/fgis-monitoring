import { getPendingUsers, getVerifiedUsers } from "@/actions/users";
import PendingUserComponent from "@/components/PendingUserComponent";
import VerifiedUserComponent from "@/components/VerifiedUserComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function UserManagementPage() {
  const verifiedUserData = await getVerifiedUsers();
  const PendingUserData = await getPendingUsers();

  return (
    <div className="glassmorphic mr-3 p-3 flex flex-col gap-2 h-full mb-3">
      <h1 className="text-3xl font-bold text-white">User Management</h1>
      <p className="text-white">
        Manage user accounts by assigning roles. Only verified users will be
        able to login and utilize the FGIS monitoring system.
      </p>
      <div>
        <Tabs defaultValue="verified">
          <TabsList>
            <TabsTrigger
              value="verified"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Verified
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Pending
            </TabsTrigger>
          </TabsList>
          <TabsContent value="verified" className=" h-[70vh]  rounded-sm">
            <VerifiedUserComponent users={verifiedUserData} />
          </TabsContent>
          <TabsContent value="pending" className=" h-[70vh] rounded-sm">
            <PendingUserComponent users={PendingUserData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
