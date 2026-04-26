import { Form } from "react-router-dom";

function DistanceTime({ form, updateForm, mode }) {

    const minutes = Number(form.time.minutes) || 0;
    const seconds = Number(form.time.seconds) || 0;

    return (
        <div className="bg-white border border-gray-100 rounded-xl p-5 space-y-6 shadow-sm">

            {/* DATE SECTION */}
            <div className="space-y-2">
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Date
                </p>

                {mode === "edit" ? (
                    <div className="flex gap-3">
                        <input
                            type="number"
                            className="w-20 px-2 py-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red-one"
                            placeholder="MM"
                            value={form.date.month}
                            onChange={(e) =>
                                updateForm(["date", "month"], e.target.value)
                            }
                            onBlur={() => updateForm(["isDirty"], true)}
                        />

                        <input
                            type="number"
                            className="w-20 px-2 py-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red-one"
                            placeholder="DD"
                            value={form.date.day}
                            onChange={(e) =>
                                updateForm(["date", "day"], e.target.value)
                            }
                            onBlur={() => updateForm(["isDirty"], true)}
                        />

                        <input
                            type="number"
                            className="w-24 px-2 py-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red-one"
                            placeholder="YYYY"
                            value={form.date.year}
                            onChange={(e) =>
                                updateForm(["date", "year"], e.target.value)
                            }
                            onBlur={() => updateForm(["isDirty"], true)}
                        />
                    </div>
                ) : (
                    <p className="text-sm text-gray-700 font-medium">
                        {form.date.month}/{form.date.day}/{form.date.year}
                    </p>
                )}
            </div>

            {/* TIME SECTION */}
            <div className="space-y-2">
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Time
                </p>

                {mode === "edit" ? (
                    <div className="flex gap-3">
                        <input
                            type="number"
                            className="w-20 px-2 py-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red-one"
                            placeholder="Min"
                            value={form.time.minutes}
                            onChange={(e) =>
                                updateForm(["time", "minutes"], e.target.value)
                            }
                            onBlur={() => updateForm(["isDirty"], true)}
                        />

                        <input
                            type="number"
                            className="w-20 px-2 py-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red-one"
                            placeholder="Sec"
                            value={form.time.seconds}
                            onChange={(e) =>
                                updateForm(["time", "seconds"], e.target.value)
                            }
                            onBlur={() => updateForm(["isDirty"], true)}
                        />
                    </div>
                ) : (
                    <p className="text-sm text-gray-700 font-medium">
                        {minutes}m {seconds}s
                    </p>
                )}
            </div>

            {/* DISTANCE SECTION */}
            <div className="space-y-2">
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Distance
                </p>

                {mode === "edit" ? (
                    <input
                        type="number"
                        className="w-32 px-2 py-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red-one"
                        placeholder="Miles"
                        value={form.distance}
                        onChange={(e) =>
                            updateForm(["distance"], e.target.value)
                        }
                        onBlur={() => updateForm(["isDirty"], true)}
                    />
                ) : (
                    <p className="text-sm text-gray-700 font-medium">
                        {form.distance} miles
                    </p>
                )}
            </div>

        </div>
    );
}

export default DistanceTime;