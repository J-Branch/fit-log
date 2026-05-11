import { Form, useActionData, useSearchParams } from "react-router-dom";

export default function ResetPassword() {
    const actionData = useActionData();
    const error = actionData?.error;

    const [searchParams] = useSearchParams();
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#B23A48] via-[#972d43] to-[#800020]">
            <div className="flex items-center justify-center w-3/4 mx-8 bg-white md:w-1/2 md:min-h-screen md:ml-auto md:mx-0 max-md:rounded-2xl">
                <Form className="w-full p-8 md:w-96 md:p-4" method="post">
                    <h1 className="mb-8 text-2xl font-semibold text-center">
                        Reset Password
                    </h1>

                    <div className="flex flex-col items-start gap-3">
                        <label htmlFor="password-field">
                            New Password
                        </label>

                        <input
                            id="password-field"
                            className="w-full px-4 py-2 rounded-md shadow"
                            name="password"
                            type="password"
                            required
                        />

                        <label htmlFor="confirm-password-field">
                            Confirm Password
                        </label>

                        <input
                            id="confirm-password-field"
                            className="w-full px-4 py-2 rounded-md shadow"
                            name="confirmPassword"
                            type="password"
                            required
                        />
                    </div>

                    {error ? (
                        <p className="block mt-2 text-red-600">
                            {error}
                        </p>
                    ) : null}


                    <button
                        className="block w-full h-12 mt-6 text-indigo-100 transition-colors duration-150 bg-indigo-600 rounded-md hover:bg-indigo-800"
                        type="submit"
                    >
                        Reset Password
                    </button>
                </Form>
            </div>
        </div>
    );
}