export function addExercise(form, updateForm) {
    updateForm(["exercises"], [
        ...form.exercises,
        {name: "", sets:[]}
    ]);
}

export function addSet(form, updateForm, exerciseIndex) {
    const currentSets = form.exercises[exerciseIndex].sets;
    updateForm(["exercises", exerciseIndex, "sets"], [
        ...currentSets,
        {setCounter: currentSets.length + 1, reps: "", weight: ""}
    ]);
}

export function removeExercise(form, updateForm, exerciseIndex) {
    updateForm(["exercises"], form.exercises.filter((_, i) => i !== exerciseIndex));
}

export function removeSet(form, updateForm, exerciseIndex, setIndex) {
    const newSets = form.exercises[exerciseIndex].sets.filter((_, i) => i !== setIndex);
    updateForm(["exercises", exerciseIndex, "sets"], newSets);
}