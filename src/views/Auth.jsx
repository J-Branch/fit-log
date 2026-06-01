import { Form, useActionData, useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

const config = {
    login: {
        header: "Login",
        submitButtonText: "Log in",
        toggleAuthModeLink: {
            to: "/register",
            text: "Create a new account",
            recovery: "Forgot password?",
            recoveryLink: "/recover-account"
        },
    },

    register: {
        header: "Create Account",
        submitButtonText: "Register",
        toggleAuthModeLink: {
            to: "/login",
            text: "Already have an account?",
        },
    },
};

function AuthPage() {

    const location = useLocation();
    const isCreateAccountPage = location.pathname.includes("register");
    const { header, submitButtonText, toggleAuthModeLink } = 
        config[isCreateAccountPage ? "register" : "login"];

    const actionData = useActionData();
    const error = actionData?.error;

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        if (params.get("reset") === "success") {
            toast.success("Password reset successfully!");
            window.history.replaceState({}, "", location.pathname);
        }
    }, [location]);

    return (
        <div className="flex min-h-screen">

            <div className="hidden md:flex w-1/2 relative overflow-hidden items-center justify-center bg-gradient-to-r from-light-default via-light-hover to-light-active">
                <div className="authImagePattern absolute inset-0 opacity-20 mix-blend-overlay" />
                <div className="relative z-10">
                    <div className="floatingCard w-80 h-72 rounded-3xl bg-white/90 backdrop-blur-md shadow-2xl border border-white/20 flex items-center justify-center">
                        <h1 className="wormText text-7xl font-extrabold italic tracking-tighter uppercase">
                            Fit-<span className="text-light-default">Log</span>
                        </h1>
                    </div>
                </div>
            </div>

            <div className="flex w-full md:w-1/2 items-center justify-center bg-white">
                <Form className="w-full max-w-md p-8" method="post">
                    <h1 className="mb-8 text-2x1 font-semibold text-center">
                        {header}
                    </h1>

                    <div className="flex flex-col gap-3">
                        <label>Email</label>
                        <input
                            id="email-field"
                            className="w-full px-4 py-2 rounded-md shadow"
                            name="email"
                            type="email"
                        />

                        <label>Password</label>
                        <input
                            id="password-field"
                            className="w-full px-4 py-2 rounded-md shadow"
                            name="password"
                            type="password"
                        />
                    </div>
                    {error && (
                        <p className="mt-2 text-red-600">{error}</p>
                    )}

                    <button
                        className="w-full h-12 mt-6 text-white bg-light-default rounded-md hover:bg-light-hover"
                    >
                        {submitButtonText}
                    </button>

                    <Link
                        className="block mt-6 text-center text-indigo-900 hover:text-indigo-600"
                        to={toggleAuthModeLink.to}
                    >
                        {toggleAuthModeLink.text}
                    </Link>

                    {!isCreateAccountPage && (
                        <Link
                            className="block mt-6 text-center text-indigo-900 hover:text-indigo-600"
                            to={toggleAuthModeLink.recoveryLink}
                        >
                        {toggleAuthModeLink.recovery}
                        </Link>
                    )}
                </Form>
            </div>
        </div>
    )
}

export default function Auth() {
    return <AuthPage />;
}