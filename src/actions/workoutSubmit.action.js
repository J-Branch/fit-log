import { redirect } from "react-router-dom";
import { getCurrentAuthSession } from "../api/appwrite.auth";
import { functions, account } from "../api/appwrite.api";

export async function workoutSubmit({ request }) {

    try {
        const formData = await request.formData();

        const data = {
            workoutName: formData.get("workoutName"),
            workoutType: formData.get("workoutType"),
            date: {
              month: Number(formData.get("dateMonth")),
              day: Number(formData.get("dateDay")),
              year: Number(formData.get("dateYear")),
            },
            distance: Number(formData.get("distance")),
            time: {
              minutes: Number(formData.get("durationMinutes")),
              seconds: Number(formData.get("durationSeconds")),
            },
            exercises: JSON.parse(formData.get("exercises"))
        };


        const functionID = import.meta.env.VITE_APPWRITE_FUNCTIONS_WRITESDB_ID;

        const response = await functions.createExecution({
            functionId: functionID,
            body: JSON.stringify(data),
            headers: {
                "x-action-type": "create",
            },
        });

        const result = JSON.parse(response.responseBody);

        if (!result.success) {
            return {error: result.message}
        }

        return redirect("../workouts?toast=created");

    } catch (error) {
        return {error: error.message};
    }
}