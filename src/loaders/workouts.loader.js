import { tablesdb, databaseId } from "../api/appwrite.api";
import { Query } from "appwrite";

export async function workoutsLoader({ request }) {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;

    const limit = 9;
    const offset = (page - 1) * limit;

    const res = await tablesdb.listRows({
        databaseId,
        tableId: "workouts",
        queries: [
            Query.limit(limit),
            Query.offset(offset),
        ]
    });

    return {
        workouts: res.rows,
        total: res.total,
        page,
        totalPages: Math.ceil(res.total / limit),
    };
}