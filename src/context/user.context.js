import { createContext, useContext } from "react"

// will provide information about the user
export const UserContext = createContext({});

// will provide methods
export const UserActionsContext = createContext({});


export function useUserContext() {
    return useContext(UserContext);
}

export function useUserActionsContext() {
    return useContext(UserActionsContext);
}