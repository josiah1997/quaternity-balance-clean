import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const categories = ['Fire', 'Earth', 'Air', 'Water'];

function App() {
  const [ratings, setRatings] = useState({ Fire: 3, Earth: 3, Air: 3, Water: 3 });
  const [notes, setNotes] = useState({ Fire: '', Earth: '', Air: '', Water: '' });

  const handleRatingChange = (type, value) => {
    setRatings({ ...ratings, [type]: parseInt(value) });
  };

  const handleNoteChange = (type, value) => {
    setNotes({ ...notes, [type]: value });
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify({ ratings, notes, date: new Date().toISOString() }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quaternity-log.json";
    a.click();
  };

  const chartData = {
    labels: categories,
    datasets: [{
      label: "Quaternity Ratings",
      data: categories.map(cat => ratings[cat]),
      borderColor: "rgba(75,192,192,1)",
      fill: false
    }]
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Quaternity Balance Tracker</h1>
      {categories.map(cat => (
        <div key={cat} style={{ marginBottom: "1.5rem" }}>
          <label>
            {cat} (1–5):&nbsp;
            <input
              type="number"
              min="1"
              max="5"
              value={ratings[cat]}
              onChange={e => handleRatingChange(cat, e.target.value)}
            />
          </label>
          <br />
          <textarea
            rows="2"
            cols="50"
            placeholder={`Notes for ${cat}`}
            value={notes[cat]}
            onChange={e => handleNoteChange(cat, e.target.value)}
          />
        </div>
      ))}
      <Line data={chartData} />
      <br />
      <button onClick={downloadJSON}>Download Daily Log</button>
    </div>
  );
}

export default App;