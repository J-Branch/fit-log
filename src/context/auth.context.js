import { createContext, useContext } from "react"

// will provide information about the user
export const AuthContext = createContext({});

// will provide methods
export const AuthActionsContext = createContext({});


export function useAuthContext() {
    return useContext(AuthContext);
}

export function useAuthActionsContext() {
    return useContext(AuthActionsContext);
}