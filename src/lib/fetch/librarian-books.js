"use server"

import { serverFetch } from "../core/server"

export const getBooksByLibrarian = async(id) => {

  const res = await serverFetch("books",`?librarianId=${id}`)
  
  return res
}