import React from 'react';
import Button from '@material-ui/core/Button/Button';
import TextField from '@material-ui/core/TextField/TextField';
import './LogInPage.scss';


function LogInPage( props: any) {

  const logInToStrava = () => {
    window.location.href = "http://www.strava.com/oauth/authorize?client_id=43111&response_type=code&redirect_uri=http://localhost:3000/exchange_token&approval_prompt=force&scope=read,activity:read,activity:write"
  }
  const logIn = () => {
    props.history.push('/training')
  }

  return (
    <div className="LogInPage">
      <div className="button-container">
        <div className="button-container-element">
          <Button size='large' fullWidth onClick={logInToStrava} variant="outlined">
            Login with Strava
          </Button>
        </div>
        <div className="button-container-element">
          <form noValidate autoComplete="off" className="login-form">
            <TextField 
              fullWidth
              id="name-input"
              label="Name" 
              margin="normal"
              variant="outlined" 
              />
            <TextField
              fullWidth
              label="Password" 
              margin="normal"
              variant="outlined"
              id="password-input"
              type="password"
            />
          </form>
        </div>
        <div className="button-container-element">
          <Button size='large' fullWidth onClick={logIn} variant="outlined">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LogInPage;
