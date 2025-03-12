import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PendingUserComponent from "@/components/PendingUserComponent";
import VerifiedUserComponent from "@/components/VerifiedUserComponent";
import { getPendingUsers, getVerifiedUsers } from "@/actions/users";
import UsermanagementLoading from "./loading";

export default function UserManagementPage() {
  return (
    <div className="glassmorphic mr-3 p-3 flex flex-col gap-2 h-full mb-3">
      <h1 className="text-3xl font-bold text-white">User Management</h1>
      <p className="text-white">
        Manage user accounts by assigning roles. Only verified users will be
        able to log in and utilize the FGIS monitoring system.
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

          <TabsContent value="verified" className="h-[70vh] rounded-sm">
            <Suspense fallback={<UsermanagementLoading />}>
              <VerifiedUsers />
            </Suspense>
          </TabsContent>

          <TabsContent value="pending" className="h-[70vh] rounded-sm">
            <Suspense fallback={<UsermanagementLoading />}>
              <PendingUsers />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

async function VerifiedUsers() {
  const verifiedUserData = await getVerifiedUsers();
  return <VerifiedUserComponent users={verifiedUserData} />;
}

async function PendingUsers() {
  const pendingUserData = await getPendingUsers();
  return <PendingUserComponent users={pendingUserData} />;
}
