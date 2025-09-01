import { useState } from 'react';
import ExerciseForm from './ExerciseForm';

function WorkoutForm({ onClose }) {
  const [exercises, setExercises] = useState([]);
  const [addingExercise, setAddingExercise] = useState(false);

  function handleAddExercise(exercise) {
    setExercises([...exercises, exercise]);
    setAddingExercise(false);
  }
  
  
  function handleDeleteExercise(index) {
    const updated = exercises.filter((_, i) => i !== index);
    setExercises(updated);
  }
  
  

  return (
    <div style={{ border: '2px solid #444', padding: '20px', width: '350px' }}>
      <h2>Workout Form</h2>

      {addingExercise ? (
        <ExerciseForm
          onAddExercise={handleAddExercise}
          onCancel={() => setAddingExercise(false)}
        />
      ) : (
        <button onClick={() => setAddingExercise(true)}>Add Exercise</button>
      )}

      <div style={{ marginTop: '10px' }}>
      {exercises.map((ex, exIndex) => (
        <div key={exIndex} style={{ marginBottom: '10px' }}>
            <strong>{ex.name}</strong> – {ex.sets.length} set{ex.sets.length > 1 ? 's' : ''}
            <div style={{ paddingLeft: '10px' }}>
                {ex.sets.map((set, setIndex) => (
                    <div key={setIndex}>
                        Set {setIndex + 1}: {set.reps} reps @ {set.weight} lbs
                    </div>
                ))}
            </div>
            <button onClick={() => handleDeleteExercise(exIndex)} style={{ marginTop: '5px' }}>
                Delete Exercise
            </button>

        </div>
    ))}


      </div>

      {!addingExercise && (
        <button onClick={onClose} style={{ marginTop: '10px' }}>
          Save Workout
        </button>
      )}
    </div>
  );
}

export default WorkoutForm;
