import { redirect } from "react-router-dom";
import { getCurrentAuthSession } from "../api/appwrite.auth";
import { listRows } from "../api/appwrite.workout";

export async function protectedLoader() {
    console.log("protected loader ran");

    const user = await getCurrentAuthSession().catch(() => null);
    if (!user) return redirect("/login");

    console.log("getting stuff from db...");
    console.log("user id is: ", user.$id);

    const [workoutsRes, exercisesRes, setsRes] = await Promise.all([
        listRows("workouts"),
        listRows("exercises"),
        listRows("sets"),
    ]);

    const userWorkouts = workoutsRes.rows;
    const userExercises = exercisesRes.rows;
    const userSets = setsRes.rows;

    return {
        userWorkouts,
        userExercises,
        userSets,
        user,
    };
}