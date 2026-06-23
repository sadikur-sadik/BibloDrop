"use server"

import { serverFetch } from "../core/server"

export const getBooksByLibrarian = async(id) => {

  const res = await serverFetch("bookslibrarian",`?librarianId=${id}`)
  
  return res
}