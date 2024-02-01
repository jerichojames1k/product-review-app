import axios from 'axios';
 const BASE_URL = 'https://5ffbed0e63ea2f0017bdb67d.mockapi.io/';

export default axios.create({
    baseURL: BASE_URL
});


