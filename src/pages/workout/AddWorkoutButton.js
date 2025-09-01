// src/pages/workout/AddWorkoutButton.js
import { useState } from 'react';
import WorkoutForm from './WorkoutForm';

function AddWorkoutButton() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      {!showForm && (
        <button onClick={() => setShowForm(true)}>Add Workout</button>
      )}

      {showForm && (
        <WorkoutForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}

export default AddWorkoutButton;
