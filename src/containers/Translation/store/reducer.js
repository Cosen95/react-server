import { TRANS_LIST } from './constants';

const defaultState = {
    transList: []
}

export default (state = defaultState, action) => {
    switch(action.type) {
        case TRANS_LIST:
            return {
                ...state,
                transList: action.list
            }
        default:
            return state;
    }
}