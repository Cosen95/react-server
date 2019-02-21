import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import homeReducer from '../containers/Home/store/reducer';

const reducer = combineReducers({
    home: homeReducer
})
const getStore = () => {
    return createStore(reducer, applyMiddleware(thunk));
}

export default getStore;