import { redirect } from "react-router-dom";
import { getCurrentAuthSession } from "../api/appwrite.auth";

export async function authLoader() {
    console.log("auth ran");
    const user = getCurrentAuthSession().catch(() => null);

    if (user) {
        throw redirect("/home");
    }

    return null;
}