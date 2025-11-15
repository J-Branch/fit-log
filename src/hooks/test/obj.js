const workouts = [
    {
        $id: 1,
        userId: 555,
        wn: back,
        wt: weightlifting,
        date: 01-01-2001,
        time: 0,
        distance: 0,
        $ca: na,
        $ua: na,
    }
]

const exercises = [
    {
        $id: 1,
        en: row,
        wid: 1,
        $ca: na,
        $ua: na,
    }
]

const sets = [
    {
        $id: 1,
        setCounter: 1,
        reps: 20,
        weight: 140,
        eid: 1,
        $ca: na,
        $ua: na,
    },
    {
        $id: 2,
        setCounter: 2,
        reps: 20,
        weight: 140,
        eid: 1,
        $ca: na,
        $ua: na,
    },
]



updateRow(sets, sets[1].$id, form);


return (
    <div className="flex items-center justify-center w-full min-h-screen text-indigo-900 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <div className="p-4 bg-white rounded-lg lg:p-8">
        <div className="flex items-center justify-between gap-4 mb-8 ">
          <h1 className="text-2xl font-semibold">Invoices</h1>
 
          <Link
            to="/invoice/create"
            className="px-4 py-2 transition-colors duration-150 bg-indigo-50 hover:bg-indigo-600 hover:text-indigo-100"
          >
            Create Invoice
          </Link>
        </div>
 
        {fetchInvoicesStatus === "SUCCESS" ? (
          invoices.length ? (
            <div>
              <div className="items-start hidden lg:flex gap-x-8 lg:gap-x-16">
                <span className="w-16 font-semibold text-indigo-600">ID</span>
                <span className="w-32 font-semibold text-indigo-600">
                  Client
                </span>
                <span className="w-16 font-semibold text-indigo-600">
                  Amount
                </span>
                <span className="w-24 font-semibold text-indigo-600">Date</span>
                <span className="w-24 font-semibold text-indigo-600">
                  Due Date
                </span>
                <span className="font-semibold text-indigo-600 w-36">
                  Payment Received
                </span>
              </div>
              <ul className="mt-2">
                {invoices.map(invoice => {
                  const {
                    $id,
                    invoiceId,
                    amount,
                    clientName,
                    date,
                    dueDate,
                    paymentReceived,
                  } = invoice;
                  return (
                    <li
                      key={$id}
                      className="px-4 py-2 lg:p-0 max-lg:my-4 max-lg:bg-indigo-50/50"
                    >
                      <Link
                        to={`/invoice/${$id}`}
                        className="p-2 -mx-2 rounded-md grid grid-cols-2 gap-y-4 lg:gap-y-0  lg:flex lg:flex-nowrap gap-x-8 lg:gap-x-16 lg:hover:bg-indigo-50 min-w-[15rem] sm:min-w-[20rem]"
                      >
                        <div className="flex flex-col lg:w-16">
                          <span className="text-sm text-indigo-600 lg:hidden">
                            ID
                          </span>
                          <span>{invoiceId}</span>
                        </div>
                        <div className="flex flex-col lg:w-32">
                          <span className="text-sm text-indigo-600 lg:hidden">
                            Client
                          </span>
                          <span>{clientName}</span>
                        </div>
                        <div className="flex flex-col lg:w-16">
                          <span className="text-sm text-indigo-600 lg:hidden">
                            Amount
                          </span>
                          <span>{amount}</span>
                        </div>
                        <div className="flex flex-col lg:w-24">
                          <span className="text-sm text-indigo-600 lg:hidden">
                            Date
                          </span>
                          <span>{date}</span>
                        </div>
                        <div className="flex flex-col lg:w-24">
                          <span className="text-sm text-indigo-600 lg:hidden">
                            Due Date
                          </span>
                          <span>{dueDate}</span>
                        </div>
                        <div className="flex flex-col lg:w-36">
                          <span className="text-sm text-indigo-600 lg:hidden">
                            Payment Received
                          </span>
                          <span>{paymentReceived ? "Yes" : "No"}</span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <Link
              to="/invoice/create"
              className="font-semibold text-indigo-600"
            >
              You have no invoices. Let&apos;s create one!
            </Link>
          )
        ) : (
          <p>Loading invoices...</p>
        )}
      </div>
    </div>
  );
};
 
export default ViewInvoices;




import { Link, useParams } from "react-router-dom";
import BankDetails from "./components/BankDetails";
import ClientDetails from "./components/ClientDetails";
import InvoiceDetails from "./components/InvoiceDetails";
import SenderDetails from "./components/SenderDetails";
import { useDeleteInvoice } from "./hooks/useDeleteInvoice";
import { useFetchInvoice } from "./hooks/useFetchInvoice";
import { useInvoiceForm } from "./hooks/useInvoiceForm";
import { useSubmitInvoice } from "./hooks/useSubmitInvoice";
 
const config = {
  create: {
    submitButtonText: "Create",
  },
  update: {
    submitButtonText: "Update",
  },
};
 
const Invoice = () => {
  const params = useParams();
  const { isEditMode, form, setForm, onFormChange } = useInvoiceForm();
 
  const { fetchInvoiceStatus, initFetchInvoice } = useFetchInvoice({
    id: params.id,
    onSetInvoice: setForm,
  });
 
  const { submitInvoiceStatus, onSubmitInvoice } = useSubmitInvoice({
    form,
    isEditMode,
  });
 
  const { deleteInvoiceStatus, initDeletePrompt } = useDeleteInvoice({
    invoiceId: form.$id,
  });
 
  const { submitButtonText } = isEditMode ? config.update : config.create;
 
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <div className="min-h-screen px-8 pb-16 bg-white md:w-3/4 md:ml-auto md:pr-0 md:pl-16 md:pb-24">
        <div className="flex items-center justify-between mr-8">
          <h1 className="my-8 text-2xl font-semibold text-indigo-900">
            Invoice
          </h1>
          <Link
            className="text-sm transition-all duration-150 text-indigo-900/50 hover:text-indigo-900"
            to="/"
          >
            Back To Invoices
          </Link>
        </div>
        {fetchInvoiceStatus === "PENDING" ? (
          <div>Fetching invoice data...</div>
        ) : null}
        {fetchInvoiceStatus === "ERROR" ? (
          <div>
            <button
              className="px-4 py-2 bg-indigo-600 rounded-md text-indigo-50"
              onClick={() => initFetchInvoice(params.id)}
            >
              Try Again
            </button>
          </div>
        ) : null}
        {fetchInvoiceStatus === "SUCCESS" ? (
          <form
            className="flex flex-col max-w-5xl gap-8"
            onSubmit={onSubmitInvoice}
          >
            <div className="flex flex-col gap-8 md:gap-12">
              <InvoiceDetails form={form} onFormChange={onFormChange} />
              <SenderDetails form={form} onFormChange={onFormChange} />
              <ClientDetails form={form} onFormChange={onFormChange} />
              <BankDetails form={form} onFormChange={onFormChange} />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="min-w-[6rem] px-4 py-3 mr-4 font-semibold text-indigo-800 transition-colors duration-150 bg-indigo-200/25 rounded-md hover:bg-rose-800 hover:text-rose-100"
                onClick={initDeletePrompt}
              >
                {deleteInvoiceStatus === "PENDING" ? "Deleting..." : "Delete"}
              </button>
 
              <button
                type="submit"
                className="min-w-[6rem] px-4 py-3 mr-8 font-semibold text-indigo-100 transition-colors duration-150 bg-indigo-600 rounded-md hover:bg-indigo-800"
              >
                {submitInvoiceStatus === "PENDING"
                  ? "Submitting..."
                  : submitButtonText}
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </div>
  );
};
 
export default Invoice;



import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getInvoice } from "../../../api/invoice.api";
import { formatDate } from "../../../helpers/formatDate";
 
export const useFetchInvoice = ({ id, onSetInvoice }) => {
  /**
   * If there is no ID, we just set the status to success, as there is no ID,
   * so the fetch request won't be executed.
   */
  const [fetchInvoiceStatus, setFetchInvoiceStatus] = useState(
    id ? "IDLE" : "SUCCESS"
  );
 
  const initFetchInvoice = async invoiceUid => {
    try {
      if (fetchInvoiceStatus === "PENDING") {
        return;
      }
 
      setFetchInvoiceStatus("PENDING");
 
      const invoice = await getInvoice(invoiceUid);
 
      onSetInvoice(currentForm => {
        const newForm = {
          $id: invoice.$id,
        };
        for (const key of Object.keys(currentForm)) {
          const value = invoice[key];
 
          /**
           * Format the dates
           */
          if (["date", "dueDate", "paymentDate"].includes(key) && value) {
            if (!value) {
              newForm[key] = "";
            } else {
              const [month, day, year] = formatDate(new Date(value)).split("/");
              newForm[key] = `${year}-${month}-${day}`;
            }
          } else {
            newForm[key] = value === null ? "" : value;
          }
        }
        return newForm;
      });
      setFetchInvoiceStatus("SUCCESS");
    } catch (error) {
      console.error(error);
      toast.error("There was a problem while fetching the invoice.");
      setFetchInvoiceStatus("ERROR");
    }
  };
 
  useEffect(() => {
    /**
     * Bail out if there is no invoice ID
     */
    if (!id) {
      return;
    }
    /**
     * We are on the edit invoice page.
     * Therefore, we need to fetch invoide details
     */
    initFetchInvoice(id);
  }, [id]);
 
  return {
    fetchInvoiceStatus,
    initFetchInvoice,
  };
};


import { useEffect } from "react";
import { useWorkoutContext } from "../../context/workout.context";

function useFetchWorkout({ workoutId, onSetWorkout }) {
    const { userWorkouts, userExercises, userSets } = useWorkoutContext();

    useEffect(() => {
        if (!workoutId || !userWorkouts.length) return;

        // 1️⃣ Get the specific workout
        const workout = userWorkouts.find(w => w.$id === workoutId);
        if (!workout) return;

        // 2️⃣ Get all exercises for this workout
        const exercises = userExercises.filter(e => e.workoutId === workoutId);

        // 3️⃣ For each exercise, get its sets
        const formattedExercises = exercises.map(exercise => {
            const setsForExercise = userSets
                .filter(s => s.exerciseId === exercise.$id)
                .map((set, i) => ({
                    $id: set.$id,            // set id
                    toDelete: false,
                    isDirty: false,
                    setCounter: i + 1,
                    reps: set.reps,
                    weight: set.weight,
                }));

            return {
                $id: exercise.$id,         // exercise id
                toDelete: false,
                isDirty: false,
                name: exercise.name,
                sets: setsForExercise,
            };
        });

        // 4️⃣ Full form structure
        const populatedWorkout = {
            $id: workout.$id,              // workout id
            toDelete: false,
            isDirty: false,
            workoutName: workout.workoutName,
            workoutType: workout.workoutType,
            date: workout.date,
            time: workout.time,
            distance: workout.distance,
            exercises: formattedExercises,
        };

        // 5️⃣ Populate form
        onSetWorkout(populatedWorkout);
    }, [workoutId, userWorkouts, userExercises, userSets, onSetWorkout]);
}

export default useFetchWorkout;


async function onWorkoutSubmit() {
  // 1️⃣ Update workout row if needed
  if (form.isDirty) {
    await updateRow("workouts", form.$id, {...});
  }

  // 2️⃣ Update existing exercises
  for (const ex of updateArray.filter(i => i.type === "exercise")) {
    await updateRow("exercises", ex.$id, {...});
  }

  // 3️⃣ Create new exercises
  for (const ex of form.exercises.filter(i => i.$id.startsWith("temp-"))) {
    const eid = ID.unique();
    await createRow("exercises", eid, {..., wid: form.$id});

    // 4️⃣ Create sets for this exercise
    for (const set of ex.sets.filter(s => s.$id.startsWith("temp-"))) {
      const setId = ID.unique();
      await createRow("sets", setId, {..., eid});
    }
  }

  // 5️⃣ Update existing sets
  for (const set of updateArray.filter(i => i.type === "set")) {
    await updateRow("sets", set.$id, {...});
  }

  // 6️⃣ Delete removed rows
  for (const del of deleteArray) {
    await deleteRow(del.type, del.$id);
  }
}



function EditWorkout() {
    const params = useParams();
    const { userWorkouts, userExercises, userSets } = useWorkoutContext();
    const { form, setForm, updateForm, updateArray, deleteArray, trackChange } = useWorkoutForm();

    const fetchedWorkout = FetchWorkout({
        workoutId: params.id,
        userWorkouts,
        userExercises,
        userSets,
    });

    useEffect(() => {
        if (fetchedWorkout && !form.$id) {
            setForm(fetchedWorkout);
        }
    }, [fetchedWorkout, form.$id]);

    function handleAddExercise() {
        updateForm(["exercises"], [
            ...form.exercises,
            { $id: null, toDelete: false, isDirty: false, name: "", sets: [{ $id: null, toDelete: false, isDirty: false, setCounter: 1, reps: "", weight: "" }] },
        ]);
    }

    function handleAddSet(exerciseIndex) {
        const currentSets = form.exercises[exerciseIndex].sets;
        updateForm(["exercises", exerciseIndex, "sets"], [
            ...currentSets,
            { $id: null, toDelete: false, isDirty: false, setCounter: currentSets.length + 1, reps: "", weight: "" },
        ]);
    }

    function handleRemoveExercise(exerciseIndex) {
        const exercise = form.exercises[exerciseIndex];
        trackChange(exercise, "delete"); // mark for deletion
        updateForm(["exercises"], form.exercises.filter((_, i) => i !== exerciseIndex));
    }

    function handleRemoveSet(exerciseIndex, setIndex) {
        const set = form.exercises[exerciseIndex].sets[setIndex];
        trackChange(set, "delete"); // mark for deletion
        const newSets = form.exercises[exerciseIndex].sets.filter((_, i) => i !== setIndex);
        updateForm(["exercises", exerciseIndex, "sets"], newSets);
    }

    async function onEditSubmit(e) {
        e.preventDefault();

        // Update workout itself if dirty
        if (form.isDirty) {
            const payload = {
                workoutName: form.workoutName,
                workoutType: form.workoutType,
                date: form.date,
                time: form.time,
                distance: form.distance,
            };
            await updateRow("workouts", form.$id, payload);
        }

        // Update edited exercises and sets
        for (const row of updateArray) {
            // row can be exercise or set
            const table = row.setCounter ? "sets" : "exercises"; // simple check: sets have setCounter
            await updateRow(table, row.$id, row);
        }

        // Delete marked exercises/sets
        for (const row of deleteArray) {
            const table = row.setCounter ? "sets" : "exercises";
            await deleteRow(table, row.$id);
        }
    }

    return (
        <div>
            <h1>Edit Workout</h1>
            <form onSubmit={onEditSubmit}>
                <label>Workout Name</label>
                <input
                    type="text"
                    value={form.workoutName}
                    onChange={(e) => {
                        updateForm(["workoutName"], e.target.value);
                        trackChange(form, "update");
                    }}
                />

                <label>Workout Type</label>
                <select
                    value={form.workoutType}
                    onChange={(e) => {
                        updateForm(["workoutType"], e.target.value);
                        trackChange(form, "update");
                    }}
                >
                    <option value="">--- Select ---</option>
                    <option value="Weightlifting">Weightlifting</option>
                    <option value="Distance/Time">Distance/Time</option>
                </select>

                {form.exercises.map((exercise, exerciseIndex) => (
                    <div key={exerciseIndex} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0" }}>
                        <input
                            type="text"
                            value={exercise.name}
                            onChange={(e) => {
                                updateForm(["exercises", exerciseIndex, "name"], e.target.value);
                                trackChange(exercise, "update");
                            }}
                        />
                        {exercise.sets.map((set, setIndex) => (
                            <div key={setIndex}>
                                <input
                                    type="number"
                                    value={set.reps}
                                    onChange={(e) => {
                                        updateForm(["exercises", exerciseIndex, "sets", setIndex, "reps"], e.target.value);
                                        trackChange(set, "update");
                                    }}
                                />
                                <input
                                    type="number"
                                    value={set.weight}
                                    onChange={(e) => {
                                        updateForm(["exercises", exerciseIndex, "sets", setIndex, "weight"], e.target.value);
                                        trackChange(set, "update");
                                    }}
                                />
                                <button type="button" onClick={() => handleRemoveSet(exerciseIndex, setIndex)}>Remove Set</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => handleAddSet(exerciseIndex)}>Add Set</button>
                        <button type="button" onClick={() => handleRemoveExercise(exerciseIndex)}>Remove Exercise</button>
                    </div>
                ))}

                <button type="button" onClick={handleAddExercise}>Add Exercise</button>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default EditWorkout;

