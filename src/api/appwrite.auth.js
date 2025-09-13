import { ID } from "appwrite";
import { account } from "./appwrite.api";

export function createAccount(email, password) {
    return account.create({
        userId: ID.unique(),
        email,
        password,
    });
}

export function login(email, password) {
    return account.createEmailPasswordSession({email, password});
}

export function getCurrentAuthSession() {
    return account.get();
}
