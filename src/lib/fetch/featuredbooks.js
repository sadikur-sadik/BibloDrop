"use server"

import { serverFetch } from "../core/server"

export const getFeaturedBooks = async () => {
  const res = await serverFetch("featuredbooks")
  return res
}