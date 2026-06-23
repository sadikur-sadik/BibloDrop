"use server"

import { serverFetch } from "../core/server"

export const getDeliveriesByLibrarian = async(librarianId, userId) => {

  const res = await serverFetch("deliveryrequests",`?librarianId=${librarianId}&${userId}`)
  
  return res
}