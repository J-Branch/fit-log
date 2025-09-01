import { useState } from "react";

export default function Landing() {

    // bool logged in or not
    const [isLogin, setIsLogin] = useState(true);

    const [formData, setFormData] = useState ({
        email: "",
        password: "",
        confirmPassword: "",
    });

    // updates form fields
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // form submissions
    // need to add logic for appwrite 
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isLogin) {
            console.log("Logging in with:", formData);
            // appwrite login

        } else {
            if(formData.password !== formData.confirmPassword) {
                alert("passwprds do not match");
                return;
            }
            console.log("signing up with:", formData);
            // appwrite signup
        }
    };

    return(
        <div>
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {!isLogin && (
                    <div>
                        <label>Confirm Password</label>
                        <input 
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onCHange={handleChange}
                            required
                        />
                    </div>
                )}

                <button type="submit">
                    {isLogin ? "Login" : "Sign Up"}
                </button>
            </form>

            <p>
                {isLogin ? "Don't have an account?" : "ALready have an account?"}{" "}
                <button type="button" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Sign Up" : "Login"}
                </button>
            </p>
        </div>
    );

}