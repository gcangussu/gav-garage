// @flow
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import reducer from './reducer';
import { Login, Dashboard, PrivateRoute } from './components';

const store = createStore(reducer);

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="sans-serif">
          <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute path="/" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}
