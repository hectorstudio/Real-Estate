import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';

import * as serviceWorker from './serviceWorker';
import App from './components/App';
import store, { history } from './configureStore';
import { WINDOW_UPLOADS_KEY } from './constants';
import { initFirebase } from './actions/firebase';

import './styles/index.scss';
import theme from './styles/theme';

initFirebase();

window[WINDOW_UPLOADS_KEY] = {};

ReactDOM.render((
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <StylesProvider injectFirst>
          <App />
        </StylesProvider>
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
