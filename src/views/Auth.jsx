import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUserActionsContext } from "../context/user.context";

const config = {
    login: {
        header: "Login",
        submitButtonText: "Log in",
        toggleAuthModeLink: {
            to: "/auth/register",
            text: "/Create a new account",
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
        <form onSubmit={onFormSubmit}>
            <h1>{header}</h1>
            <input
                id="email-field"
                type="email"
                value={form.email}
                onChange={ e => onFormChange("email")(e.target.value)}
            />

            <input
                id="password-field"
                type="password"
                value={form.password}
                onChange={ e => onFormChange("password")(e.target.value)}
            />

            {error ? <p>{error}</p> : null}
            <button type="submit">
                {submitButtonText}
            </button>

            <Link to={toggleAuthModeLink.to}>
                {toggleAuthModeLink.text}
            </Link>
        </form>
    );
}


export default function Auth() {
    return <AuthPage />;
}