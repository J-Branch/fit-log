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

    function trackChange(row, type, checked = true) {
        if (type === "update") {
            const updatedRow = { ...row, isDirty: true };

            if (updatedRow.$id === form.$id) {
                setForm(prev => ({ ...prev, isDirty: true}));
                return;
            }

            setUpdateArray(prev => {
                const index = prev.findIndex(i => i.$id === updatedRow.$id);
                if (index > -1) {
                    const copy = [...prev];
                    copy[index] = updatedRow;
                    return copy;
                }
                return [...prev, updatedRow];
            });
        }

        if (type === "delete") {
            const updatedRow = {...row, toDelete: checked};

            if (updatedRow.$id === form.$id) {
                setForm(prev => ({...prev, toDelete: checked}));
                return;
            }

            setDeleteArray(prev => {
                const exists = prev.find(i => i.$id === updatedRow.$id);
                if (checked) {
                    if (!exists) return [...prev, updatedRow];
                    return prev;
                } else {
                    return prev.filter(i => i.$id !== updatedRow);
                }
            });
        }
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