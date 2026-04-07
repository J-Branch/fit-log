import { Account, Client, TablesDB, ID, Permission, Role } from "node-appwrite";

export default async ({ req, res, log, error }) => {

  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const tablesdb = new TablesDB(client);
  const account = new Account(client);

  const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
  const WORKOUTS_ID = process.env.APPWRITE_WORKOUTS_ID;
  const EXERCISES_ID = process.env.APPWRITE_EXERCISES_ID;
  const SETS_ID = process.env.APPWRITE_SETS_ID;

  const AGGREGATE_ID = process.env.APPWRITE_AGGREGATE_ID;

  // const USER_ID = process.env.APPWRITE_FUNCTION_USER_ID;

  // const USER_ID = req.headers['x-appwrite-user-id'];
  const user = await account.get();
  const USER_ID = user.$id;


  const ownerRole = Role.user(USER_ID);

  const ownerPermissions = [
    Permission.read(ownerRole),
    Permission.update(ownerRole),
    Permission.delete(ownerRole),
  ];

  async function deleteWorkoutRow(node) {

    // base case for if the workout is marked, delete and return
    if (node.table === "workouts" && node.toDelete === true) {
      await tablesdb.deleteRow({
        databaseId: DATABASE_ID,
        tableId: WORKOUTS_ID,
        rowId: node.$id
      });
      return;
    }

    // base case for anything else marked for delete
    if (node.toDelete === true) {
      await tablesdb.deleteRow({
        databaseId: DATABASE_ID,
        tableId: node.table,
        rowId: node.$id
      });
      return;
    }

    const promises = [];

    if (Array.isArray(node.exercises)) {
      promises.push(
        ...node.exercises.map(ex => deleteWorkoutRow(ex))
      );
    }

    if (Array.isArray(node.sets)) {
      promises.push(
        ...node.sets.map(set => deleteWorkoutRow(set))
      );
    }

    await Promise.all(promises);
  }

  async function updateWorkoutRow(node) {

    const promises = [];

    if (node.isDirty && node.$id) {
      promises.push(
        tablesdb.updateRow({
          databaseId: DATABASE_ID,
          tableId: node.table,
          rowId: node.$id,
          data: node
        })
      );
    }

    if (Array.isArray(node.exercises)) {
      promises.push(
        ...node.exercises.map(ex => updateWorkoutRow(ex))
      );
    }

    if (Array.isArray(node.sets)) {
      promises.push(
        ...node.sets.map(set => updateWorkoutRow(set))
      );
    }

    await Promise.all(promises);
  }

  try {

    const aggregteRow = await tablesdb.listRows({
      databaseId: DATABASE_ID,
      tableId: AGGREGATE_ID,
      queries: [`userId=${USER_ID}`]
    });

    const aggregateRowId = aggregteRow.rows[0].$id;

    const form = JSON.parse(req.body);
    const type = req.headers["x-action-type"];

    if (type === "create") {

      const workoutName = form.workoutName;
      const workoutType = form.workoutType;

      const dateMonth = form.date.month;
      const dateDay = form.date.day;
      const dateYear = form.date.year;

      const minutes = form.time.minutes;
      const seconds = form.time.seconds;

      const distance = form.distance;

      const workoutDate = `${dateYear}-${dateMonth.toString().padStart(2, "0")}-${dateDay.toString().padStart(2, "0")}`;

      const wid = ID.unique();

      const payload = {
        userId: USER_ID,
        workoutName,
        workoutType,
        date: workoutDate,
      };

      // logic for distance/time workouts
      if (workoutType === "Distance/Time") {

        const totalTime = Number(minutes) * 60 + Number(seconds);

        await tablesdb.createRow({
          databaseId: DATABASE_ID,
          tableId: WORKOUTS_ID,
          rowId: wid,
          data: {
            ...payload,
            time: totalTime,
            distance: Number(distance)
          },
          permissions: ownerPermissions
        });

        await tablesdb.incrementRowColumn({
          databaseId: DATABASE_ID,
          tableId: AGGREGATE_ID,
          rowId: aggregateRowId,
          column: 'TotalDistance',
          value: Number(distance),
        });

      } else {

        // if not distance/time then it is weightlifting 
        await tablesdb.createRow({
          databaseId: DATABASE_ID,
          tableId: WORKOUTS_ID,
          rowId: wid,
          data: payload,
          permissions: ownerPermissions
        });

        let exerciseWeight = 0;

        const exercises = form.exercises;

        const exercisePromises = exercises.map(async (exercise) => {

          if (!exercise.exerciseName) return;

          // adds up all of the exercises total weight
          exerciseWeight += Number(exercise.totalWeight)

          const eid = ID.unique();

          await tablesdb.createRow({
            databaseId: DATABASE_ID,
            tableId: EXERCISES_ID,
            rowId: eid,
            data: {
              wid,
              exerciseName: exercise.exerciseName
            },
            permissions: ownerPermissions
          });

          let setWeight = 0;

          const setPromises = exercise.sets.map(set => {

            if (!set.reps && !set.weight) return;

            // adds up each set's weight
            setWeight += Number(set.weight);

            return tablesdb.createRow({
              databaseId: DATABASE_ID,
              tableId: SETS_ID,
              rowId: ID.unique(),
              data: {
                eid: eid,
                wid: wid,
                setCounter: Number(set.setCounter),
                reps: Number(set.reps),
                weight: Number(set.weight)
              },
              permissions: ownerPermissions
            });

          });

          await Promise.all(setPromises);

          // updates the exercise totalWeight after all the sets have been created and added up
          await tablesdb.updateRow({
            databaseId: DATABASE_ID,
            tableId: EXERCISES_ID,
            rowId: eid,
            data: {
              totalWeight: setWeight
            }
          });

        });

        await Promise.all(exercisePromises);

        // updates the workout totalWeight after all of the exercise's total weight has been added up
        await tablesdb.updateRow({
          databaseId: DATABASE_ID,
          tableId: WORKOUTS_ID,
          rowId: wid,
          data: {
            totalWeight: exerciseWeight
          }
        });

        // add the workout total weight to the current aggregate table weight
        await tablesdb.incrementRowColumn({
          databaseId: DATABASE_ID,
          tableId: AGGREGATE_ID,
          rowId: aggregateRowId,
          column: 'totalWeight',
          value: exerciseWeight
        })
      }
    }

    if (type === "edit") {

      await deleteWorkoutRow(form);

      await updateWorkoutRow(form);

      const wid = form.$id;

      if (form.workoutType === "Weightlifting") {

        const newExercises = form.exercises.filter(ex => ex.$id === null);

        await Promise.all(newExercises.map(async exercise => {

          const eid = ID.unique();

          await tablesdb.createRow({
            databaseId: DATABASE_ID,
            tableId: EXERCISES_ID,
            rowId: eid,
            data: {
              wid,
              exerciseName: exercise.exerciseName
            },
            permissions: ownerPermissions
          });

          const setPromises = exercise.sets.map(set => {
            return tablesdb.createRow({
              databaseId: DATABASE_ID,
              tableId: SETS_ID,
              rowId: ID.unique(),
              data: {
                eid,
                setCounter: Number(set.setCounter),
                reps: Number(set.reps),
                weight: Number(set.weight)
              },
              permissions: ownerPermissions
            });
          });

          await Promise.all(setPromises);

        }));

        const setPromises = [];

        for (const exercise of form.exercises) {

          for (const set of exercise.sets) {

            if (set.$id !== null) continue;

            setPromises.push(
              tablesdb.createRow({
                databaseId: DATABASE_ID,
                tableId: SETS_ID,
                rowId: ID.unique(),
                data: {
                  eid: exercise.$id,
                  setCounter: Number(set.setCounter),
                  reps: Number(set.reps),
                  weight: Number(set.weight)
                },
                permissions: ownerPermissions
              })
            );

          }

        }

        await Promise.all(setPromises);

      }
    }

    return res.json({ success: true });

  } catch (err) {

    return res.json({
      success: false,
      message: err.message
    });

  }

};