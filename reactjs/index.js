import React from "react";
import {render} from "react-dom";
// REDUX Store imports
import {Provider} from "react-redux";
import APP from "./containers/App";
import store from "./store";


render(
    <Provider store={store}>
        <APP />
    </Provider>,
    document.getElementById('App1'))