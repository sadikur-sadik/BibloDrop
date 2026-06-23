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
export const PostingReview = async (data) => {
  const result = await serverMutation("review", "POST", data);
  return result;
}

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
export const deleteReviewByReader= async (id) => {
  const result = await serverMutation(`reviewreader/${id}`, "DELETE");
  return result
}

export const updateBookbyLibrarian = async (id, data) => {
  const result = await serverMutation(`booksupdate/${id}`, "PATCH",  data )
  return result
}
export const updateReviewByReader  = async (id, data) => {
  const result = await serverMutation(`reviewreader/${id}`, "PATCH",  data )
  return result
}

export const approveBookByAdmin = async (id,status) => {
  const result = await serverMutation(`adminbooks/${id}`, "PATCH", {status:status})
  return result
} 

export const updateUserRole = async (id , role) => {
  const result = await serverMutation(`usersrole/${id}`, "PATCH", {role:role})
  return result
}

export const deleteUser = async (id) => {
  const result = await serverMutation(`users/${id}`, "DELETE");
  return result
}

export const approveLibrarian = async (id,status) => {
  const result = await serverMutation(`approvelibrarian/${id}`, "PATCH",{status:status});
  return result
}

export const updateDeliveryStatusByLibrarian = async(id,status)=>{
  const result = await serverMutation(`deliverylevelup/${id}`, "PATCH",{status:status});
  return result
}
export const adjustQuantity = async(id)=>{
  const result = await serverMutation(`quantity/${id}`, "PATCH");
  return result
}