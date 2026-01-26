import { useMemo, useState } from "react";
import { AuthActionsContext, AuthContext } from "./user.context";
import { login, logout, createAccount } from "../api/appwrite.auth";

export function AuthContextProvider(props) {
    const [user, setUser] = useState(null);

    const value = useMemo(() => {
        return {
            user,
        }
    }, [user]);

    const actions = useMemo(() => {
        return {
            login,
            logout,
            createAccount,
            setUser,
        }
    }, []);
    
    return (
        <AuthContext.Provider value={value}>
            <AuthActionsContext.Provider value={actions}>
                {props.children}
            </AuthActionsContext.Provider>
        </AuthContext.Provider>
    );
};