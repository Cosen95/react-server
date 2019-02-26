import axios from 'axios';

const instance =  (req) => axios.create({
    baseURL: 'https://www.easy-mock.com/mock/5c7103f8dcf13129127978cc',
    headers: {
        cookie: req.get('cookie') || ''
    }
});

export default instance;