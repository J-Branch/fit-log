import { useState } from 'react';
import SetForm from './SetForm';

function ExerciseForm({ onAddExercise, onCancel }) {
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState([]);
  const [addingSets, setAddingSets] = useState(false);

  function handleAddSet(set, editIndex = null) {
    if (editIndex !== null) {
      const updated = [...sets];
      updated[editIndex] = set;
      setSets(updated);
    } else {
      setSets(prev => [...prev, set]);
    }
  }

  function handleFinishSets(finalSets) {
    setSets(finalSets);
    setAddingSets(false);
  }

  function handleSaveExercise() {
    if (exerciseName && sets.length > 0) {
      onAddExercise({ name: exerciseName, sets });
      setExerciseName('');
      setSets([]);
    }
  }

  return (
    <div style={{ border: '1px solid #888', padding: '15px', marginTop: '10px' }}>
      <h3>Add Exercise</h3>

      <label>Exercise Name: </label>
      <input
        type="text"
        value={exerciseName}
        onChange={(e) => setExerciseName(e.target.value)}
      />

      {!addingSets && (
        <button onClick={() => setAddingSets(true)} style={{ marginLeft: '10px' }}>
          Add Sets
        </button>
      )}

      {addingSets && (
        <SetForm onAddSet={handleAddSet} onFinish={handleFinishSets} />
      )}

      {!addingSets && (
        <>
          <div style={{ marginTop: '10px' }}>
            {sets.length > 0 && (
              <p>
                {exerciseName} – {sets.length} set{sets.length > 1 ? 's' : ''}
              </p>
            )}
          </div>

          <button onClick={handleSaveExercise}>Save Exercise</button>
          <button onClick={onCancel} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        </>
      )}
    </div>
  );
}

export default ExerciseForm;
