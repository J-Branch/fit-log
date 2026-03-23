import { redirect } from "react-router-dom";
import { login, createAccount, createAggregateRow, getCurrentAuthSession } from "../api/appwrite.auth"

export async function authAction({ request }) {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const mode = formData.get("mode");

    if (!email || !password) {
        return { error: "Email and password required" };
    }

    try {
        if (mode === "register") {
            await createAccount(email, password);
            await login(email, password);
            const user = await getCurrentAuthSession();
            await createAggregateRow(user.$id);
            return redirect("/home");
        } else {
            await login(email, password);
            return redirect("/home");
        }

        // await login(email, password);
        // return redirect("/home");
    } catch (err) {
        return {
            error: err.message || "Authentication failed",
        };
    }
}