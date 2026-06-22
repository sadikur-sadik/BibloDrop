"use server"

import { serverFetch } from "../core/server"

export const getDeliveryInfo = async (userId,bookId) => {
  const res = await serverFetch("delivery", `?userId=${userId}&bookId=${bookId}`)
  return res
}