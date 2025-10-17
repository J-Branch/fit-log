import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getWorkout } from "../../api/appwrite.workout";
import { produce } from "immer";

export function useFetchWorkout({
    workoutTableId,
    exercisesTableId,
    setsTableId,
    id,
    onSetWorkout,
}) {
    const[fetchWorkoutStatus, setFetchWorkoutStatus] = useState(id ? "IDLE" : "SUCCESS");

    const initFetchWorkout= async (workoutId) => {
        try {
            if(fetchWorkoutStatus === "PENDING") {
                return;
            }

            setFetchWorkoutStatus("PENDING");

            const workout = await getWorkout(
                workoutTableId,
                exercisesTableId,
                setsTableId,
                workoutId
            );

            onSetWorkout(
                produce((draft) => {
                    draft.$id = workout.$id;
                    draft.workoutName = workout.workoutName ?? "";
                    draft.workoutType = workout.workoutType ?? "";
                    draft.distance = workout.distance ?? "";

                    if (workout.date) draft.date = { ...draft.date, ...workout.date };
                    if (workout.time) draft.time = { ...draft.time, ...workout.time };

                    draft.exercises = Array.isArray(workout.exercises)
                        ? workout.exercises.map((exercise, i) => ({
                            name: exercise.name ?? "",
                            sets: Array.isArray(e.sets)
                                ? exercise.sets.map((set, j) => ({
                                    setCounter: set.setCounter ?? j + 1,
                                    reps: set.reps ?? "",
                                    weight: set.weight ?? "",
                                }))
                                : [{ setCounter: 1, reps: "", weight: "" }],
                        }))
                        : [{ name: "", sets: [{ setCounter: 1, reps: "", weight: "" }] }];
                })
            );
            setFetchWorkoutStatus("SUCCESS");
        
        } catch (error) {
            console.error(error);
            toast.error("Problem fetching workout.");
            setFetchWorkoutStatus("ERROR");
        }
    };

    useEffect(() => {
        if(!id) return;
        initFetchWorkout(id);
    }, [id]);

    return { fetchWorkoutStatus, initFetchWorkout };
};