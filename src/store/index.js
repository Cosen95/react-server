import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reducer as homeReducer } from '../containers/Home/store';
import clientAxios from '../client/request'
import serverAxios from '../server/request';

const reducer = combineReducers({
    home: homeReducer
})

export const getStore = () => {
    return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)));
}

export const getClientStore = () => {
    const defaultState = window.context.state;  // 服务端渲染后store数据
    return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)));
}
