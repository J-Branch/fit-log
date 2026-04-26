import { Link, useActionData, useLoaderData, useSubmit, useNavigation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useWorkoutForm } from "../hooks/workouts/useWorkoutForm";
import Weightlifting from "../components/editWorkout/Weightlifting";
import DistanceTime from "../components/editWorkout/DistanceTime";
import toast from "react-hot-toast";
import { produce } from "immer";

function EditWorkout() {
    const submit = useSubmit();

    const { workout, exercises } = useLoaderData();
    const { form, updateForm, setForm } = useWorkoutForm();

    const [mode, setMode] = useState("view");
    const [backupForm, setBackupForm] = useState(null);
    const [uiSelection, setUiSelection] = useState({
        exercises: {},
        sets: {}
    });

    const actionData = useActionData();
    const navigation = useNavigation();

    const isDeleting =
        navigation.state === "submitting" &&
        navigation.formData?.get("intent");

    const isSaving =
        navigation.state === "submitting" &&
        !navigation.formData?.get("intent");

    const selectedExercisesCount = Object.values(uiSelection?.exercises || {}).filter(Boolean).length;
    const selectedSetsCount = Object.values(uiSelection?.sets || {}).filter(Boolean).length;

    useEffect(() => {
        if (actionData?.error) {
            toast.error(actionData.error);
        }
    }, [actionData]);

    function parseDate(dateStr) {
        if (!dateStr) return { month: "", day: "", year: "" };
        const [year, month, day] = dateStr.split("-");
        return { month, day, year };
    }

    function parseTime(totalSeconds) {
        if (!totalSeconds) return { minutes: "", seconds: "" };
        const secondsNum = Number(totalSeconds);
        return {
            minutes: Math.floor(secondsNum / 60),
            seconds: secondsNum % 60
        };
    }

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

    function handleEditToggle() {
        if (mode === "view") {
            setBackupForm(structuredClone(form));
            setMode("edit");
        } else {
            setForm(backupForm);
            setMode("view");
        }
    }

    useEffect(() => {
        const total = selectedExercisesCount + selectedSetsCount;

        if (total === 0) {
            toast.dismiss("selection-toast");
            return;
        }

        toast(`${total} item${total === 1 ? "" : "s"} selected`, {
            id: "selection-toast",
            position: "bottom-center",
        });
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
                                    updateNumber:
                                        form.workoutType === "Weightlifting"
                                            ? form.totalWeight
                                            : form.distance
                                },
                                { method: "post" }
                            );
                            toast.dismiss(t.id);
                        }}
                    >
                        Confirm Delete
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
            time:
                Number(base.time.minutes || 0) * 60 +
                Number(base.time.seconds || 0)
        };

        submit(
            {
                payload: JSON.stringify(payload)
            },
            { method: "post" }
        );
    }

    if (!workout) {
        return (
            <div className="p-6">
                <h1 className="text-xl font-semibold text-red-600">
                    Workout Not Found
                </h1>
                <Link className="text-blue-500" to="../workouts">
                    Back to workouts
                </Link>
            </div>
        );
    }

    return (
        <div
            className="w-full min-h-screen bg-gray-50 p-6"
            style={{
                backgroundColor: "#f9fafb",
                backgroundImage: `
                    radial-gradient(#e5e7eb 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,1))
                `,
                backgroundSize: "20px 20px, 100% 100%",
            }}
        >
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden transition-all">

                    {/* Header */}
                    <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide">
                                Workout
                            </p>

                            <h1 className="text-2xl font-bold text-gray-900 mt-1">
                                {form.workoutName || "Untitled Workout"}
                            </h1>

                            <Link
                                to="../workouts"
                                className="inline-block mt-2 text-sm text-gray-500 hover:text-gray-700 transition"
                            >
                                ← Back to Workouts
                            </Link>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handleEditToggle}
                                className={`px-4 py-2 text-sm rounded-lg transition ${
                                    mode === "edit"
                                        ? "bg-gray-200 text-gray-700"
                                        : "bg-primary-red-one text-white hover:opacity-90"
                                }`}
                            >
                                {mode === "edit" ? "Cancel" : "Edit"}
                            </button>

                            {mode === "edit" && (
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                >
                                    {isDeleting ? "Deleting..." : "Delete"}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Body */}
                    <div className="px-8 py-6 space-y-8">

                        {mode === "edit" && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">
                                    Workout Name
                                </label>

                                <input
                                    className="w-full px-4 py-2 text-lg font-semibold border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-red-one"
                                    value={form.workoutName}
                                    onChange={(e) =>
                                        updateForm(["workoutName"], e.target.value)
                                    }
                                />
                            </div>
                        )}

                        <div className="bg-gray-50/60 border border-gray-100 rounded-lg p-5">
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
                        </div>
                    </div>

                    {/* Footer */}
                    {mode === "edit" && (
                        <div className="px-8 py-4 border-t border-gray-100 flex justify-between items-center">
                            <p className="text-xs text-gray-400">
                                Editing mode enabled
                            </p>

                            <button
                                onClick={handleSubmit}
                                disabled={isSaving}
                                className="px-6 py-2 bg-primary-red-one text-white rounded-lg hover:opacity-90 transition-all duration-200 disabled:opacity-50"
                            >
                                {isSaving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default EditWorkout;