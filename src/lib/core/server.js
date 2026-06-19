"use server"

export const serverMutation = async (key, operation,  data) => {
  console.log(JSON.stringify(data));
  console.log(`${process.env.BACKEND_URL}/${key}`);
  const res = await fetch(`${process.env.BACKEND_URL}/${key}`, {
    method: operation, 
    headers: {
      "Content-Type": "application/json",
    },
    body:  JSON.stringify(data),
  });
  console.log(res)

  if (!res.ok) {
    throw new Error(`Mutation failed: ${res.statusText}`);
  }
  return res.json();
};

