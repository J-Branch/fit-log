import { Client, Account, TablesDB, Functions } from "appwrite";

const client = new Client();
client 
    .setEndpoint("https://nyc.cloud.appwrite.io/v1")
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const tablesdb = new TablesDB(client);
export const functions = new Functions(client);
export const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;