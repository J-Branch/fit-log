import { useState } from 'react';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutList from '../components/WorkoutList';
import { useUserContext } from '../context/user.context';

// COULD PROBABLY MAKE THE ADD WORKOUT BUTTON BETTER

function WorkoutPage() {
    const [showForm, setShowForm] = useState(false);
    const { userId } = useUserContext();    

    

    // Load workouts into workouts array when WorkoutPage is loaded

    function handleAddWorkout() {
        setShowForm(!showForm);
    }

    function handleWorkoutSubmit() {
        // Hides the form
        setShowForm(!showForm);
        alert("Workout has been submitted!");
    }

    return (
        <div>
            <div>
                <button onClick={handleAddWorkout}>
                    Add Workout
                </button>
                { /* Passes handleWorkoutSubmit function to WorkoutForm as submitWorkout */ }
                {showForm && <WorkoutForm userId={userId} onWorkoutSubmit={handleWorkoutSubmit} />}
            </div>
            <div>
                { /* Passes workout list as a prop to WorkoutList */ }
                <WorkoutList userId={userId} />
            </div>
        </div>
    );
}

export default WorkoutPage;