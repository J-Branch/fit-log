import { redirect } from "react-router-dom";
import { getCurrentAuthSession } from "../api/appwrite.auth";

export async function protectedLoader() {
   const user = await getCurrentAuthSession();
   if (!user) {
    console.log("protected loader runnung");
    console.log("current user", user);
    throw redirect("/auth/login");
   }

   console.log("hello");
   return user;
}