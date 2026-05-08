import { redirect } from "react-router-dom";
import { recoverAccount } from "../api/appwrite.auth";

export async function recoveryAction({ request }) {
    try {
        const formData = await request.formData();
        const email = formData.get("email");

        if (!email) {
            throw new Error("email cannot be empty");
        }

        await recoverAccount(email);
        // return redirect("http://localhost:5173/reset-password");
    } catch (err) {
        console.error("recovery action error: ", err.message);
    }
}