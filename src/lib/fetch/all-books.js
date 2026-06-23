"use server"

import { serverFetch } from "../core/server"

export const getAllBooks = async (query) => {
  const res = await serverFetch("books",query)
  return res
}
export const getAllBooksByAdmin = async () => {
  const res = await serverFetch("booksadmin")
  return res
}