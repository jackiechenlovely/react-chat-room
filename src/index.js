import React from 'react';
import ReactDOM from 'react-dom';

import {createStore,applyMiddleware,compose} from "redux"

import "./config"

import thunk from "redux-thunk"   //异步dispatch

import reducer from "./reducer.js"   //结合各个reducer

import { Provider } from "react-redux"  //广播store属性

import {BrowserRouter,Route,Switch} from "react-router-dom"

import Login from "./container/login/login.js"

import Register from "./container/register/register.js"

import AuthRoute from "./component/authroute/authroute"

import BossInfo from "./container/bossinfo/bossinfo"

import GeniusInfo from "./container/geniusinfo/geniusinfo"
import Dashboard from "./component/dashboard/dashboard"
import Chartroom from "./container/chartroom/chartroom"
import "./index.css"
const store = createStore(
    reducer,
    compose(applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path={"/geniusinfo"} component={GeniusInfo}></Route>
                    <Route path={"/bossinfo"} component={BossInfo}></Route>
                    <Route path={"/login"} component={Login}></Route>
                    <Route path={"/register"} component={Register}></Route>
                    <Route path={"/chartroom/:id"} component={Chartroom}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    ,document.getElementById('root'));

