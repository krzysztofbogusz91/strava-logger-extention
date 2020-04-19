import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import LogInPage from './components/LogInPage';
import Dashboard from './components/Dashboard/Dashboard';
import ExchangePage from './components/ExchangePage';


function App() {

  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={LogInPage} exact />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/exchange_token" component={ExchangePage} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
