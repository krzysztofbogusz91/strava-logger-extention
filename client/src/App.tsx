import React from 'react';
import './App.css';

function App() {
  const logToStrava = function() {
    console.log('log to strava');

  }
  return (
    <div className="App">
      <header>
          Strava Logger App
      </header>
      <div className="button-container">
        <button onClick={logToStrava}>Log with Strava</button>
        <a href="http://www.strava.com/oauth/authorize?client_id=43111&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=read">click</a>
      </div>
    </div>
  );
}

export default App;
