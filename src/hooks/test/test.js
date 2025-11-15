exercises: [
    {
        $id: E1111,
        name: "row",
        sets: []
    },
    {
        $id: null,
        name: "pull downs",
        sets:[
            {
                $id: null,
                setCounter: 1,
                reps: 10,
                weight: 140,
            }
        ]
    }
]


function trackChange(item, type, checked = true) {
    if (type === "update") {
        // Mark the object dirty
        const updatedItem = { ...item, isDirty: true };

        // Skip pushing workout to array
        if (updatedItem.$id === form.$id) {
            setForm(prev => ({ ...prev, isDirty: true }));
            return;
        }

        // Add or replace in updateArray
        setUpdateArray(prev => {
            const index = prev.findIndex(i => i.$id === updatedItem.$id);
            if (index > -1) {
                const copy = [...prev];
                copy[index] = updatedItem;
                return copy;
            }
            return [...prev, updatedItem];
        });
    }

    if (type === "delete") {
        const updatedItem = { ...item, toDelete: checked };

        // Skip pushing workout to array
        if (updatedItem.$id === form.$id) {
            setForm(prev => ({ ...prev, toDelete: checked }));
            return;
        }

        setDeleteArray(prev => {
            const exists = prev.find(i => i.$id === updatedItem.$id);
            if (checked) {
                if (!exists) return [...prev, updatedItem];
                return prev;
            } else {
                return prev.filter(i => i.$id !== updatedItem.$id);
            }
        });
    }
}



return (
    <div>
      <h1 className="text-2xl font-semibold">{form.workoutName}</h1>
      <Link to="/workouts" className="text-blue-500 hover:underline">Back to workouts</Link>
  
      {form.exercises.length > 0 ? (
        <ul className="mt-4 space-y-4">
          {form.exercises.map((ex) => {
            const { $id, name, sets } = ex;
            return (
              <li
                key={$id}
                className="bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-medium text-white">{name}</h2>
                  <span className="text-sm text-gray-400">
                    {sets.length} {sets.length === 1 ? "set" : "sets"}
                  </span>
                </div>
  
                {/* sets list */}
                <div className="space-y-2">
                  {sets.map((set, i) => (
                    <div
                      key={set.$id || i}
                      className="flex items-center justify-between bg-gray-900 px-3 py-2 rounded-lg text-sm"
                    >
                      <span className="text-gray-300">Set {i + 1}</span>
                      <span className="text-gray-400">
                        {set.reps} reps × {set.weight} lbs
                      </span>
                    </div>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mt-4 text-gray-500">No exercises yet.</p>
      )}
    </div>
  );


  import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useWorkoutForm } from "../../hooks/workouts/useWorkoutForm"; 
import { FetchWorkout } from "./FetchWorkout";
import { useWorkoutContext } from "../../context/workout.context";
import { useSubmitWorkout } from "./useSubmitWorkout";
import { deleteRow } from "../../api/appwrite.workout";

const config = {
    delete: {
        submitButtonText: "Delete Workout",
    },
    update: {
        submitButtonText: "Update",
    },
};

function EditWorkout() {
    const params = useParams();
    const {userWorkouts, userExercises, userSets } = useWorkoutContext();
    console.log(userExercises);
    const { form, updateForm, setForm, updateArray, deleteArray, trackChange } = useWorkoutForm();

    const fetchedWorkout = FetchWorkout({
        workoutId: params.id,
        userWorkouts,
        userExercises,
        userSets,
    });

    useEffect(() => {
        if (fetchedWorkout && !form.$id) {
            setForm(fetchedWorkout);
        }
    }, [fetchedWorkout, form.$id]);

    const { workoutSubmitStatus, onEditSubmit } = useSubmitWorkout({
       form 
    });


    function handleAddExercise() {
        updateForm(["exercises"], [
            ...form.exercises,
            { name: "", sets: [{ setCounter: "", reps: "", weight:"" }] },
        ]);
    }

    function handleAddSet(exerciseIndex) {
        const currentSets = form.exercises[exerciseIndex].sets;
        updateForm(["exercises", exerciseIndex, "sets"], [
            ...currentSets,
            { setCounter: currentSets.length + 1, reps: "", weight: ""},
        ]);
    }

    function handleRemoveExercise(exerciseIndex) {
        updateForm(
            ["exercises"],
            form.exercises.filter((_, i) => i !== exerciseIndex)
        );
    }

    function handleRemoveSet(exerciseIndex, setIndex) {
        const newSets = form.exercises[exerciseIndex].sets.filter((_, i) => i !== setIndex);
        updateForm(["exercises", exerciseIndex, "sets"], newSets);
    }


   return (
    <div>
        <h1 className="text-2xl font-semibold">{form.workoutName}</h1>
        <Link to="/workouts" className="text-red-500">Back to workouts</Link>

        {form.exercises.length > 0 ? (
            <ul className="mt-4 space-y-4">
                {form.exercises.map(ex => {
                    console.log("Exercise object", ex);
                    const {$id, name, sets} = ex;
                    return (
                        <li key={$id}>
                            <div className="">
                                <h2 className="text-lg font-semibold">{name}</h2>
                                <span className="text-sm">
                                    {sets.length} {sets.length === 1 ? "set" : "sets"}
                                </span>
                            </div>

                            <div className="space-y-2">
                                {sets.map((set, i) => (
                                    <div
                                        key={set.$id || i}
                                        className="flex items-center justify-between px-3 py-2 rounded-lg text-sm"
                                    >
                                        <span>set {i + 1}</span>
                                        <span>{set.reps} reps x {set.weight} lbs</span>
                                    </div>
                                ))}
                            </div>
                        </li>
                    );
                })}
            </ul>
        ) : (
            <p>No exercises yet.</p>
        )}
    </div>
   );
}

export default EditWorkout;