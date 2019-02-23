import axios from 'axios';

export const getHomeList = () => {
    return () => {
        axios.get('https://www.easy-mock.com/mock/5c7103f8dcf13129127978cc/react_ssr/getHomeList')
            .then((res) => {
                console.log(res);
            })
    }
}