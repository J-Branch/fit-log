import { redirect } from "react-router-dom";
import { getCurrentAuthSession } from "../api/appwrite.auth";
import { listRows, getRow } from "../api/appwrite.workout";

export async function protectedLoader() {
    console.log("protected loader ran");

    const user = await getCurrentAuthSession().catch(() => null);
    if (!user) return redirect("/login");

    console.log("getting stuff from db...");
    console.log("user id is: ", user.$id);

    const quotesRes = await listRows("daily_quote");
    const aggregateRes = await listRows("aggregate");

    const dailyQuote = quotesRes.rows;
    const userAggregate = aggregateRes.rows;

    return {
        dailyQuote,
        userAggregate,
    };
}