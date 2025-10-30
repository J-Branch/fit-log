import { useMemo } from "react";
import { useFetchWorkoutData } from "../hooks/workouts/useFetchWorkoutData";
import { WorkoutContext } from "./workout.context";

export function WorkoutContextProvider(props) {
    const { userWorkouts, userExercises, userSets, setRefreshData } = useFetchWorkoutData();

    const lists = useMemo(() => {
        return {
            userWorkouts,
            userExercises,
            userSets,
            setRefreshData
        }
    }, [userWorkouts, userExercises, userSets, setRefreshData]);

    return (
        <WorkoutContext.Provider value={lists}>
            {props.children}
        </WorkoutContext.Provider>
    );
};