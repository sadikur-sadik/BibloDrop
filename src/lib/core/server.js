"use server"

import { getToken } from "./session";


const authHeader = async () => {

  const token = await getToken();
  const header = token ? {
    authorization: `Bearer ${token}`
  } : {}

  return header

}



export const serverMutation = async (key, operation, data) => {

  const res = await fetch(`${process.env.BACKEND_URL}/${key}`, {
    method: operation,
    headers: {
      "Content-Type": "application/json",
      ...await authHeader()
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`Mutation failed: ${res.statusText}`);
  }
  return res.json();
};

export const serverFetch = async (key, query = "") => {
  const res = await fetch(`${process.env.BACKEND_URL}/${key}${query}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...await authHeader()
      },
    }
  )

  if (!res.ok) {
    throw new Error(`Mutation failed: ${res.statusText}`);
  }
  return res.json();
}