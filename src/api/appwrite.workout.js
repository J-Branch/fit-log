import { tablesdb, databaseId } from "./appwrite.api";
import { Permission, Role } from "appwrite";


export function getRow(tableId, rowId, query) {
    return tablesdb.getRow({
        databaseId,
        tableId,
        rowId,
        queries: query
    });
};

export function listRows(tableId, query) {
    return tablesdb.listRows({
        databaseId,
        tableId,
        queries: query
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