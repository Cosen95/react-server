import axios from 'axios';
import { CHANGE_LIST } from './constants';
import clientAxios from '../../../client/request';
import serverAxios from '../../../server/request';


const changeList = (list) => ({
    type: CHANGE_LIST,
    list
})

export const getHomeList = (server) => {
    // https://www.easy-mock.com/mock/5c7103f8dcf13129127978cc/react_ssr/getHomeList
    // 浏览器运行
    // /react_ssr/getHomeList = http://localhost:3000/react_ssr/getHomeList
    // 服务器运行
    // /react_ssr/getHomeList = 服务器根目录下/react_ssr/getHomeList（找不到对应目录，会报错）
    // if(server) {
    //     url = 'https://www.easy-mock.com/mock/5c7103f8dcf13129127978cc/react_ssr/getHomeList'
    // } else {
    //     url = '/react_ssr/getHomeList'
    // }
    const request = server ? serverAxios : clientAxios;
    return (dispatch) => {
        return request.get('/react_ssr/getHomeList')
            .then((res) => {
                const list = res.data.data;
                dispatch(changeList(list));
            })
    }
}