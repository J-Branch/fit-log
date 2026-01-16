import { redirect } from "react-router-dom";
import { getCurrentAuthSession } from "../api/appwrite.auth";

export async function authLoader() {
    console.log("hello");
    const user = await getCurrentAuthSession();

    if (user) {
        console.log("this is running");
        throw redirect("/dashboard");
    }

    console.log("the auth loader is not running");

    return null;
}