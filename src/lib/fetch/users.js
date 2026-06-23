"use server"

import { serverFetch } from "../core/server"

export const getUsersAPI = async (id) => {
  
    const res = await serverFetch("users",`?userId=${id}`)
    return res
}
export const getAllUsersForAdmin= async () => {
  
    const res = await serverFetch("adminusers",)
    return res
}
