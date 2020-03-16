import React from 'react';

function LogInPage() {

  const logInToStrava = function() {
    window.location.href = "http://www.strava.com/oauth/authorize?client_id=43111&response_type=code&redirect_uri=http://localhost:3000/exchange_token&approval_prompt=force&scope=read,activity:read,activity:write"
  }

  return (
    <div className="LogInPage">
      <header>
          Strava Logger App
      </header>
      <div className="button-container">
        <button onClick={logInToStrava}>Login with Strava</button>
      </div>
    </div>
  );
}

export default LogInPage;
