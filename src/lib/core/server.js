"use server"

export const serverMutation = async (key, operation, data) => {
  
  const res = await fetch(`${process.env.BACKEND_URL}/${key}`, {
    method: operation,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`Mutation failed: ${res.statusText}`);
  }
  return res.json();
};

export const serverFetch = async (key,query="") => {
  const res = await fetch(`${process.env.BACKEND_URL}/${key}${query}`)

  if (!res.ok) {
    throw new Error(`Mutation failed: ${res.statusText}`);
  }
  return res.json();
}