import { redirect } from "react-router-dom";
import { getCurrentAuthSession } from "../api/appwrite.auth";

export async function protectedLoader() {
    const user = await getCurrentAuthSession();

    if (!user) {
        throw redirect("/auth/login");
    }

    return null;
}