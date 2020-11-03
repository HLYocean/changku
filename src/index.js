import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import {routes, RouteWithSubRoutes} from "routers/index";

import * as serviceWorker from "./serviceWorker";

import {HashRouter as Router, Switch} from "react-router-dom";

// const [showLoading, setShowLoading] = useState(false)

ReactDOM.render(
    // <React.StrictMode>
    <Router>


        <Switch>
            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
        </Switch>
    </Router>
    // </React.StrictMode>
    ,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
