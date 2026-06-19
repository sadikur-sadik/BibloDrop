"use server"

import { serverMutation } from "../core/server";

export const PostingBooks = async (data) => {
  const result = await serverMutation("books", "POST", data);
  return result;
};