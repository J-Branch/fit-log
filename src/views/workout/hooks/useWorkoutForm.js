import { useState } from "react";
import { useParams } from "react-router-dom";
import { produce } from "immer";

export function useWorkoutForm() {
    //const params = useParams();
    //const isEditMode = Boolean(params.id);
    const [form, setForm] = useState({
        workoutName: "",
        workoutType: "",
        date: {month: "", day: "", year: ""},
        time: {minutes: "", seconds: ""},
        distance: "",
        exercises: [
            {
                name: "",
                sets: [{setCounter: "", reps: "", weight: ""}],
            },
        ],
    });

    /**
     * pass in a path array and value to be set
     * @param {*} path is an array
     * @param {*} value is value to update field
     */
    function updateForm(path, value) {
        setForm(produce(draft => {
            // shallow copy of form
            let target = draft;

            // loop through the path except for the last key
            for(let i = 0; i < path.length - 1; i++) {
                target = target[path[i]];
            }


            // set the target key to the value
            target[path[path.length-1]] = value;
        }));
    };

    return {
        form,
        updateForm
    };
};