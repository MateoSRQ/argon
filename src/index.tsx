import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/app';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";

import store from './redux';

store.subscribe(() => console.log('STORE'));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();
