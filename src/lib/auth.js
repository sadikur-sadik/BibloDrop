import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";


const client = new MongoClient(process.env.MONGO_DB);
const db = client.db("BibloDrop");


export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  emailAndPassword: {
    enabled: true,
  }, 
  user: {
    additionalFields: {
      role: {
        defaultValue: "reader",
      },
      status: {
        defaultValue: "active",
      }
    }
  },
  baseURL: process.env.BETTER_AUTH_URL, 
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }, }
});