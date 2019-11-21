// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import createRootReducer from './reducers';
import initialState from './initialState';

export const history = createBrowserHistory();

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  createRootReducer(history),
  initialState,
  composeEnhancers(
    applyMiddleware(
      thunk,
      routerMiddleware(history),
    ),
  ),
);

export default store;
