import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import "./App.css";

//Main Component

function App() {
  var routes = (
    <Router>
      <Switch>
        <Route path="/" component={Dashboard} />
      </Switch>
    </Router>
  );
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to JIRA Dashboard</h1>
        {routes}
      </header>
    </div>
  );
}

export default App;
