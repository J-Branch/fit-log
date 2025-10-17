import { tablesdb, databaseId } from "./appwrite.api";
import { Permission, Role } from "appwrite";


export function getRow(tableId, rowId, query) {
    return tablesdb.getRow({
        databaseId,
        tableId,
        rowId,
        queries: query
    });
};

export function listRows(tableId, query) {
    return tablesdb.listRows({
        databaseId,
        tableId,
        queries: query
    });
};

export function createRow(userId, tableId, rowId, payload) {
    const ownerRole = Role.user(userId);
    return tablesdb.createRow({
        databaseId,
        tableId,
        rowId: rowId,
        data: payload,
        permissions: [
            Permission.read(ownerRole),
            Permission.update(ownerRole),
            Permission.delete(ownerRole),
        ]
    });
};

export function deleteRow(tableId, rowId) {
    return tablesdb.deleteRow({
        databaseId,
        tableId,
        rowId
    });
};

export function updateRow(tableId, rowId, payload) {
   // const ownerRole = Role.user(userId);
   return tablesdb.updateRow({
        databaseId,
        tableId,
        rowId,
        data: payload,
    });
};

export async function getWorkout(workoutTableId, exercisesTableId, setsTableId, workoutId) {
    
    // get the workout row
    const workout = await getRow(workoutTableID, workoutId);

    // get all exercises associated with the workout
    const exercisesToWorkout = await listRows(exercisesTableId, [
        `equal("workoutId", "${workoutId}")`,
    ]);

    const exercises = exercisesToWorkout || [];

    // get all sets associated with the exercises
    for(const exercise of exercises) {
        const setsToExercise = await listRows(setsTableID, [
            `equal("exerciseId", "${exercise.$id}")`,
        ]);

        exercise.sets = setsToExercise.rows || [];
    }

    return { ...workout, exercises };
}