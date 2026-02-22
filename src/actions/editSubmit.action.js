import { ID } from "appwrite";
import { createRow, deleteRow, updateRow } from "../api/appwrite.workout";
import { redirect } from "react-router-dom";
import { getCurrentAuthSession } from "../api/appwrite.auth";

export async function editSubmit({ request }) {
    try {
        const user = await getCurrentAuthSession();
        const formData = await request.formData();
        const form = JSON.parse(formData.get("payload"));
        const { workoutName, workoutType, date, time, distance, exercises } = form

        // if (formData.get("deleteWorkout") === "true") {
        //     await deleteRow("workouts", form.$id);
        //     return redirect("../workouts?deleted=true");
        // }

        const workoutDate = `${date.year}-${date.month.padStart(2, "0")}-${date.day.padStart(
            2, "0"
        )}`;

        // if (!time.minutes && !time.seconds) {
            
        // }
        const totalTime = Number(time.minutes) * 60 + Number(time.seconds);

        // function buildPayload(table, node) {
        //     switch(table) {
        //         case "workouts": {
        //             return {
        //                 workoutName: workoutName,
        //                 date: workoutDate || null,
        //                 time: totalTime || null,
        //             };
        //         }

        //         case "exercises": {
        //             return {};
        //         }

        //         case "sets": {
        //             return {};
        //         }

        //         default:
        //             return {};
        //     }
        // }

        async function deleteWorkoutRow(node) {
            // if (node.toDelete && node.table === "workouts") {
            //     await deleteRow(node.table, node.$id);
            //     return;
            // } 

            if (node.toDelete) {
                await deleteRow(node.table, node.$id);
                return;
            }

            if (Array.isArray(node.exercises)) {
                for (const exercise of node.exercises) {
                    await deleteWorkoutRow(exercise);
                }
            }

            if (Array.isArray(node.sets)) {
                for (const set of node.sets) {
                    await deleteWorkoutRow(set);
                }
            }
        }
        

        // will recursively walk through the form and call update on anything that needs to be updated
        async function updateWorkoutRow(node) {
            if (node.isDirty && node.$id) {
                await updateRow(node.table, node.$id, node);
            }

            if (Array.isArray(node.exercises)) {
                for (const exercise of node.exercises) {
                    await updateWorkoutRow(exercise);
                }
            }

            if(Array.isArray(node.sets)) {
                for (const set of node.sets) {
                    await updateWorkoutRow(set);
                }
            }
        }


        // check for any deletes first
        await deleteWorkoutRow(form);
        // check for any updates 
        await updateWorkoutRow(form);

        const wid = form.$id;

        if (workoutType === "Weightlifting") {
            // if any new exercises are added
            for (const exercise of exercises.filter(ex => ex.id === null)) {
                const eid = ID.unique();
                await createRow(user, exercise.table, eid, {
                    wid: wid,
                    exerciseName: exercise.exerciseName
                });

                // sets for recently added exercise
                for (const set of exercise.sets) {
                    await createRow(user.$id, set.table, ID.unique(), {
                        eid: eid,
                        setCounter: Number(set.setCounter),
                        reps: Number(set.reps),
                        weight: Number(set.weight),
                    });
                }
            }

            // just for any new sets to an existing exercise
            for (const exercise of exercises) {
                for (const set of exercise.sets) {
                    if (set.$id !== null) continue;

                    await createRow(user.$id, set.table, ID.unique(), {
                        eid: exercise.$id,
                        setCounter: set.setCounter,
                        reps: set.reps,
                        weight: set.weight
                    })
                }
            }
        }

        return redirect("../workouts?success=true");
 
    } catch (error) {
        return {error: error.mesage};
    }
}