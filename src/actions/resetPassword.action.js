import { redirect } from "react-router-dom";
import { account } from "../api/appwrite.api";

export async function resetPasswordAction({ request }) {
    const formData = await request.formData();

    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    
    const url = new URL(request.url);

    const userId = url.searchParams.get("userId");
    const secret = url.searchParams.get("secret");

    try {
        await account.updateRecovery(
            userId,
            secret,
            password,
            confirmPassword
        );

        return redirect("/login?reset=success");

    } catch (error) {
        return { error: error.message };
    }
}