"use server"

import { serverMutation } from "../core/server";

export const PostingBooks = async (data) => {
  const result = await serverMutation("books", "POST", data);
  return result;
};

export const togglePublish = async (id, state) => {
  const result = await serverMutation(`books/${id}`, "PATCH", { status: state })
  return result
}

export const deleteBook = async (id) => {

  const result = await serverMutation(`books/${id}`, "DELETE");

  return result
}

export const updateBookbyLibrarian = async (id, data) => {
  const result = await serverMutation(`booksUpdate/${id}`, "PATCH",  data )
  return result
}

export const approveBookByAdmin = async (id,status) => {
 
  const result = await serverMutation(`adminbooks/${id}`, "PATCH", {status:status})
  return result
} 