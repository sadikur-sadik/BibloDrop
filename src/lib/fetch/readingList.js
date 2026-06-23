"use server"

import { serverFetch } from "../core/server"

export const getReaderReadingList = async(id) => {
  const res = await serverFetch("readinglist",`?userId=${id}`)
  return res
}