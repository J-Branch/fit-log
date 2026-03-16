import { useState } from "react";
import { produce } from "immer";

export function useWorkoutArrays() {
    const [upArr, setUpArr] = useState([]);
    const [delArr, setDelArr] = useState([]);

    function toUpArr(obj) {
        setUpArr(produce(draft => {
            const index = draft.findIndex(item => item.$id === obj.$id);

            if (index !== -1) {
                draft[index] = obj;
            } else {
                draft.push(obj);
            }
        }))
    }

    function toDelArr(obj) {
        setDelArr(produce(draft => {
            const index = draft.findIndex(item => item.$id === obj.$id);

            if (index !== -1) {
                draft[index] = obj;
            } else {
                draft.push(obj);
            }
        }))
    }

    return {
        upArr,
        delArr,
        toUpArr,
        toDelArr
    };
}