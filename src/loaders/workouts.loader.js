import { redirect } from "react-router-dom";
import { tablesdb, databaseId } from "../api/appwrite.api";
import { Query } from "appwrite";

export async function workoutsLoader({ request }) {
    try {
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
        
    } catch (err) {
        if (err?.code === 429) {
            return {
                workouts: [],
                total: 0,
                page: 1,
                totalPages: 1,
                error: "rate_limit",
            };
        }

        return redirect("/dashboard", {
            state: { error: "Failed to load workouts"}
        });
    }
}