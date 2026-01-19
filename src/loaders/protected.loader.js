import { redirect } from "react-router-dom";
import { getCurrentAuthSession } from "../api/appwrite.auth";

export async function protectedLoader() {
    console.log("protected loader ran");

    const user = await getCurrentAuthSession().catch(() => null);
    if (!user) throw redirect("/login");
    return user;
}