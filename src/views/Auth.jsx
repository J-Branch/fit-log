import { useState } from "react";

function AuthPage() {

    // state for choosing between signup or login form
    const [isLogin, setIsLogin] = useState(true); 
    
    return (
        <div>
            <h1>{isLogin ? "Log in" : "Sign up"}</h1>
            {isLogin ? (
                <LoginForm onSwitch={() => setIsLogin(false)} />
            ) : (
                <SignupForm onSwitch={() => setIsLogin(true)} />
            )}
        </div>
    );
}


function LoginForm({ onSwitch }) {
    // needs to handle api calls laters
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login submitted!");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="enter email" required />
            <input type="password" placeholder="enter password" required />
            <button type="submit">Log in</button>
            <p>
                No account?{" "}
                <a 
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        onSwitch();
                    }}
                >
                    Sign up
                </a>
            </p>
        </form>
    );
}

function SignupForm({ onSwitch }) {
    // needs to handle api calls later
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("signup submitted");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="enter email" required />
            <input type="password" placeholder="enter password" required />
            <input type="password" placeholder="confirm password" required />
            <button>Sign up</button>
            <p>
                Already have an account?{" "}
                <a 
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        onSwitch();
                    }}
                    >
                        Log in
                    </a>
            </p> 
        </form>
    );
}

export default function Auth() {
    return <AuthPage />;
}