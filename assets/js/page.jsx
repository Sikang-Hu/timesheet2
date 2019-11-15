import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, Col } from 'react-bootstrap';
import { Provider, connect } from 'react-redux';

import SheetsNew from './sheets/new';
import SheetsShow from './sheets/show';
import SheetsList from './sheets/index';
import Login from './login';
import Session from './session';

import store from './store';


export default function init_page(root) {
  let tree = (
    <Provider store={store}>
      <Page />
    </Provider>
    );
  ReactDOM.render(tree, root);
}

function Page(props) {
  let session = store.getState().session;

  let ind = session == null ? (<div/>) : (
      <Nav.Item>
        <NavLink to="/sheets" exact activeClassName="active" className="nav-link">
          All Timesheets
        </NavLink>
      </Nav.Item>
  );

  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Col md="8">
          <Nav>
            <Nav.Item>
              <NavLink to="/" exact activeClassName="active" className="nav-link">
                Timesheet
              </NavLink>
            </Nav.Item>
            {ind}
            <NewSheet />
          </Nav>
        </Col>
        <Col md="4">
          <Session />
        </Col>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <h1>Welcome to Timesheet</h1>
        </Route>


        <Route exact path="/sheets/new">
          <SheetsNew />
        </Route>

        <Route exact path="/sheets">
          <SheetsList />
        </Route>

        <Route exact path="/sheets/:id" render={
          (props) =>
            <SheetsShow id={props.match.params.id} />
        } />

        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

let NewSheet = connect(({session}) => ({session}))(({session}) => {
  if (session == null || session.is_manager) {
    return (<div/>);
  } else {
    return (
        <Nav.Item>
          <NavLink to="/sheets/new" exact activeClassName="active" className="nav-link">
            New Timesheet
          </NavLink>
        </Nav.Item>);
  }
});


