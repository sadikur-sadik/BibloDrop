"use server"

import { serverFetch } from "../core/server"

export const getAllBooks = async () => {
  const res = await serverFetch("books")
  return res
}