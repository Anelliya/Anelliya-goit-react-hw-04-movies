import axios from 'axios';

const API_KEY = '50b81e1c6c3b9e5f74d2015b742ff0b0';
axios.defaults.params = {
    api_key: API_KEY
}

const fetchCast = (movieId) =>
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`)

export default fetchCast;