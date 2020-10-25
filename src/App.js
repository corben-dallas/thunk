import React, { Fragment } from 'react';
import { Redirect, Route, Switch, NavLink, BrowserRouter as Router } from 'react-router-dom';
import FormEdit from './compnents/FormEdit';

import FirstPage from './compnents/Pages/FirstPage';
import SecondPage from './compnents/Pages/SecondPage';

function App() {
  return (
    <Fragment>
      <Router>
        <nav className="nav">
          <NavLink to="/thunk/first" className="nav-link" activeClassName="nav-link--selected">Task 1</NavLink>
          <NavLink to="/thunk/second" className="nav-link" activeClassName="nav-link--selected">Task 2</NavLink>
        </nav>
        <Switch>
          <Redirect exact from="/thunk" to="/thunk/first" />
          <Redirect exact from="/redux" to="/thunk/first" />
          <Route path='/thunk/first' component={FirstPage} />
          <Route exact path="/thunk/second" component={SecondPage} />
          <Route path="/thunk/second/:id" component={FormEdit} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
