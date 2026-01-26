import { getCurrentAuthSession } from "../api/appwrite.auth";
import { redirect } from "react-router-dom";

export async function authLoader() {
  const user = await getCurrentAuthSession().catch(() => null);
  if (user) {
    return redirect("/home");
  }
  return null;
}
