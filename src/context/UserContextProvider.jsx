import { useMemo, useState } from "react";
import { UserActionsContext, UserContext } from "./user.context";

export function UserContextProvider({initialUser, children }) {
    const [user, setUser] = useState(initialUser);

    const value = useMemo(() => ({ user }), [user]);

    const actions= useMemo(() => ({
        setUser,
    }), []);
    
    return (
        <UserContext.Provider value={value}>
            <UserActionsContext.Provider value={actions}>
                {children}
            </UserActionsContext.Provider>
        </UserContext.Provider>
    );
};