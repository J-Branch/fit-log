import { Form } from "react-router-dom";

function DistanceTime({form, updateForm, mode}) {

    // const minutes = Math.floor(form.time / 60);
    // const seconds = form.time % 60;

    const minutes = Number(form.time.minutes) || 0;
    const seconds = Number(form.time.seconds) || 0;

    return (
        <Form method="post">
            <div className="border p-4 rounded space-y-4">

                <div className="space-y-2">
                    <h2 className="text-lg font-semibold">Date</h2>

                    {mode === "edit" ? (
                        <div className="flex gap-3">
                            <input
                                type="number"
                                className="border p-1 w-20"
                                placeholder="MM"
                                value={form.date.month}
                                onChange={(e) => updateForm(["date", "month"], e.target.value)}
                                onBlur={(e) => updateForm(["isDirty"], true)}
                            />
                            <input
                                type="number"
                                className="border p-1 w-20"
                                placeholder="DD"
                                value={form.date.day}
                                onChange={(e) => updateForm(["date", "day"], e.target.value)}
                                onBlur={(e) => updateForm(["isDirty"], true)}
                            />
                            <input
                                type="number"
                                className="border p-1 w-24"
                                placeholder="YYYY"
                                value={form.date.year}
                                onChange={(e) => updateForm(["date", "year"], e.target.value)}
                                onBlur={(e) => updateForm(["isDirty"], true)}
                            />
                        </div>
                    ) : (
                        <span>
                            {/* {form.date} */}
                            {form.date.month}/{form.date.day}/{form.date.year}
                        </span>
                    )}
                </div>

                <div className="space-y-2">
                    <h2 className="text-lg font-semibold">Time</h2>

                    {mode === "edit" ? (
                        <div className="flex gap-3">
                            <input
                                type="number"
                                className="border p-1 w-20"
                                placeholder="min"
                                value={form.time.minutes}
                                onChange={(e) => updateForm(["time", "minutes"], e.target.value)}
                                onBlur={(e) => updateForm(["isDirty"], true)}
                            />
                            <input
                                type="number"
                                className="border p-1 w-20"
                                placeholder="sec"
                                value={form.time.seconds}
                                onChange={(e) => updateForm(["time", "seconds"], e.target.value)}
                                onBlur={(e) => updateForm(["isDirty"], true)}
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

                    {mode === "edit" ? (
                        <input
                            type="number"
                            className="border p-1 w-32"
                            placeholder="Miles"
                            value={form.distance}
                            onChange={(e) => updateForm(["distance"], e.target.value)}
                            onBlur={(e) => updateForm(["isDirty"], true)}
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