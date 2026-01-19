import { redirect } from "react-router-dom";
import { login, createAccount } from "../api/appwrite.auth"
import { useAuthActionsContext } from "../context/auth.context";

export async function authAction({ request }) {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const mode = formData.get("mode");
    //const { setUser } = useUserActionsContext();

    if (!email || !password) {
        return { error: "Email and password required" };
    }

    if ( mode === "register") {
        await createAccount(email, password);
        await login(email, password);
        
    }

    await login(email, password);

    return redirect("/dashboard");
}