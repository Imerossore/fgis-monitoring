import { logout } from "@/actions/auth";

export default function DashboardPage() {
  return (
    <div>
      DashboardPage
      <form action={logout}>
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}
