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

import Stocks from './components/stocks/stocksContainer';
import Signup from './components/user/signupContainer';

class App extends Component {
  render() {
    return (
      <div className="Router-level-div">
        <Switch>
          <Route path='/stock' component={Stocks} />
          <Route path='/' component={Signup} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect()(App));
