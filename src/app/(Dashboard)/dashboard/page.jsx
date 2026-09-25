import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";

export default async function DashboardRootPage() {
  const user = await getUserSession();

  if (!user) {
    redirect("/signin");
  }

  if (user.role === "admin") {
    redirect("/dashboard/admin/overview");
  } else if (user.role === "librarian") {
    redirect("/dashboard/librarian/overview");
  } else {
    redirect("/dashboard/reader/overview");
  }
}
