import React from 'react';
import { Route, BrowserRouter as Router, Switch, NavLink } from 'react-router-dom';
import './App.scss';
import Market from './views/Market';
import PianoView from './views/PianoView';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <NavLink to="/" >Piano</NavLink>
          <NavLink to="/market" >Market</NavLink>
        </header>
        <Switch>
          <Route exact path="/">
            <PianoView></PianoView>
          </Route>
          <Route path="/market">
            <Market />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
