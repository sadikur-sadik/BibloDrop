"use server"

import { serverFetch } from "../core/server"

export const getAllBooks = async (query) => {
  const res = await serverFetch("books",query)
  return res
}