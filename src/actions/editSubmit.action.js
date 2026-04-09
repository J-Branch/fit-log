import { redirect } from "react-router-dom";
import { functions, account } from "../api/appwrite.api";

export async function editSubmit({ request, params }) {
    try {
        const formData = await request.formData();
        const intent = formData.get("intent");
        // const form = JSON.parse(formData.get("payload"));

        const functionID = import.meta.env.VITE_APPWRITE_FUNCTIONS_WRITESDB_ID;

        let response;

        if (intent === "delete") {
            response = await functions.createExecution({
                functionId: functionID,
                body: JSON.stringify({
                    id: params.id,
                    workoutType: formData.get("workoutType"),
                    updateNumber: formData.get("updateNumber")
                }),
                headers: {
                    "x-action-type": "delete",
                }
            });

        } else {
            const form = JSON.parse(formData.get("payload"));

            response = await functions.createExecution({
                functionId: functionID,
                body: JSON.stringify(form),
                headers: {
                    "x-action-type": "edit",
                }
            });
        }

        const result = JSON.parse(response.responseBody);

        if (!result.success) {
            return {error: result.message}
        }

        if (intent === "delete") {

            return redirect("../workouts?toast=deleted");
        }

        return redirect("../workouts?toast=edited");
 
    } catch (error) {
        return {error: error.message};
    }
}