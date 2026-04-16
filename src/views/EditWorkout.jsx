import { Link, useParams, Form, useActionData, useLoaderData, useSubmit, useNavigation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useWorkoutForm } from "../hooks/workouts/useWorkoutForm";
import Weightlifting from "../components/editWorkout/Weightlifting";
import DistanceTime from "../components/editWorkout/DistanceTime";
import toast from "react-hot-toast";
import { produce } from "immer";

function EditWorkout() {
    const params = useParams();
    const workoutId = params.id;
    const submit = useSubmit();

    const {workout, exercises} = useLoaderData();
    const { form, updateForm, setForm } = useWorkoutForm();
    const [mode, setMode] = useState("view");
    const [backupForm, setBackupForm] = useState(null);
    const [uiSelection, setUiSelection] = useState({
        exercises: {},
        sets: {}
    });

    const actionData = useActionData();

    const navigation = useNavigation();
    const isDeleting = navigation.state === "submitting" && navigation.formData?.get("intent");
    const isSaving = navigation.state === "submitting" && navigation.formData?.get("intent");

    const selectedExercisesCount = Object.values(uiSelection?.exercises || {}).filter(Boolean).length;

    const selectedSetsCount = Object.values(uiSelection?.sets || {}).filter(Boolean).length;


    // checking for if there was an error in submitting
    useEffect(() => {
        if (actionData?.error) {
            toast.error(actionData.error)
        }
    }, [actionData]);

    // used to convert date from a string to an object
    function parseDate(dateStr) {
        if (!dateStr) return {month: "", day: "", year: ""};

        const [year, month, day] = dateStr.split("-");
        return { month, day, year};
    }
    
    // used to convert time from a string to an object
    function parseTime(totalSeconds) {
        if (!totalSeconds) return { minutes: "", seconds: "" };

        const secondsNum = Number(totalSeconds);
        return {
            minutes: Math.floor(secondsNum / 60),
            seconds: secondsNum % 60
        };
    }

    // call setform to get the actual workout
    useEffect(() => {
        if (workout && exercises && !form.$id) {
            setForm({
                ...workout,
                date: parseDate(workout.date),
                time: parseTime(workout.time),
                exercises
            });
        }
    }, [workout, exercises, form.$id]);


    // keep a backup up of the form in case of cancel
    function handleEditToggle() {
        if (mode === "view") {
            // ENTER edit mode keep a copy of workout
            setBackupForm(structuredClone(form));
            setMode("edit");
        } else {
            // CANCEL edit restore copy
            setForm(backupForm);
            setMode("view");
        }
    }   

    if (!workout) {
        return (
            <div>
                <h1 className="text-xl font-semibold text-red-600">
                    Workout Not Found
                </h1>
                <Link className="text-blue-500" to="../workouts">
                    Back to workouts
                </Link>
            </div>
        );
    }

    useEffect(() => {
        const total = selectedExercisesCount + selectedSetsCount;
    
        if (total === 0) {
            toast.dismiss("selection-toast");
            return;
        }
    
        toast(
            `${total} item${total === 1 ? "" : "s"} selected`,
            {
                id: "selection-toast", // important: prevents spam
                position: "bottom-center",
            }
        );
    }, [selectedExercisesCount, selectedSetsCount]);

    function prepareFormDeletes(form, uiSelection) {
        return produce(form, draft => {
            for (const exercise of draft.exercises) {
                const exerciseSelected = !!uiSelection.exercises[exercise.$id];

                if (exerciseSelected) {
                    exercise.toDelete = true;

                    for (const set of exercise.sets) {
                        set.toDelete = false;
                    }
                } else {
                    for (const set of exercise.sets) {
                        set.toDelete = !!uiSelection.sets[set.$id];
                    }
                }
            }
        });
    }
    
    function handleDelete() {
        toast((t) => (
            <div className="space-y-2">
                <p>Are you sure you want to delete this workout?</p>
    
                <div className="flex gap-2">
                    <button
                        className="px-3 py-1 bg-red-600 text-white rounded"
                        onClick={() => {
                            submit(
                                {
                                    intent: "delete",
                                    id: form.$id,
                                    workoutType: form.workoutType,
                                    updateNumber: form.workoutType === "Weightlifting" ? form.totalWeight : form.distance
                                },
                                { method: "post" }
                            );
                            toast.dismiss(t.id);
                        }}
                    >
                        Are you sure you want to delete?
                    </button>
    
                    <button
                        className="px-3 py-1 bg-gray-300 rounded"
                        onClick={() => toast.dismiss(t.id)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ));
    }

    function handleSubmit() {
        let base = structuredClone(form);

        if (base.workoutType === "Weightlifting") {
            base = prepareFormDeletes(base, uiSelection);
        }

        const payload = {
            ...base,
            date: `${base.date.year}-${base.date.month}-${base.date.day}`,
            time: Number(base.time.minutes || 0) * 60 + Number(base.time.seconds || 0)
        }

        console.log("payload: ", payload)
        
        submit(
            {
                payload: JSON.stringify(payload)
            },
            {method: "post"}
        );
    }

    // -----------------------------
    // RENDER
    // -----------------------------
    return (
        <div className="space-y-4">
            <Link to="../workouts" className="text-blue-500">
                Back to workouts
            </Link>

            {/* Workout Name */}
            <div className="flex justify-between">
                {mode === "edit" ? (
                    <div className="flex items-center space-x-4">
                        <input
                            className="border p-2 text-xl font-semibold"
                            value={form.workoutName}
                            onChange={(e) => {
                                updateForm(["workoutName"], e.target.value);
                            }}

                            onBlur={(e) => {
                                console.log("setting the flag for workoutName");
                                updateForm(["isDirty"], true);
                            }}
                        />

                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="px-4 py-2 bg-gray-800 text-white rounded"
                        >
                            {isDeleting ? "Deleting..." : "Delete workout"}
                        </button>
                    </div>
                ) : (
                    <h1 className="text-2xl font-semibold">{form.workoutName}</h1>
                )}
            </div>

            {/* Edit Mode Toggle */}
            <button
                onClick={handleEditToggle}
                className="px-4 py-2 bg-gray-800 text-white rounded"
            >
                {mode === "edit" ? "Cancel" : "Edit Workout"}
            </button>

            {form.workoutType === "Weightlifting" && (
                <Weightlifting
                    form={form}
                    updateForm={updateForm}
                    mode={mode}
                    uiSelection={uiSelection}
                    setUiSelection={setUiSelection}
                />
            )}

            {form.workoutType === "Distance/Time" && (
                <DistanceTime
                    form={form}
                    updateForm={updateForm}
                    mode={mode}
                />
            )}

            {mode === "edit" && (
                <button
                    onClick={handleSubmit}
                    disabled={isSaving}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                >
                    {isSaving ? "Saving..." : "Save changes"}
                </button>
            )}

        </div>
    );
}

export default EditWorkout;