import axios from 'axios';
import { TRANS_LIST } from './constants';


const transList = (list) => ({
    type: TRANS_LIST,
    list
})

export const getTranslationList = (server) => {
    return (dispatch, getState, axiosInstance) => {
        return axiosInstance.get('/react_ssr/translation')
            .then((res) => {
                const list = res.data.data;
                dispatch(transList(list));
            })
    }
}