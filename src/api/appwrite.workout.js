import { tablesdb } from "./appwrite.api";
import { Permission, Role } from "appwrite";
import { Query } from "appwrite";
import { ID } from "appwrite";

export async function getUserWorkouts( userId ) {
    const userWorkouts = await tablesdb.listRows({
        databaseId: '68c4350c002ec8a50d2a',
        tableId: 'workouts',
        queries: [
            Query.equal('userId', userId)
        ]
    });
    return userWorkouts.rows;
}

export async function getUserExercises( userId ) {
    const userWorkouts = await getUserWorkouts(userId);
    const workoutIds = userWorkouts.map(doc => doc.$id);

    if (workoutIds.length === 0) return [];

    const userExercises = await tablesdb.listRows({
        databaseId: "68c4350c002ec8a50d2a",
        tableId: "exercises",
        queries: [
            Query.contains('workoutId', workoutIds)
        ]
    });
    return userExercises.rows;
}

export async function getUserSets( userId ) {
    const userExercises = await getUserExercises(userId);
    const exerciseIds = userExercises.map(doc => doc.$id);

    if (exerciseIds.length === 0) return [];

    const userSets = await tablesdb.listRows({
        databaseId: "68c4350c002ec8a50d2a",
        tableId: "sets",
        queries: [
            Query.contains('exerciseId', exerciseIds)
        ]
    });
    return userSets.rows;
}

export async function setUserWorkouts( userId, workoutName, workoutType, date, time, distance ) {
    return await tablesdb.createRow({
        databaseId: "68c4350c002ec8a50d2a",
        tableId: "workouts",
        rowId: ID.unique(),
        data: {
            "userId": userId,
            "workoutName": workoutName,
            "workoutType": workoutType,
            "date": date,
            "time": time,
            "distance": distance
        },
        permissions: [
            Permission.read(Role.user(userId)),
            Permission.update(Role.user(userId)),
            Permission.delete(Role.user(userId)),
        ]
    });
}

export async function setUserExercises( userId, workoutId, exerciseName ) {
    await tablesdb.createRow({
        databaseId: "68c4350c002ec8a50d2a",
        tableId: "exercises",
        rowId: ID.unique(),
        data: {
            "workoutId": workoutId,
            "exerciseName": exerciseName
        },
        permissions: [
            Permission.read(Role.user(userId)),
            Permission.update(Role.user(userId)),
            Permission.delete(Role.user(userId)),
        ]
    });
}

export async function setUserSets( userId, exerciseId, setCounter, reps, weight ) {
    await tablesdb.createRow({
        databaseId: "68c4350c002ec8a50d2a",
        tableId: "sets",
        data: {
            "exerciseId": exerciseId,
            "setCounter": setCounter,
            "reps": reps,
            "weight": weight
        },
        permissions: [
            Permission.read(Role.user(userId)),
            Permission.update(Role.user(userId)),
            Permission.delete(Role.user(userId)),
        ]
    });
}