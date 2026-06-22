"use server"

import { serverFetch } from "../core/server"

export const getSingleBook = async (id) => {
  const res = await serverFetch(`books/${id}`)
  return res
}