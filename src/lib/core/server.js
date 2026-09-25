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

const getBackendUrl = () => {
  let url = process.env.BACKEND_URL ? process.env.BACKEND_URL.trim() : "";
  
  // In production (e.g. Vercel deployment), if BACKEND_URL is empty or points to localhost, force deployed backend URL
  if (process.env.NODE_ENV === "production" || process.env.VERCEL === "1") {
    if (!url || url.includes("localhost") || url.includes("127.0.0.1")) {
      url = "https://biblo-drop-backend.vercel.app";
    }
  }

  if (!url) {
    url = "http://localhost:5000";
  }

  return url.replace(/\/+$/, "");
};

export const serverMutation = async (key, operation, data) => {
  const backendUrl = getBackendUrl();
  const res = await fetch(`${backendUrl}/${key}`, {
    method: operation,
    headers: {
      "Content-Type": "application/json",
      ...await authHeader()
    },
    body: JSON.stringify(data),
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error(`Mutation failed: ${res.statusText}`);
  }
  return res.json();
};

export const serverFetch = async (key, query = "") => {
  const backendUrl = getBackendUrl();
  try {
    const res = await fetch(`${backendUrl}/${key}${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...await authHeader()
      },
      cache: 'no-store'
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