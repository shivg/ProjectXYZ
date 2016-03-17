import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import Search from './Search';
import KanbanBoardContainer from '../containers/KanbanBoardContainer';
import DataVis from './DataVis';
import promise from 'redux-promise';
import reducers from '../reducers';
import Auth from '../utils/Auth';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

let store = createStore(reducers, applyMiddleware(promise));

const requireAuth = (nextState, replace) => {
  console.log('In requireAuth')
      if (!Auth.isLoggedIn()) {
        window.location.assign('/auth/github');
      }
    }

const logOut = () => {
  Auth.logOut();
  window.location.assign('/logout');
}

export default () =>
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Search}/>
        <Route path="/kanban" onEnter={requireAuth} component={KanbanBoardContainer}/>
        <Route path="/data-vis" onEnter={requireAuth} component={DataVis}/>
        <Route path="/logout" onEnter={logOut} />
        <Route path="/auth/github" onEnter={requireAuth} />
      </Route>
    </Router>
  </Provider>
