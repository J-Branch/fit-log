import { listRows } from "../api/appwrite.workout";
import { Query } from "appwrite";
import { useRouteLoaderData } from "react-router-dom";

export async function analyticsLoader () {

    try {
        const now = new Date();
        const prev = new Date(now);
        prev.setDate(prev.getDate() - 30);

        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');

        const y = prev.getFullYear();
        const m = String(prev.getMonth() + 1).padStart(2, '0');
        const d = String(prev.getDate()).padStart(2, '0');

        const formattedToday = `${yyyy}-${mm}-${dd}`;
        const formattedPrevMonth = `${y}-${m}-${d}`;

        console.log("Today: ", formattedToday);
        console.log("Previous Month: ", formattedPrevMonth);

        const w = await listRows(
            "workouts",
            [
                Query.between("date", formattedPrevMonth, formattedToday),
                Query.limit(100)
            ]
        );

        const workoutIds = w.rows.map(workout => workout.$id);
        if (workoutIds.length === 0) {
            return [];
        }

        const e = await listRows(
            "exercises",
            [
                Query.equal("wid", workoutIds),
                Query.limit(250)
            ]
        );

        const userWorkouts = w.rows;
        const userExercises = e.rows;

        console.log("printing workouts")
        console.log(userWorkouts);

        return {
            userWorkouts,
            userExercises
        }

    } catch (err) {
        console.error("Loader error: ", err)
    }
}