import { Client, TablesDB } from 'node-appwrite';

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  // You can use the Appwrite SDK to interact with other services
  // For this example, we're using the Users service
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const tablesdb = new TablesDB(client);
  const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
  const WORKOUTS_ID = process.env.APPWRITE_WORKOUTS_ID;
  const EXERCISES_ID = process.env.APPWRITE_EXERCISES_ID;
  const SETS_ID = process.env.APPWRITE_SETS_ID;

  // try {
  //   const response = await users.list();
  //   // Log messages and errors to the Appwrite Console
  //   // These logs won't be seen by your end users
  //   log(`Total users: ${response.total}`);
  // } catch(err) {
  //   error("Could not list users: " + err.message);
  // }



  // // The req object contains the request data
  // if (req.path === "/ping") {
  //   // Use res object to respond with text(), json(), or binary()
  //   // Don't forget to return a response!
  //   return res.text("Pong");
  // }

  async function deleteRow(node) {
    if (node.table === "workouts" && node.toDelete === true) {

    }
  }

  async function updateRow(node) {

  }

  async function createRow(node) {

  }

  try {
    const payload = JSON.parse(req.body)

    // check for deletes first
    deleteRow

    // check for updates second

    // check for creates


    return res.json({sucess: true})
  } catch (err) {
    return res.json({sucess: false, message: err.message});
  }

  return res.json({
    motto: "Build like a team of hundreds_",
    learn: "https://appwrite.io/docs",
    connect: "https://appwrite.io/discord",
    getInspired: "https://builtwith.appwrite.io",
  });
};
