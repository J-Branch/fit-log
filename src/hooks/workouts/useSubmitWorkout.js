import { useState } from "react";
import { ID } from "appwrite";
import { createRow, updateRow } from "../../api/appwrite.workout";
import toast from "react-hot-toast";
import { useWorkoutContext } from "../../context/workout.context"
import { getCurrentAuthSession } from "../../api/appwrite.auth";
//import { useNavigate } from "react-router-dom";

export function useSubmitWorkout({ form, isEditMode, onSuccess }) {
    const { setRefreshData } = useWorkoutContext();
    //const navigate = useNavigate();
    const [submitStatus, setSubmitStatus] = useState("IDLE");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const currentUser = await getCurrentAuthSession();

        if(submitStatus === "PENDING") return;

        try {
            setSubmitStatus("PENDING");

            const { workoutName, workoutType, date, time, distance, exercises } = form;

            if(!workoutName || !workoutType || !date.month || !date.day || !date.year) {
                toast.error("Please fill out all required fields.");
                setSubmitStatus("ERROR");
                return;
            }

            if (
                workoutType === "Distance/Time" &&
                (distance === "" || time.minutes === "" || time.seconds === "")
            ) {
                toast.error("Please fill out all distance/time fields.");
                setSubmitStatus("ERROR");
                return;
            }

            const workoutDate = `${date.month.padStart(2, "0")}-${date.day.padStart(
                2, "0"
            )}-${date.year}`;
            const totalSeconds = Number(time.minutes) * 60 + Number(time.seconds);

            const wid = ID.unique();
            const payload = {
                userId: currentUser.$id,
                workoutName: workoutName,
                workoutType: workoutType,
                date: workoutDate,
                time: totalSeconds,
                distance: Number(distance),
            };

            if(isEditMode && form.$id) {
                await updateRow("workouts", form.$id, payload);
                toast.success("Workout Updated!");
            } else {
                await createRow(currentUser.$id, "workouts", wid, payload);
                toast.success("Workout created!");
            }


            if(workoutType === "Weightlifting" && exercises?.length > 0) {
                for(const exercise of exercises) {
                    if(!exercise.name) continue;
                    const eid = ID.unique();

                    await createRow(currentUser.$id, "exercises", eid, {
                        //wid: isEditMode ? form.$id : wid,
                        wid: wid,
                        exerciseName: exercise.name,
                    });

                    for(const set of exercise.sets) {
                        if(!set.reps && !set.weight) continue;
                        await createRow(currentUser.$id, "sets", ID.unique(), {
                            eid: eid,
                            setCounter: Number(set.setCounter),
                            reps: Number(set.reps),
                            weight: Number(set.weight),
                        });
                    }
                }
            }

            setSubmitStatus("SUCCESS");
            setRefreshData(true);
            onSuccess?.();

        } catch (err) {
            console.error(err);
            toast.error("Error saving workout.");
            setSubmitStatus("ERROR");
        }
    };

    return {
        submitStatus,
        handleSubmit,
    };

}