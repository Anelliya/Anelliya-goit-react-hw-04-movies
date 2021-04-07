import axios from 'axios';
import * as initialApi from '../index'

axios.defaults.baseURL = initialApi.base_url;
axios.defaults.params = {
    api_key: initialApi.api_key,
}

const fetchTrendsMovies = (page) => {
    return axios
        .get(`trending/all/day?page=${page}`)
        .then(res => res.data.results)
}

const fetchMovieById = (id) => {
    return axios
        .get(`movie/${id}?`)
        .then(res => res.data)
}

const fetchCast = (movieId) =>
    axios.get(`movie/${movieId}/credits`)

const fetchReviews = (movieId) =>
    axios.get(`movie/${movieId}/reviews`)
        .then(res => res.data.results)
 
const fetchMovies = (query, page) => {
      return axios
        .get(`search/movie?`, { params: { query , page }})
        .then(res => res.data.results)  
}

const services = {
    fetchMovieById,
    fetchCast,
    fetchReviews,
    fetchTrendsMovies,
    fetchMovies
}

export default services;