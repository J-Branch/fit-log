import { tablesdb, databaseId } from "./appwrite.api";
import { Permission, Role } from "appwrite";
import { useUserContext } from "../context/user.context";

// const { user } = useUserContext();

export function getRow(tableId, rowId, query) {
    return tablesdb.getRow({
        databaseId,
        tableId,
        rowId,
        queries: query
    });
};

export function listRows(tableId) {
    return tablesdb.listRows({
        databaseId,
        tableId
    });
};

export function createRow(userId, tableId, rowId, payload) {
    const ownerRole = Role.user(userId);
    return tablesdb.createRow({
        databaseId,
        tableId,
        rowId,
        data: payload,
        permissions: [
            Permission.read(ownerRole),
            Permission.update(ownerRole),
            Permission.delete(ownerRole),
        ]
    });
};

export function deleteRow(tableId, rowId) {
    tablesdb.deleteRow({
        databaseId,
        tableId,
        rowId
    });
};

export function updateRow(tableId, rowId, payload) {
    const ownerRole = Role.user(userId);
    tablesdb.updateRow({
        databaseId,
        tableId,
        rowId,
        data: payload,
    });
};