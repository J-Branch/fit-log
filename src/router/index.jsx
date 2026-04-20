import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";

// Pages
import MainPage from "../views/MainPage";
import Auth from "../views/Auth";
import Dashboard from "../views/Dashboard";
import ViewWorkouts from "../views/ViewWorkouts";
import CreateWorkout from "../views/CreateWorkout";
import EditWorkout from "../views/EditWorkout";
import Analytics from "../views/Analytics";
import Achievements from "../views/Achievements";
import NotFoundPage from "../views/NotFoundPage";

// Layouts 
import AuthLayout from "../views/layouts/AuthLayout";
import AppLayout from "../views/layouts/AppLayout";

// Loaders 
import { protectedLoader } from "../loaders/protected.loader";
import { authLoader } from "../loaders/auth.loader";
import { editWorkoutLoader } from "../loaders/edit.workout.loader";
import { workoutsLoader } from "../loaders/workouts.loader";
import { analyticsLoader } from "../loaders/analytics.loader";
import { dashboardLoader } from "../loaders/dashboard.loader"

// Actions 
import { authAction } from "../actions/auth.action";
import { logoutAction } from "../actions/logout.action";
import { workoutSubmit } from "../actions/workoutSubmit.action";
import { editSubmit } from "../actions/editSubmit.action"; 



export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFoundPage />,
        HydrateFallback: () => {
            return (
                <div className="h-screen w-full flex items-center justify-center bg-zinc-950">
                    <div className="flex flex-col items-center gap-4">
                        
                        {/* Animated pulse logo */}
                        <div className="h-10 w-10 rounded-full bg-indigo-500 animate-pulse" />
        
                        {/* Loading text */}
                        <div className="text-sm text-zinc-300 tracking-wide">
                            Loading app...
                        </div>
        
                        {/* Thin loading bar */}
                        <div className="w-48 h-1 bg-zinc-800 overflow-hidden rounded">
                            <div className="h-full w-1/3 bg-indigo-500 animate-loading" />
                        </div>
                    </div>
                </div>
            );
        },
        children: [
            {
                element: <AuthLayout />,
                loader: authLoader,
                children: [
                    { path: "login", element: <Auth />, action: authAction },
                    { path: "register", element: <Auth />, action: authAction },
                    { index: true, element: <Navigate to="login" /> },
                ],
            },
            {
                id: "AppLayout",
                element: <AppLayout />,
                loader: protectedLoader,
                children: [
                    { path: "logout", action: logoutAction },
                    {
                        id: "MainPage",
                        path: "home",
                        element: <MainPage />,
                        children: [
                            { index: true, element: <Navigate to="Dashboard" /> },
                            { path: "dashboard", element: <Dashboard />, loader: dashboardLoader },
                            { path: "dashboard/achievements", element: <Achievements />},
                            { path: "workouts", element: <ViewWorkouts />, loader: workoutsLoader },
                            { path: "workouts/create", element: <CreateWorkout />, action: workoutSubmit },
                            { path: "workout/:id", element: <EditWorkout />, action: editSubmit, loader: editWorkoutLoader },
                            { path: "analytics", element: <Analytics />, loader: analyticsLoader },
                        ],
                    },
                ],
            },
        ],
    },
]);