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

import Stock from './components/composed/stockPageContainer';
import Signup from './components/composed/user/signupContainer';
import Sidebar from './components/composed/UI/sidebarContainer';
import MainPage from './components/composed/entryPageContainer';
import List from './components/stocks/list';

const SignedInApp = ()=>(
  <div>
    <Sidebar />

    <Switch>
      <main className="not-sidebar">
        <Route exact path='/' component={MainPage} />
        <Route exact path='/stocks/:ticker' component={Stock} />
      </main>
    </Switch>
  </div>
)
class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/' component={SignedInApp} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect()(App));
