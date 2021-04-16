import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import SubscriptionProvider from "./components/SubscriptionProvider";
import Market from "./views/Market";
import Owned from "./views/Owned";
import PianoView from "./views/PianoView";

function App() {
  return (
    <SubscriptionProvider>
      <Router>
        <div className="App">
          <header className="header">
            <Header />
          </header>
          <section className="mainView">
            <Switch>
              <Route exact path="/">
                <PianoView></PianoView>
              </Route>
              <Route path="/market">
                <Market />
              </Route>
              <Route path="/owned">
                <Owned />
              </Route>
            </Switch>
          </section>
        </div>
      </Router>
    </SubscriptionProvider>
  );
}

export default App;
