import axios from 'axios';
import { CHANGE_LIST } from './constants';


const changeList = (list) => ({
    type: CHANGE_LIST,
    list
})

export const getHomeList = () => {
    // https://www.easy-mock.com/mock/5c7103f8dcf13129127978cc/react_ssr/getHomeList
    return (dispatch) => {
        return axios.get('/react_ssr/getHomeList')
            .then((res) => {
                const list = res.data.data;
                dispatch(changeList(list));
            })
    }
}