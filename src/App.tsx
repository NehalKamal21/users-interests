import { Spin } from "antd";
import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./index.scss";

const Users = lazy(() => import("./pages/users"));
const Interests = lazy(() => import("./pages/interests"));

const App = () => {
  return (
    <main className="container">
      <Router>
        <Suspense
          fallback={<Spin tip="Loading..." size="large" className="spinner" />}
        >
          <Switch>
            <Route exact path="/" render={() => <Users />} />
            <Route path="/:id/interests/" render={() => <Interests />} />

            <Route path="*" render={() => <Redirect to="/" />} />
          </Switch>
        </Suspense>
      </Router>
    </main>
  );
};

export default App;
