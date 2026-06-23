"use server"

import { serverFetch } from "../core/server"

export const getReviews = async (id) => {
  const res = await serverFetch("reviews",`?bookId=${id}`)
  return res
}
export const getAllLibrarianReviews = async (id,userId) => {
  const res = await serverFetch("librarianallreview",`?librarianId=${id}&userId=${userId}`)
  return res
}

export const getAllReviews = async()=>{
  const res = await serverFetch("allreviews")
  return res
}

