import { listRows, getRow } from "../api/appwrite.workout";
import { Query } from "appwrite";


export async function editWorkoutLoader({ params }) {
    const workoutId = params.id;

    try {

        const workout = await getRow("workouts", workoutId);

        if (workout.workoutType === "Weightlifting") {

            const exercisesRes = await listRows("exercises", [
                Query.equal("wid", workoutId)
            ]);

            const exercises = exercisesRes.rows;

            const exerciseIds = exercises.map(ex => ex.$id);
            const setRes = await listRows("sets", [
                Query.equal("eid", exerciseIds)
            ]);
            const sets = setRes.rows;

            const fullExercises = exercises.map(ex => ({
                ...ex,
                sets: sets.filter(set => set.eid === ex.$id)
            }));

            return {
                workout,
                exercises: fullExercises
            };
        } else {
            return {
                workout,
                exercises: []
            };
        }
    
    } catch (err) {
        console.error("Loader error: ", err)
        console.error("Message: ", err?.message)
        console.error("Stack: ", err?.stack)
    }
}