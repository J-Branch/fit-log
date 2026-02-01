import { ID } from "appwrite";
import { createRow, deleteRow, updateRow } from "../api/appwrite.workout";
import { redirect } from "react-router-dom";
import { getCurrentAuthSession } from "../api/appwrite.auth";

export async function editSubmit({ request }) {
    try {
        const user = await getCurrentAuthSession();
        const formData = await request.formData();

        const workoutName = formData.get("workoutName");
        const workoutType = formData.get("workoutType");
        const dateMonth = formData.get("dateMonth");
        const dateDay = formData.get("dateDay");
        const dateYear = formData.get("dateYear");

        const minutes = formData.get("durationMinutes");
        const seconds = formData.get("durationSeconds");
        const distance = formData.get("distance");

    } catch (error) {
        return {error: error};
    }
}