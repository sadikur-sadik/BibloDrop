"use server"

import { serverFetch } from "../core/server"

export const getUsersAPI = async () => {
  
    const res = await serverFetch("users")
    return res
}