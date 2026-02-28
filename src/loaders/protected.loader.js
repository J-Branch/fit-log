import { redirect } from "react-router-dom";
import { getCurrentAuthSession } from "../api/appwrite.auth";
import { listRows } from "../api/appwrite.workout";

export async function protectedLoader() {
    console.log("protected loader ran");

    const user = await getCurrentAuthSession().catch(() => null);
    if (!user) return redirect("/login");

    console.log("getting stuff from db...");
    console.log("user id is: ", user.$id);

    const [workoutsRes, exercisesRes, setsRes, quotesRes] = await Promise.all([
        listRows("workouts"),
        listRows("exercises"),
        listRows("sets"),
        listRows("daily_quote"),
    ]);

    const userWorkouts = workoutsRes.rows;
    const userExercises = exercisesRes.rows;
    const userSets = setsRes.rows;
    const dailyQuote = quotesRes.rows;

    return {
        userWorkouts,
        userExercises,
        userSets,
        user,
        dailyQuote,
    };
}