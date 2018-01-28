import React, { Component } from 'react';
import './css/App.css';
import { connect } from 'react-redux';
import {
  withRouter,
  Route,
  Redirect,
  Switch,
  Link,
} from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div className="Router-level-div">
        <Switch>
          <Route path='/yo' component={function () { return (`<div class='what'>yo</div>`);}} />
          <Route path='/' component={function(){return(`<div class='that'>hi</div>`);}} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect()(App));
