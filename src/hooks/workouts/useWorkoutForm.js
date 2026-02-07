import { useState } from "react";
import { produce } from "immer";

export function useWorkoutForm() {
    const [updateArray, setUpdateArray] = useState([]);
    const [deleteArray, setDeleteArray] = useState([]);
    const [form, setForm] = useState({
        $id: null,
        delete: null,
        table: "workouts",
        workoutName: "",
        workoutType: "",
        date: {month: "", day: "", year: ""},
        time: {minutes: "", seconds: ""},
        distance: "",
        exercises: [
            {
                $id: null,
                table: "exercises",
                exerciseName: "",
                sets: [
                    {
                        $id: null,
                        table: "sets",
                        eid: null,
                        setCounter: 1,
                        reps: "",
                        weight: "",
                    }
                ],
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

    function toUpdateArray(obj) {
        setUpdateArray(produce(draft => {
            // returns index if there otherwise -1
            const index = draft.findIndex(item => item.$id === obj.$id);

            // overwrites it if it exists, otherwise add it to array
            if(index !== -1) {
                draft[index] = obj;
            } else {
                draft.push(obj);
            }

        }))
    }

    return {
        form,
        setForm,
        updateForm,
        updateArray,
        deleteArray,
        toUpdateArray
    };
};