import axios from 'axios';

const fetchMovies = (query, page) => {
    const BASE_URL = "https://api.themoviedb.org/3/search/movie?";

    const API_KEY = '50b81e1c6c3b9e5f74d2015b742ff0b0';

    axios.defaults.baseURL = BASE_URL;
    axios.defaults.params = {
    api_key: API_KEY
    }

    return axios
        .get(``, { params: { query , page }})
        .then(res => res.data.results)  
}

export default fetchMovies;