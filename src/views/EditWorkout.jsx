import { Link, useParams, Form, useActionData, useLoaderData, useRouteLoaderData, useSubmit, useNavigation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useWorkoutForm } from "../hooks/workouts/useWorkoutForm";
import Weightlifting from "../components/editWorkout/Weightlifting";
import DistanceTime from "../components/editWorkout/DistanceTime";
// import { useFetchWorkout } from "../hooks/workouts/useFetchWorkout";
import toast from "react-hot-toast";

function EditWorkout() {
    const params = useParams();
    const workoutId = params.id;
    const submit = useSubmit();

    const { userWorkouts } = useRouteLoaderData("AppLayout");
    const exercises = useLoaderData();
    const workout = userWorkouts.find(workout => workout.$id === workoutId);

    // console.log("workout structure: ", workout);
    // console.log("exercises: ", exercises);


    // const fetchedWorkout = useFetchWorkout(workoutId);
    const { form, updateForm, setForm } = useWorkoutForm();
    const [mode, setMode] = useState("view");
    const [backupForm, setBackupForm] = useState(null);

    const actionData = useActionData();

    const navigation = useNavigation();
    const isDeleting = navigation.state === "submitting" && navigation.formData?.get("intent");

    useEffect(() => {
        if (actionData?.error) {
            toast.error(actionData.error)
        }
    }, [actionData]);

    // call setform to get the actual workout
    useEffect(() => {
        if (workout && exercises && !form.$id) {
            setForm({ ...workout, exercises});
            // console.log("full form: ", form)
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
                <Link className="text-blue-500" to="/workouts">
                    Back to workouts
                </Link>
            </div>
        );
    }
    // console.log(form);
    
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

                        {/* <Form method="post">
                            <input type="hidden" name="payload" value={JSON.stringify(form)}/>

                            <button
                                type="submit"
                                className="px-4 py-2 bg-gray-800 text-white rounded"
                            >
                                Delete Workout
                            </button>
                        </Form> */}

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
    );
}

export default EditWorkout;