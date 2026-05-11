import { Form, useActionData, Link } from "react-router-dom";

export default function Recovery() {
    const actionData = useActionData();
    const error = actionData?.error;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#B23A48] via-[#972d43] to-[#800020]">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                    <Form className="w-full" method="post">
                        <h1 className="font-semibold text-center">Forgot your password</h1>
                        <div className="flex flex-col items-start gap-3">
                            <label>Please enter the email address you'd like your password reset information sent to</label>


                            <label>Email</label>
                            <input
                                id="email-field"
                                className="w-full px-4 py-2 rounded-md shadow"
                                name="email"
                                type="email"
                                defaultValue=""
                            />

                            <button
                                className="block w-full h-12 mt-6 text-indigo-100 transition-colors duration-150 bg-indigo-600 rounded-md hover:bg-indigo-800"
                                type="submit"
                            >
                                Reset
                            </button>

                            <Link
                               className="block w-full mt-6 text-center text-indigo-900 transition-colors duration-150 hover:text-indigo-600"
                               to="/login" 
                            >
                                Back to login
                            </Link>
                        </div>
                    </Form>
            </div>
        </div>
    )
}