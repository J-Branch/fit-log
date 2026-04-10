import { listRows, getRow } from "../api/appwrite.workout";
import { Query } from "appwrite";


export async function editWorkoutLoader({ params }) {
    const workoutId = params.id;

    try {

        const workout = await getRow({
            tableId: "workouts",
            rowId: workoutId,
        });

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

            return fullExercises;
        } else {
            return workout;
        }
    
    } catch (err) {
        return err.message;
    }
}