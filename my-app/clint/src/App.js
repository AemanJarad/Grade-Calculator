import React, { useState } from 'react'
import './App.css';
import axios from 'axios'


function App() {
  const [name, setName] = useState('');
  const [lab, setLab] = useState('');
  const [midterm, setMidterm] = useState('');
  const [message, setMessage] = useState('');
  const [final, setFinal] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const total = (lab * 0.1) + (midterm * 0.4) + (final * 0.5);
    try {
      const response = await axios.post('http://localhost:5000/grades', { name, lab, midterm, final, total });
      setMessage(`Grade saved! Total : ${response.data.total}`);
    } catch (error) {
      setMessage(`Failed to save grade: ${error.message}`);
    }

  };

  return (
    <div className="App">
      <header className='App-header'>
        <h1>Grade Calculator</h1>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Student Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='number'
            placeholder='Lab Score'
            value={lab}
            onChange={(e) => setLab(e.target.value)}
          />
          <input
            type='number'
            placeholder='Midterm Score'
            value={midterm}
            onChange={(e) => setMidterm(e.target.value)}
          />
          <input
            type='number'
            placeholder='Final Score'
            value={final}
            onChange={(e) => setFinal(e.target.value)}
          />
          <button type='submit'>Calculate and save</button>
        </form>
        {message && <p>{message}</p>}
      </header>
    </div>
  );
}

export default App;
