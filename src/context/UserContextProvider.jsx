import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createAccount, getCurrentAuthSession, login, logout } from "../api/appwrite.auth";
import { UserActionsContext, UserContext } from "./user.context";

export function UserContextProvider(props) {
    const [user, setUser] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    async function initUserSession() {

        /**
         * Init user's auth session
         * if there is no session, they will be redirected to login page
         */
        try {
            const currentSession = await getCurrentAuthSession();
            if(currentSession) {
                setUser(currentSession);
                if(location.pathname.includes("auth")) {
                    navigate("/");
                }
            } else {
                navigate("/auth/login");
            }
        } catch (error) {
            console.error(error);
            navigate("/auth/login");
        }
        setIsInitialized(true);
    };

    async function handleLogout() {
        try {
            await logout();
            setUser(null);
            navigate("/auth/login");
        } catch {
            console.error("Logout failed:", err);
        }
    };

    useEffect(() => {

        /**
         * init user's session if app just loaded
         * if a user is init determine if a user should be redirected to login page
         */
        if(isInitialized) {
            if(!user && !location.pathname.includes("auth")) {
                navigate("/auth/login");
            }
        } else {
            initUserSession();
        }
    }, [location.pathname]);

    const value = useMemo(() => {
        return {
            user,
            userId: user ? user.$id : null,
        };
    }, [user]);

    const actions = useMemo(() => {
        return {
            login,
            createAccount,
            logout: handleLogout,
            setUser,
        };
    }, []);

    return (
        <UserContext.Provider value={value}>
            <UserActionsContext.Provider value={actions}>
                {isInitialized ? (
                    props.children
                ) : (
                    <div>
                        Loading...
                    </div>
                )}
            </UserActionsContext.Provider>
        </UserContext.Provider>
    );
};