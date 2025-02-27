"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function UserManagementPage() {
  return (
    <div className="glassmorphic mr-3 p-3  flex flex-col gap-2 ">
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
          <TabsContent value="verified" className=" bg-card p-5 rounded-sm">
            <h1>verfified table</h1>
          </TabsContent>
          <TabsContent value="pending" className="bg-card p-5 rounded-sm">
            <h1>pending table</h1>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
