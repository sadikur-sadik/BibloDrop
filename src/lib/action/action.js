"use server"

import { serverMutation } from "../core/server";

export const PostingBooks = async (data) => {
  const result = await serverMutation("books", "POST", data);
  return result;
};
export const PostingDeliveryInfo = async (data) => {
  const result = await serverMutation("delivery", "POST", data);
  return result;
};

export const togglePublishByLibrarian = async (id, state) => {
  const result = await serverMutation(`bookslibrarian/${id}`, "PATCH", { status: state })
  return result
}
export const togglePublishByAdmin = async (id, state) => {
  const result = await serverMutation(`booksadmin/${id}`, "PATCH", { status: state })
  return result
}

export const deleteBookByLibrarian = async (id) => {
  const result = await serverMutation(`bookslibrarian/${id}`, "DELETE");
  return result
}
export const deleteBookByAdmin = async (id) => {
  const result = await serverMutation(`booksadmin/${id}`, "DELETE");
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

export const updateUserRole = async (id , role) => {
  const result = await serverMutation(`users/${id}`, "PATCH", {role:role})
  return result
}

export const deleteUser = async (id) => {
  const result = await serverMutation(`users/${id}`, "DELETE");
  return result
}

export const approveLibrarian = async (id,status) => {
  const result = await serverMutation(`userslibrarian/${id}`, "PATCH",{status:status});
  return result
}