"use server"

import { serverFetch } from "../core/server"
export const getAllBooksByAdmin = async () => {
  const res = await serverFetch("booksadmin")
  return res
}