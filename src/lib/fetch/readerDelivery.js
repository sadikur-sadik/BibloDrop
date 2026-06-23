"use server"

import { serverFetch } from "../core/server"

export const getDeliveriesByReader = async(id) => {
  const res = await serverFetch("deliveryreader",`?userId=${id}`)
  return res
}