import { Client, Account } from "appwrite";

console.log("Endpoint:", process.env.REACT_APP_APPWRITE_ENDPOINT);
console.log("Project ID:", process.env.REACT_APP_APPWRITE_PROJECT_ID);

const client = new Client()
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT) 
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID); 

export const account = new Account(client);
export default client;
