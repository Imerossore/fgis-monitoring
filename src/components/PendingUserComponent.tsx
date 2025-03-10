import { UserType } from "@/lib/getAuthUser";
import UserCard from "./UserCard";

export default function PendingUserComponent({ users }: { users: UserType[] }) {
  return (
    <div className="h-full grid grid-cols-4 grid-rows-4 gap-3  pt-2">
      {users.length === 0 && <p>No users found</p>}
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
