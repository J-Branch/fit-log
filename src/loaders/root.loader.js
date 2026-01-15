import { getCurrentAuthSession } from "../api/appwrite.auth";

export async function rootLoader() {
    try {
        const user = await getCurrentAuthSession();
        console.log("user found");
        return { user };
    } catch {
        console.log("user is not found");
        return { user: null };
    }
}