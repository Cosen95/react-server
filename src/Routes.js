import React from 'react';
import { Route } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import Translation from './containers/Translation';
import NotFound from './containers/NotFound';

import App from './App';

export default [{
        path: '/',
        component: App,
        loadData: App.loadData,
        routes: [
            {
                path: '/',
                component: Home,
                exact: true,
                loadData: Home.loadData,
                key: 'home'
            }, {
                path: '/login',
                component: Login,
                exact: true,
                key: 'login'
            }, {
                path: '/translation',
                component: Translation,
                exact: true,
                loadData: Translation.loadData,
                key: 'translation'
            }, {
                component: NotFound
            }
        ]
    }];