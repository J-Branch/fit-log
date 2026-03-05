import { redirect } from "react-router-dom";
import { getCurrentAuthSession } from "../api/appwrite.auth";
import { functions } from "../api/appwrite.api";

export async function editSubmit({ request }) {
    try {
        const user = await getCurrentAuthSession();
        const formData = await request.formData();
        const form = JSON.parse(formData.get("payload"));

        const functionID = import.meta.env.VITE_APPWRITE_FUNCTIONS_WRITESDB_ID;

        const response = await functions.createExecution({
            functionId: functionID,
            body: JSON.stringify(form)
        });

        const result = JSON.parse(response.responseBody);

        if (!result.sucess) {
            return {error: result.message}
        }

        return redirect("../workouts?success=true");
 
    } catch (error) {
        return {error: error.message};
    }
}