"use server"

import { serverFetch } from "../core/server"

export const getDeliveriesByAdmin = async() => {

  const res = await serverFetch("deliveryadmin")
  return res
}