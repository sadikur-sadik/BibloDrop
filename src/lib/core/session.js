import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getUserSession = async () => {

  const res = await auth.api.getSession({
    headers: await headers(),
  })
  return res?.user || null;
}

export const getToken = async () => {

  const res = await auth.api.getSession({
    headers : await headers()
  })

  return res?.session?.token || null
  
}

export const requiredRole = async (role) => {

  const user = await getUserSession();
  if (user?.role != role) {
    redirect("/unauthorized")
  }
  if (!user) {
    redirect("/signin")
  }

  return user || null
}