import React, {useState} from "react";
import HomeFind from "./views/HomeFind";
import HomeCate from "./views/HomeCate";
import HomeMe from "./views/HomeMe";
import "./App.css";

import {NavLink, Route, Switch, useHistory} from "react-router-dom";
import "antd-mobile/dist/antd-mobile.css";
import classNames from "classnames";
import {NavBar, Icon} from "antd-mobile";

import {Tabs} from "antd-mobile";

const tabs = [
    {title: "发现", url: "find"},
    {title: "频道", url: "cate"},
    {title: "我的", url: "me"},
];

function App() {
    const [currentTap, setCurrentTap] = useState(0);
    let history = useHistory();

    return (
        <div className={classNames("App", {bar: true})}>
            <NavBar

                mode="light"
                icon={<img style={{width: '30px'}} src={require("./assets/images/day_cover_open_icon.png")} alt=""/>}
                rightContent={<Icon onClick={() => {
                    history.push(`/search/4`);
                }
                } style={{color: '#fff'}} key="0" type="search"/>}
            > <span className='date'>{new Date().getDate()}</span>

                <Tabs
                    tabs={tabs}
                    page={currentTap}
                    renderTab={(tab) => (
                        <NavLink to={"/" + tab.url}>
                            <span>{tab.title}</span>
                        </NavLink>
                    )}
                />
            </NavBar>
            <section className="content">
                <Switch>
                    <Route path="/cate">
                        <HomeCate setCurrentTap={setCurrentTap}/>
                    </Route>
                    <Route path="/me">
                        <HomeMe setCurrentTap={setCurrentTap}/>
                    </Route>
                    <Route path="/">
                        <HomeFind setCurrentTap={setCurrentTap}/>
                    </Route>
                </Switch>
            </section>
        </div>
    );
}

export default App;
