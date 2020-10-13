import './scss/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/App';
import {createStore} from "redux";
import {rootReducer} from "./js/redux/reducers";
import {Provider} from "react-redux";

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);