import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import { store,persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';
import Routes from './routes'


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

