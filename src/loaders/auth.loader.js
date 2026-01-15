import { redirect } from "react-router-dom";
import { getCurrentAuthSession } from "../api/appwrite.auth";

export async function authLoader() {
    const user = await getCurrentAuthSession();

    if (user) {
        throw redirect("/dashboard");
    }

    return null;
}