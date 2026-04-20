import { listRows } from "../api/appwrite.workout";
import { Query } from "appwrite";

export async function dashboardLoader() {

    try {
        const prevWeight = await (
            listRows(
                "workouts",
                [
                    Query.orderDesc("date"),
                    Query.equal("workoutType", "WeightLifting"),
                    Query.limit(1)
                ]
            )
        )
        const prevDistance = await (
            listRows(
                "workouts",
                [
                    Query.orderDesc("date"),
                    Query.equal("workoutType", "Distance/Time"),
                    Query.limit(1)
                ]
            )
        )

        console.log("Previous weight", prevWeight.rows[0]);
        console.log("Previous distance", prevDistance.rows[0]);

        return {
            lastWeightliftingWorkout: prevWeight.rows || null,
            lastDistanceWorkout: prevDistance.rows || null
        };

    } catch (err) {
        console.error("Loader error: ", err)
    }
}