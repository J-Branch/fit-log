import { Client, Databases, Account, TablesDB } from "appwrite";

const client = new Client();
client 
    .setEndpoint("https://nyc.cloud.appwrite.io/v1")
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// these will be imported instead of being declared every they are needed
export const account = new Account(client);
export const database = new Databases(client);
export const tablesdb = new TablesDB(client);