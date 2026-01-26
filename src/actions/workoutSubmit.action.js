import { ID } from "appwrite";
import { createRow, deleteRow, updateRow } from "../api/appwrite.workout";
import { useNavigation, useActionData, redirect } from "react-router-dom";
import { getCurrentAuthSession } from "../api/appwrite.auth";

export async function workoutSubmit({ request }) {
    try {
        const user = await getCurrentAuthSession();
        const formData = await request.formData();


        // for workout table
        const workoutName = formData.get("workoutName");
        const workoutType = formData.get("workoutType");
        const dateMonth = formData.get("dateMonth");
        const dateDay = formData.get("dateDay");
        const dateYear = formData.get("dateYear");

        // for if workout type is Distance/Time
        const minutes = formData.get("durationMinutes");
        const seconds = formData.get("durationSeconds");
        const distance = formData.get("distance");

        if (!workoutName || !workoutType || !dateMonth || !dateDay || !dateYear) {
            return {error: "workout name, type, and date are required."};
        }

        const workoutDate = `${dateYear}-${dateMonth.padStart(2, "0")}-${dateDay.padStart(
            2, "0"
        )}`;

        const wid = ID.unique();
        const payload = {
            userId: user.$id,
            workoutName: workoutName,
            workoutType: workoutType,
            date: workoutDate,
        }

        // logic for creating Distance/Time exercise
        if (workoutType === "Distance/Time") {
            if (!distance || !minutes || !seconds) {
                return {error: "Distance/Time workouts require distance, minutes, and seconds."};
            }

            const totalTime = Number(minutes) * 60 + Number(seconds);

            const newPayload = {
                ...payload,
                time: totalTime,
                distance: Number(distance),
            }

            try {
                await createRow(user.$id, "workouts", wid, newPayload);
                return redirect("../workouts?success=true");
            } catch {
                return {error: "Failed to create workout."};
            }
        } else {

            // logic for creating Weightlifting exercise
            await createRow(user.$id, "workouts", wid, payload);

            const exercises = formData.get("exercises");
            const exerciseArray = JSON.parse(exercises);
            for (const exercise of exerciseArray) {
                if (!exercise.name) continue;
                const eid = ID.unique();
                
                await createRow(user.$id, "exercises", eid, {
                    wid: wid,
                    exerciseName: exercise.name,
                });

                for(const set of exercise.sets) {
                    if (!set.reps && !set.weight) continue;
                    await createRow(user.$id, "sets", ID.unique(), {
                        eid: eid,
                        setCounter: Number(set.setCounter),
                        reps: Number(set.reps),
                        weight: Number(set.weight),
                    });
                }
            }

            return redirect("../workouts?success=true");
        }


    } catch (error) {
        return {error: error};
    }
}