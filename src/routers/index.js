import React from "react";
import App from "App";
import Play from "views/Play";
import CateList from "views/CateList";
import Series from "views/Series";
import Album from "views/Album";
import SeriesDetail from "../views/SeriesDetail"
import Backstage from '../views/Backstage'
import BackStageList from '../components/BackStageList'
import Search from '../views/Search'

import {Route} from "react-router-dom";

export const routes = [
    {
        path: "/play/:id",
        component: Play,
    },
    {
        path: "/catelist",
        component: CateList,
    },
    {
        path: "/series",
        component: Series,
    },
    {
        path: "/seriesdetail/:id",
        component: SeriesDetail,
    },
    {
        path: "/album/:id",
        component: Album,
    },
    {
        path: "/backstage/:id",
        component: Backstage,
    },
    {
        path: "/backstagelist/:id",
        component: BackStageList,
    },
    {
        path: "/search/4",
        component: Search,
    },
    {
        path: "/",
        component: App,
    },
];


export function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            render={(props) => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes}/>
            )}
        />
    );
}
