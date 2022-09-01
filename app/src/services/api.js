import axios from 'axios';

export default axios.create({
    baseURL: process.env.REACT_PORT,
    timeout: 10000,
    headers: {
        'Content-type': 'application/json'
    }
})