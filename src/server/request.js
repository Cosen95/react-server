import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://www.easy-mock.com/mock/5c7103f8dcf13129127978cc'
});

export default instance;