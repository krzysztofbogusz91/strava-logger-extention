import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Training from './components/Training/Training';
import ExchangePage from './components/ExchangePage';
import Settings from './components/Settings/Settings';
import About from './components/About/About';
import LogInPage from './components/Login/LogInPage';


function App() {

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={LogInPage} exact />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/settings" component={Settings} />
        <Route path="/about" component={About} />
        <Route path="/train" component={Training} />
        <Route path="/exchange_token" component={ExchangePage} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
