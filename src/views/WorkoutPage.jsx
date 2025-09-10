import { useState } from 'react';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutList from '../components/WorkoutList';

function WorkoutPage() {
    const [showForm, setShowForm] = useState(false);
    const [workouts, setWorkouts] = useState([]);

    // Load workouts into workouts array when WorkoutPage is loaded

    function handleAddWorkout() {
        setShowForm(!showForm);
    }

    function handleWorkoutSubmit(newWorkout) {
        // Puts new workout in workout list and hides the form
        setShowForm(!showForm);
        setWorkouts([...workouts, newWorkout]);
        console.log(newWorkout);
    }

    return (
        <div>
            <div>
                <button onClick={handleAddWorkout}>
                    Add Workout
                </button>
                { /* Passes handleWorkoutSubmit function to WorkoutForm as submitWorkout */ }
                {showForm && <WorkoutForm submitWorkout={handleWorkoutSubmit} />}
            </div>
            <div>
                { /* Passes workout list as a prop to WorkoutList */ }
                <WorkoutList workouts={workouts} />
            </div>
        </div>
    );
}

export default WorkoutPage;