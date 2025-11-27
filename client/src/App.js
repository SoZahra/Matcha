import React, { useEffect, useState } from 'react';


function App() {
  const [apiStatus, setApiStatus] = useState('Checking...');

  useEffect(() => {
    fetch('http://localhost:3001/api/health')
      .then(res => res.json())
      .then(data => setApiStatus(data.message))
      .catch(() => setApiStatus('API not reachable ❌'));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🍵 Matcha</h1>
        <p>Dating App Project</p>
        <p>API Status: {apiStatus}</p>
      </header>
    </div>
  );
}

export default App;
