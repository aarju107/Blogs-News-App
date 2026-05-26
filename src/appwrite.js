import React from 'react'
import { Client,Account,Databases,Storage, ID } from "appwrite";

const client=new Client()

client
.setEndpoint("https://cloud.appwrite.io/v1")
.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)

export const account= new Account(client);
export const database=new Databases(client);
export const storage = new Storage(client);
export const IDhelper =ID;
export { ID };
export default client


