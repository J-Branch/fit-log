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
    const userExercises = await tablesdb.listRows({
        databaseId: "68c4350c002ec8a50d2a",
        tableId: "exercises",
        queries: [
            Query.equal('userId', userId)
        ]
    });
    return userExercises.rows;
}

export async function getUserSets( userId ) {
    const userSets = await tablesdb.listRows({
        databaseId: "68c4350c002ec8a50d2a",
        tableId: "sets",
        queries: [
            Query.equal('userId', userId)
        ]
    });
    return userSets.rows;
}

export async function setUserWorkouts( userId, workoutName, workoutType, date, time, distance, wid ) {
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
            "distance": distance,
            "wid": wid
        },
        permissions: [
            Permission.read(Role.user(userId)),
            Permission.update(Role.user(userId)),
            Permission.delete(Role.user(userId)),
        ]
    });
}

export async function setUserExercises( userId, wid, exerciseName ) {
    const eid = ID.unique();

    await tablesdb.createRow({
        databaseId: "68c4350c002ec8a50d2a",
        tableId: "exercises",
        rowId: eid,
        data: {
            "userId": userId,
            "wid": wid,
            "eid": eid,
            "exerciseName": exerciseName
        },
        permissions: [
            Permission.read(Role.user(userId)),
            Permission.update(Role.user(userId)),
            Permission.delete(Role.user(userId)),
        ]
    });

    return eid;
}

export async function setUserSets( userId, wid, eid, setCounter, reps, weight ) {
    await tablesdb.createRow({
        databaseId: "68c4350c002ec8a50d2a",
        tableId: "sets",
        rowId:ID.unique(),
        data: {
            "userId": userId,
            "wid": wid,
            "eid": eid,
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