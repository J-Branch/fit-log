import { ID } from "appwrite";
import { createRow, deleteRow, updateRow } from "../api/appwrite.workout";
import { redirect } from "react-router-dom";
import { getCurrentAuthSession } from "../api/appwrite.auth";

export async function editSubmit({ request }) {
    try {
        const user = await getCurrentAuthSession();
        const formData = await request.formData();
        const form = JSON.parse(formData.get("payload"));

        

        // will recursively walk through the form and call update on anything that needs to be updated
        async function updateWorkoutRow(node) {
            if (node.isDirty && node.$id) {
                await updateRow(node.table, node.$id, node);
            }

            if (Array.isArray(node.exercises)) {
                for (const exercise of node.exercises) {
                    await updateWorkoutRow(exercise);
                }
            }

            if(Array.isArray(node.sets)) {
                for (const set of node.sets) {
                    await updateWorkoutRow(set);
                }
            }
        }

 
    } catch (error) {
        return {error: error};
    }
}