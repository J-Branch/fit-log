import { ID, Permission, Role } from "appwrite";
import { account, tablesdb, databaseId } from "./appwrite.api";

export function createAccount(email, password) {
    return account.create({
        userId: ID.unique(),
        email,
        password,
    });
};

export function login(email, password) {
    return account.createEmailPasswordSession({email, password});
};

export function logout() {
    return account.deleteSession({ sessionId: "current" });
};

export function getCurrentAuthSession() {
    return account.get();
};

export function createAggregateRow(userId) {
    const ownerRole = Role.user(userId);
    return tablesdb.createRow({
        databaseId,
        tableId: "aggregate",
        rowId: ID.unique(),
        data: {
            totalWeight: 0,
            totalDistance: 0,
            userId: userId
        },
        permissions: [
            Permission.read(ownerRole),
            Permission.update(ownerRole),
            Permission.delete(ownerRole),
        ]
    })
};
