"use server"

import { serverFetch } from "../core/server"

export const getBrowseBooks = async (query) => {
  const res = await serverFetch("allbooks",`?${query}`)
  return res
}