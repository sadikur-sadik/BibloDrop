"use server"

import { serverFetch } from "../core/server"

export const getReviews = async (id) => {
  const res = await serverFetch("reviews",`?bookId=${id}`)
  return res
}