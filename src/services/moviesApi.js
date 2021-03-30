import axios from 'axios';

const API_KEY = '50b81e1c6c3b9e5f74d2015b742ff0b0';

axios.defaults.params = {
    api_key: API_KEY
}

const fetchTrendsMovies = (page) => {
    return axios
        .get(`https://api.themoviedb.org/3/trending/all/day?page=${page}`)
        .then(res => res.data.results)
}

export default fetchTrendsMovies;