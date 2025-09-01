// src/pages/workout/SetForm.js
import { useState } from 'react';

function SetForm({ onAddSet, onFinish }) {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [savedSets, setSavedSets] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  function handleSaveSet() {
    if (reps && weight) {
      const newSet = { reps, weight };

      if (editIndex !== null) {
        // We're editing an existing set
        const updatedSets = [...savedSets];
        updatedSets[editIndex] = newSet;
        setSavedSets(updatedSets);
        onAddSet(newSet, editIndex); // optional: update parent
        setEditIndex(null);
      } else {
        // Adding a new set
        const updatedSets = [...savedSets, newSet];
        setSavedSets(updatedSets);
        onAddSet(newSet);
      }
    }
  }

  function handleEdit(index) {
    setEditIndex(index);

    // Clear inputs so user can re-enter values
    setReps('');
    setWeight('');
  }

  function handleDelete(index) {
    const updated = savedSets.filter((_, i) => i !== index);
    setSavedSets(updated);

    // If we were editing this set, cancel edit mode
    if (editIndex === index) {
      setEditIndex(null);
      setReps('');
      setWeight('');
    }
  }

  return (
    <div style={{ border: '1px solid #aaa', padding: '10px', marginTop: '10px' }}>
      <h4>Add Set</h4>

      {editIndex !== null && (
        <div style={{ color: 'blue', marginBottom: '8px' }}>
          Editing Set {editIndex + 1}
        </div>
      )}

      <div>
        <label>Reps: </label>
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
      </div>
      <div>
        <label>Weight: </label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>

      <button onClick={handleSaveSet} style={{ marginTop: '10px' }}>
        {editIndex !== null ? 'Update Set' : 'Save Set'}
      </button>

      <button onClick={() => onFinish(savedSets)}>Done with Sets</button>


      <div style={{ marginTop: '10px' }}>
        {savedSets.map((set, index) => (
          <div
            key={index}
            style={{
              backgroundColor: editIndex === index ? '#e0f7ff' : 'transparent',
              padding: '5px',
              marginBottom: '4px',
            }}
          >
            Set {index + 1}: {set.reps} reps @ {set.weight} lbs
            <button onClick={() => handleEdit(index)} style={{ marginLeft: '10px' }}>
              Edit
            </button>
            <button onClick={() => handleDelete(index)} style={{ marginLeft: '5px' }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SetForm;
