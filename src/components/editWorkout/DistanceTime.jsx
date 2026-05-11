// function DistanceTime({ form, updateForm, mode }) {

//     const minutes = Number(form.time.minutes) || 0;
//     const seconds = Number(form.time.seconds) || 0;

//     return (
//         <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">

//             {mode !== "edit" ? (
//                 <div className="space-y-6">

//                     <div className="grid grid-cols-3 gap-4">

//                         <div className="bg-gradient-to-b from-gray-50 to-white border border-gray-200 rounded-xl p-4 text-center">
//                             <p className="text-xs text-gray-400">📅 Date</p>
//                             <p className="text-sm font-semibold text-gray-900 mt-1">
//                                 {form.date.month}/{form.date.day}/{form.date.year}
//                             </p>
//                         </div>

//                         <div className="bg-gradient-to-b from-gray-50 to-white border border-gray-200 rounded-xl p-4 text-center">
//                             <p className="text-xs text-gray-400">⏱ Time</p>
//                             <p className="text-sm font-semibold text-gray-900 mt-1">
//                                 {minutes}m {seconds}s
//                             </p>
//                         </div>

//                         <div className="bg-gradient-to-b from-gray-50 to-white border border-gray-200 rounded-xl p-4 text-center">
//                             <p className="text-xs text-gray-400">📏 Distance</p>
//                             <p className="text-sm font-semibold text-gray-900 mt-1">
//                                 {form.distance} mi
//                             </p>
//                         </div>
//                     </div>

//                     {form.distance > 0 && (
//                         <div className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center">
//                             <span className="text-sm text-gray-500">
//                                 Avg Pace
//                             </span>

//                             <span className="text-sm font-semibold text-primary-red-one">
//                                 {Math.floor((minutes * 60 + seconds) / form.distance / 60)}m{" "}
//                                 {Math.round((minutes * 60 + seconds) / form.distance % 60)}s / mi
//                             </span>
//                         </div>
//                     )}
//                 </div>
//             ) : (
//                 <>
//                     <div className="space-y-2">
//                         <p className="text-xs text-gray-400">Date</p>
//                         <div className="flex gap-3">
//                             <input
//                                 type="number"
//                                 className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-red-one/50"
//                                 value={form.date.month}
//                                 onChange={(e) =>
//                                     updateForm(["date", "month"], e.target.value)
//                                 }
//                             />
//                             <input
//                                 type="number"
//                                 className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-red-one/50"
//                                 value={form.date.day}
//                                 onChange={(e) =>
//                                     updateForm(["date", "day"], e.target.value)
//                                 }
//                             />
//                             <input
//                                 type="number"
//                                 className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-red-one/50"
//                                 value={form.date.year}
//                                 onChange={(e) =>
//                                     updateForm(["date", "year"], e.target.value)
//                                 }
//                             />
//                         </div>
//                     </div>

//                     <div className="space-y-2">
//                         <p className="text-xs text-gray-400">Time</p>
//                         <div className="flex gap-3">
//                             <input
//                                 type="number"
//                                 className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-red-one/50"
//                                 value={form.time.minutes}
//                                 onChange={(e) =>
//                                     updateForm(["time", "minutes"], e.target.value)
//                                 }
//                             />
//                             <input
//                                 type="number"
//                                 className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-red-one/50"
//                                 value={form.time.seconds}
//                                 onChange={(e) =>
//                                     updateForm(["time", "seconds"], e.target.value)
//                                 }
//                             />
//                         </div>
//                     </div>

//                     <div className="space-y-2">
//                         <p className="text-xs text-gray-400">Distance</p>
//                         <input
//                             type="number"
//                             className="w-32 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-red-one/50"
//                             value={form.distance}
//                             onChange={(e) =>
//                                 updateForm(["distance"], e.target.value)
//                             }
//                         />
//                     </div>
//                 </>
//             )}

//         </div>
//     );
// }

// export default DistanceTime;

function DistanceTime({ form, updateForm, mode }) {
    const minutes = Number(form.time.minutes) || 0;
    const seconds = Number(form.time.seconds) || 0;

    function handleNumber(path, value) {
        updateForm(["isDirty"], true);

        updateForm(path, value === "" ? "" : Number(value));
    }

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">

            {mode !== "edit" ? (
                <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">

                        <div className="p-4 text-center">
                            <p className="text-xs text-gray-400">📅 Date</p>
                            <p className="text-sm font-semibold">
                                {form.date.month}/{form.date.day}/{form.date.year}
                            </p>
                        </div>

                        <div className="p-4 text-center">
                            <p className="text-xs text-gray-400">⏱ Time</p>
                            <p className="text-sm font-semibold">
                                {minutes}m {seconds}s
                            </p>
                        </div>

                        <div className="p-4 text-center">
                            <p className="text-xs text-gray-400">📏 Distance</p>
                            <p className="text-sm font-semibold">
                                {form.distance} mi
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="space-y-2">
                        <p className="text-xs text-gray-400">Date</p>

                        <div className="flex gap-3">
                            <input
                                type="number"
                                value={form.date.month}
                                onChange={(e) =>
                                    handleNumber(["date", "month"], e.target.value)
                                }
                            />
                            <input
                                type="number"
                                value={form.date.day}
                                onChange={(e) =>
                                    handleNumber(["date", "day"], e.target.value)
                                }
                            />
                            <input
                                type="number"
                                value={form.date.year}
                                onChange={(e) =>
                                    handleNumber(["date", "year"], e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-xs text-gray-400">Time</p>

                        <div className="flex gap-3">
                            <input
                                type="number"
                                value={form.time.minutes}
                                onChange={(e) =>
                                    handleNumber(["time", "minutes"], e.target.value)
                                }
                            />
                            <input
                                type="number"
                                value={form.time.seconds}
                                onChange={(e) =>
                                    handleNumber(["time", "seconds"], e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-xs text-gray-400">Distance</p>

                        <input
                            type="number"
                            value={form.distance}
                            onChange={(e) =>
                                handleNumber(["distance"], e.target.value)
                            }
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default DistanceTime;