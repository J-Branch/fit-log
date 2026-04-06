import { redirect } from "react-router-dom";
import { functions, account } from "../api/appwrite.api";

export async function editSubmit({ request }) {
    try {
        const formData = await request.formData();
        const form = JSON.parse(formData.get("payload"));

        const functionID = import.meta.env.VITE_APPWRITE_FUNCTIONS_WRITESDB_ID;

        const response = await functions.createExecution({
            functionId: functionID,
            body: JSON.stringify(form),
            headers: {
                "x-action-type": "edit",
            }
        });

        const result = JSON.parse(response.responseBody);

        if (!result.success) {
            return {error: result.message}
        }

        return redirect("../workouts?toast=edited");
 
    } catch (error) {
        return {error: error.message};
    }
}