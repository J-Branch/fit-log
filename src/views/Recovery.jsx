import { Form, useActionData, Link } from "react-router-dom";

export default function Recovery() {
    const actionData = useActionData();
    const error = actionData?.error;

    return (
        <div className="flex min-h-screen">

            {/* Left Branding Panel */}
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

            {/* Recovery Form */}
            <div className="flex w-full md:w-1/2 items-center justify-center bg-white">
                <Form className="w-full max-w-md p-8" method="post">
                    <h1 className="mb-2 text-2xl font-semibold text-center">
                        Forgot Password
                    </h1>

                    <p className="mb-8 text-center text-gray-500">
                        Enter the email associated with your account and we'll
                        send you instructions to reset your password.
                    </p>

                    <div className="flex flex-col gap-3">
                        <label htmlFor="email-field">Email</label>

                        <input
                            id="email-field"
                            className="w-full px-4 py-2 rounded-md shadow"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                        />
                    </div>

                    {error && (
                        <p className="mt-3 text-red-600">{error}</p>
                    )}

                    <button
                        className="w-full h-12 mt-6 text-white bg-light-default rounded-md hover:bg-light-hover transition-colors"
                        type="submit"
                    >
                        Send Reset Link
                    </button>

                    <Link
                        className="block mt-6 text-center text-indigo-900 hover:text-indigo-600"
                        to="/login"
                    >
                        ← Back to Login
                    </Link>
                </Form>
            </div>
        </div>
    );
}