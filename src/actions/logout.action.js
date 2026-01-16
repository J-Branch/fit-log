import { redirect } from "react-router-dom";
import { logout } from "../api/appwrite.auth";

export async function logoutAction() {
    await logout();
    return redirect("/auth");
}

export default function Logout() {
    return null;
}