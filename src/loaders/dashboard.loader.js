import { listRows } from "../api/appwrite.workout";
import { Query } from "appwrite";

export async function dashboardLoader() {
    try {
        const now = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);

        const [prevWeight, prevDistance, monthData] = await Promise.all([
            listRows("workouts", [Query.orderDesc("date"), Query.equal("workoutType", "WeightLifting"), Query.limit(1)]),
            listRows("workouts", [Query.orderDesc("date"), Query.equal("workoutType", "Distance/Time"), Query.limit(1)]),
            listRows("workouts", [Query.between("date", thirtyDaysAgo.toISOString(), now.toISOString()), Query.limit(100)])
        ]);

        const rows = monthData.rows || [];

        const weightWorkouts = rows.filter(r => r.workoutType === "Weightlifting");
        const distanceWorkouts = rows.filter(r => r.workoutType === "Distance/Time");

        const totalMonthlyWeight = weightWorkouts.reduce((acc, curr) => acc + (curr.totalWeight || 0), 0);
        const totalMonthlyDistance = distanceWorkouts.reduce((acc, curr) => acc + (curr.distance || 0), 0);

        const avgWeight = weightWorkouts.length > 0 ? totalMonthlyWeight / weightWorkouts.length : 0;
        const lastThreeWeight = weightWorkouts.slice(0, 3);
        const lastThreeWeightAvg = lastThreeWeight.length > 0 
            ? lastThreeWeight.reduce((acc, curr) => acc + curr.totalWeight, 0) / lastThreeWeight.length 
            : 0;

        const peakLift = weightWorkouts.length > 0 
            ? Math.max(...weightWorkouts.map(w => w.totalWeight)) 
            : 0;

        return {
            lastWeightliftingWorkout: prevWeight.rows[0] || null,
            lastDistanceWorkout: prevDistance.rows[0] || null,
            stats: {
                monthlyWeight: totalMonthlyWeight,
                monthlyDistance: totalMonthlyDistance.toFixed(2),
                workoutCount: rows.length,
                weightTrend: lastThreeWeightAvg > avgWeight ? "up" : "down",
                weightTrendDiff: (lastThreeWeightAvg - avgWeight).toFixed(1),
                peakLift: peakLift,
                distanceAvg: (totalMonthlyDistance / (distanceWorkouts.length || 1)).toFixed(2)
            }
        };
    } catch (err) {
        console.error("Loader error: ", err);
    }
}