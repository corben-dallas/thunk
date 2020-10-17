import React, { Fragment } from 'react';
import { Redirect, Route, Switch, NavLink, BrowserRouter as Router } from 'react-router-dom';

import FirstPage from './compnents/Pages/FirstPage';
import SecondPage from './compnents/Pages/SecondPage';

function App() {
  return (
    <Fragment>
      <Router>
        <nav className="nav">
          <NavLink to="/first" className="nav-link" activeClassName="nav-link--selected">Task 1</NavLink>
          <NavLink to="/second" className="nav-link" activeClassName="nav-link--selected">Other page</NavLink>
        </nav>
        <Switch>
          <Redirect exact from="/redux" to="/redux/first" />
          <Route path='/redux/first' component={FirstPage} />
          <Route path="/redux/second" component={SecondPage} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
