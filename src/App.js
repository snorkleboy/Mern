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

import Stock from './components/setPages/stockPageContainer';
import Signup from './components/setPages/user/signupContainer';
import Sidebar from './components/setPages/UI/sidebarContainer';
import MainPage from './components/setPages/entryPageContainer';
import List from './components/stocks/list';

const SignedInApp = ()=>(
  <div className='spliter'>
    <Switch>
      <Route exact path='/stocks' component={MainPage} />
      <Route exact path='/stocks/:ticker' component={Stock} />
    </Switch>
    <Sidebar/>
  </div>
)
class App extends Component {
  render() {
    return (
      <div className="Router-level-div">
        <Switch>
          <Route exact path='/' component={Signup} />
          <Route path='/stocks' component={SignedInApp} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect()(App));
