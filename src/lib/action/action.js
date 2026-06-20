"use server"

import { serverMutation } from "../core/server";

export const PostingBooks = async (data) => {
  const result = await serverMutation("books", "POST", data);
  return result;
};

export const togglePublish = async (id,state) =>{
const result = await serverMutation (`books/${id}`,"PATCH",{status : state})
return result
}

export const deleteBookbyLibrarian = async(id)=>{

  const result = await serverMutation(`books/${id}`,"DELETE");

  return result
}