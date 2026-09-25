"use server"

import { getToken } from "./session";

const authHeader = async () => {
  try {
    const token = await getToken();
    const header = token ? {
      authorization: `Bearer ${token}`
    } : {};
    return header;
  } catch (error) {
    console.error("authHeader error:", error?.message);
    return {};
  }
};

export const serverMutation = async (key, operation, data) => {
  const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";
  const res = await fetch(`${backendUrl}/${key}`, {
    method: operation,
    headers: {
      "Content-Type": "application/json",
      ...await authHeader()
    },
    body: JSON.stringify(data),
    signal: AbortSignal.timeout(8000)
  });
  if (!res.ok) {
    throw new Error(`Mutation failed: ${res.statusText}`);
  }
  return res.json();
};

export const serverFetch = async (key, query = "") => {
  const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${backendUrl}/${key}${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...await authHeader()
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(5000)
    });

    if (!res.ok) {
      console.error(`serverFetch error: ${res.status} ${res.statusText} for ${key}`);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error(`serverFetch failed for ${key}:`, error.message);
    return [];
  }
};