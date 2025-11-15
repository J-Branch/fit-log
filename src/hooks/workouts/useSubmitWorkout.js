import { useState } from "react";
import { ID } from "appwrite";
import { createRow, deleteRow, updateRow } from "../../api/appwrite.workout";
import { useWorkoutContext } from "../../context/workout.context";
import { useUserContext } from "../../context/user.context";
// import { getCurrentAuthSession } from "../../api/appwrite.auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useSubmitWorkout({ form }) {
    const { setRefreshData } = useWorkoutContext();
    const navigate = useNavigate();
    const [workoutSubmitStatus, setWorkoutSubmitStatus] = useState("IDLE");
    const { user } = useUserContext();
    const { workoutName, workoutType, date, time, distance, exercises, updateArray, deleteArray } = form;

    const onWorkoutSubmit = async (e) => {
        e.preventDefault();

        if (workoutSubmitStatus === "PENDING") return;

        try {
            setWorkoutSubmitStatus("PENDING");

            // const { workoutName, workoutType, date, time, distance, exercises, updateArray, deleteArray, trackChange } = form;

            if (!workoutName || !workoutType || !date.month || !date.year) {
                toast.error("Please fill out all required fields.");
                setWorkoutSubmitStatus("ERROR");
                return;
            }

            const workoutDate = `${date.year}-${date.month.padStart(2, "0")}-${date.day.padStart(
                2, "0"
            )}`;

            const wid = ID.unique();
            const payload = {
                userId: user.$id,
                workoutName: workoutName,
                workoutType: workoutType,
                date: workoutDate,
            }

            if(workoutType === "Distance/Time") {
                if(distance === "" || time.minutes === "" || time.seconds === "") {
                    toast.error("Please fill out all distance/time fields.");
                    setWorkoutSubmitStatus("ERROR");
                    return;
                }
                const totalTime = Number(time.minutes) * 60 + Number(time.seconds);

                const newPayload = {
                    ...payload,
                    time: totalTime,
                    distance: Number(distance),
                }

                await createRow(user.$id, "workouts", wid, newPayload);
                setRefreshData(true);
                setWorkoutSubmitStatus("SUCCESS");
                navigate("/workouts");
                toast.success("Workout created!");
                return;
            }

            await createRow(user.$id, "workouts", wid, payload);
            for(const exercise of exercises) {
                if(!exercise.name) continue;
                const eid = ID.unique();

                await createRow(user.$id, "exercises", eid, {
                    wid: wid,
                    exerciseName: exercise.name,
                });

                for(const set of exercise.sets) {
                    if(!set.reps && !set.weight) continue;
                    await createRow(user.$id, "sets", ID.unique(), {
                        eid: eid,
                        setCounter: Number(set.setCounter),
                        reps: Number(set.reps),
                        weight: Number(set.weight),
                    });
                }
            }

            setWorkoutSubmitStatus("SUCCESS");
            navigate("/workouts");
            setRefreshData(true);
            toast.success("Workout Created!");
        } catch (error) {
            console.error(error);
            toast.error("Error saving workout.");
            setWorkoutSubmitStatus("ERROR");
        }
    };

    const onEditSubmit = async (e) => {
        e.preventDefault();
        // update for workout
        try {
            setWorkoutSubmitStatus("PENDING");
            if (deleteArray.length > 0) {
                // delete any exercises
                for (const ex of deleteArray.filter(i => i.name)) {
                    await deleteRow("exercises", ex.$id);
                }

                // delete any sets
                for (const set of deleteArray.filter(i => i.setCounter)) {
                    await deleteRow("sets", set.$id);
                }
            }

            if (form.isDirty) {

                const workoutDate = `${date.year}-${date.month.padStart(2, "0")}-${date.day.padStart(
                    2, "0"
                )}`;

                const payload = {
                    workoutName: workoutName,
                    workoutType: workoutType,
                    date: workoutDate,
                }

                if(workoutType === "Distance/Time") {
                    payload.time = Number(time.minutes) * 60 + Number(time.seconds);
                    payload.distance = Number(distance);
                }

                await updateRow("workouts", form.$id, payload);
            }

            // update for exercise 
            if (updateArray.length > 0) {
                for(const ex of updateArray.filter(i => i.name)) {
                await updateRow("exercises", ex.$id, {
                        name: ex.name
                    }); 
                }
            }

            // adding a new exercise to an existing workout 
            for(const ex of form.exercises.filter(i => i.$id === null)) {
                const eid = ID.unique();
                await createRow(user.$id, "exercises", eid, {
                    name: ex.name,
                    wid: form.$id,
                });

                // adding a new set for said new exercise
                for(const set of ex.sets.filter(s => s.$id === null)) {
                    await createRow(user.$id, "sets", ID.unique(), {
                        eid: eid,
                        setCounter: Number(set.setCounter),
                        reps: Number(set.reps),
                        weight: Number(set.weight),
                    });
                }
            }

            // update for set
            if (updateArray.length > 0) {
                for(const set of updateArray.filter(i => i.setCounter)) {
                    await updateRow("sets", set.$id, {
                        setCounter: set.setCounter,
                        reps: set.reps,
                        weight: set.weight,
                    });
                }
            }

            // adding a new set
            for (const ex of form.exercises) {
                for ( const set of ex.sets.filter(s => s.$id === null)) {
                    await createRow(user.$id, "sets", ID.unique(), {
                        eid: ex.$id,
                        setCounter: set.setCounter,
                        reps: set.reps,
                        weight: set.weight,
                    });
                }
            }

            setWorkoutSubmitStatus("SUCCESS");
            toast.success("Workout updated");
            setRefreshData(true);
            // figure out what to navigate to afterwards
        } catch (error) {
            console.error(error);
            setWorkoutSubmitStatus("ERROR");
            toast.error("Failed to apply updates");
        }
    }

    return {
        workoutSubmitStatus,
        onWorkoutSubmit,
        onEditSubmit,
    };
}