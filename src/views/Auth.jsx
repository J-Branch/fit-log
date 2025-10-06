import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUserActionsContext } from "../context/user.context";

const config = {
    login: {
        header: "Login",
        submitButtonText: "Log in",
        toggleAuthModeLink: {
            to: "/auth/register",
            text: "Create a new account",
        },
    },

    register: {
        header: "Create Account",
        submitButtonText: "Register",
        toggleAuthModeLink: {
            to: "/auth/login",
            text: "Already have an account?",
        },
    },
};

function AuthPage() {
    const { login, createAccount, setUser } = useUserActionsContext();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const location = useLocation();
    const isCreateAccountPage = location.pathname.includes("register");
    const { header, submitButtonText, toggleAuthModeLink } = 
        config[isCreateAccountPage ? "register" : "login"];

    const onFormChange = key => value => {
        setForm(state => ({
            ...state,
            [key]: value,
        }));
    };

    async function onFormSubmit(event) {
        event.preventDefault();
        const { email, password } = form;

        if(!email) {
            setError("Please enter your email.");
            return;
        }

        if(!password) {
            setError("Please enter password.");
            return;
        }

        try {
            if(isCreateAccountPage) {
                await createAccount(email, password);
            }

            const loginSession = await login(email, password);
            setUser(loginSession);

            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#B23A48] via-[#972d43] to-[#800020]">
            <div className="flex items-center justify-center w-3/4 mx-8 bg-white md:w-1/2 md:min-h-screen md:ml-auto md:mx-0 max-md:rounded-2x1">
                <form className="w-full p-8 md:w-96 md:p-4" onSubmit={onFormSubmit}>
                    <h1 className="mb-8 text-2x1 font-semibold text-center">{header}</h1>
                    <div className="flex flex-col items-start gap-3">
                        <label>Email</label>
                        <input
                            id="email-field"
                            className="w-full px-4 py-2 rounded-md shadow"
                            type="email"
                            value={form.email}
                            onChange={e => onFormChange("email")(e.target.value)}  
                        />

                        <label>Password</label>
                        <input
                            id="password-field"
                            className="w-full px-4 py-2 rounded-md shadow"
                            type="password"
                            value={form.password}
                            onChange={e => onFormChange("password")(e.target.value)}  
                        />
                    </div>

                    {error ? <p className="block mt-2 text-red-600">{error}</p> : null}
                    <button
                        className="block w-full h-12 mt-6 text-indigo-100 transition-colors duration-150 bg-indigo-600 rounded-md hover:bg-indigo-800"
                        type="submit"
                    >
                        {submitButtonText}
                    </button>

                    <Link
                        className="block mt-6 text-center text-indigo-900 transition-colors duration-150 hover:text-indigo-600"
                        to={toggleAuthModeLink.to}
                    >
                        {toggleAuthModeLink.text}
                    </Link>
                </form>
            </div>
        </div>
    );
}


export default function Auth() {
    return <AuthPage />;
}