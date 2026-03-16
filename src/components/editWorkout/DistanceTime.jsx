import { addExercise, addSet, removeExercise, removeSet } from "../../utils/workoutHandlers";
import { Form } from "react-router-dom";

function DistanceTime({form, updateForm, isEditing }) {

    const minutes = Math.floor(form.time / 60);
    const seconds = form.time % 60;

    return (
        <Form method="post">
            <div className="border p-4 rounded space-y-4">

                <div className="space-y-2">
                    <h2 className="text-lg font-semibold">Date</h2>

                    {isEditing ? (
                        <div className="flex gap-3">
                            <input
                                type="number"
                                className="border p-1 w-20"
                                placeholder="MM"
                                value={form.date.month}
                                onChange={(e) => updateForm(["date", "month"], e.target.value)}
                            />
                            <input
                                type="number"
                                className="border p-1 w-20"
                                placeholder="DD"
                                value={form.date.day}
                                onChange={(e) => updateForm(["date", "day"], e.target.value)}
                            />
                            <input
                                type="number"
                                className="border p-1 w-24"
                                placeholder="YYYY"
                                value={form.date.year}
                                onChange={(e) => updateForm(["date", "year"], e.target.value)}
                            />
                        </div>
                    ) : (
                        <span>
                            {form.date}
                        </span>
                    )}
                </div>

                <div className="space-y-2">
                    <h2 className="text-lg font-semibold">Time</h2>

                    {isEditing ? (
                        <div className="flex gap-3">
                            <input
                                type="number"
                                className="border p-1 w-20"
                                placeholder="min"
                                value={form.time.minutes}
                                onChange={(e) => updateForm(["time", "minutes"], e.target.value)}
                            />
                            <input
                                type="number"
                                className="border p-1 w-20"
                                placeholder="sec"
                                value={form.time.seconds}
                                onChange={(e) => updateForm(["time", "seconds"], e.target.value)}
                            />
                        </div>
                    ) : (
                        <span>
                            {minutes}m {seconds}s
                        </span>
                    )}
                </div>

                <div className="space-y-2">
                    <h2 className="text-lg font-semibold">Distance</h2>

                    {isEditing ? (
                        <input
                            type="number"
                            className="border p-1 w-32"
                            placeholder="Miles"
                            value={form.distance}
                            onChange={(e) => updateForm(["distance"], e.target.value)}
                        />
                    ) : (
                        <span>{form.distance} miles</span>
                    )}
                </div>
            </div>
        </Form>
    );
}

export default DistanceTime;