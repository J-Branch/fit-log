import { createContext, useContext } from "react";

export const WorkoutContext = createContext({});

export function useWorkoutContext() {
    return useContext(WorkoutContext);
}