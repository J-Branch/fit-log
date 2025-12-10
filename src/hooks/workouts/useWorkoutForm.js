import { useState } from "react";
import { useParams } from "react-router-dom";
import { produce } from "immer";

export function useWorkoutForm() {
    const params = useParams();
    //const isEditMode = Boolean(params.id);
    const [updateArray, setUpdateArray] = useState([]);
    const [deleteArray, setDeleteArray] = useState([]);
    const [form, setForm] = useState({
        $id: null,
        toDelete: false,
        isDirty: false,
        workoutName: "",
        workoutType: "",
        date: {month: "", day: "", year: ""},
        time: {minutes: "", seconds: ""},
        distance: "",
        exercises: [
            {
                $id: null,
                toDelete: false,
                isDirty: false,
                name: "",
                sets: [
                    {
                        $id: null,
                        toDelete: false,
                        isDirty: false,
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

    function toUpdateArray(obj, id) {
        setUpdateArray(produce(draft => {
            // returns index if there otherwise -1
            const index = draft.findIndex(obj => obj.$id === id);

            // overwrites it if it exists, otherwise push it on
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
        trackChange,
    };
};