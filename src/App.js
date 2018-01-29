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

import Stock from './components/stocks/stocksContainer';
import Signup from './components/user/signupContainer';
import Sidebar from './components/UI/sidebarContainer';
import List from './components/stocks/listContainer';

const SignedInApp = ()=>(
  <div className='spliter'>
    <Switch>
      <Route exact path='/stocks' component={List} />
      <Route exact path='/stocks/:id' component={Stock} />
      
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
