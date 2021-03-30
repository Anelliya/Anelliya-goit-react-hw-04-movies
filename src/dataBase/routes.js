import { lazy } from 'react';

const HomePage = lazy(() => {
    return import('../pages/HomePage' /* webpackChunkName: "home-page" */);
})

const MoviesPage = lazy(() => {
    return import('../pages/MoviesPage' /* webpackChunkName: "movie-page" */);
})

const MovieDitails = lazy(() => {
    return import('../pages/MovieDitails' /* webpackChunkName: "movie-ditails" */);
})

const NotFound = lazy(() => {
    return import('../components/NotFound')
})


const routes = [
    {
        key: 1,
        path: '/',
        component: HomePage,
        exact: true
    },
    {
        key: 2,
        path: '/movies',
        component: MoviesPage,
        exact: true
    },
    {
        key: 3,
        path: '/movies/:movieId',
        component: MovieDitails,

    },

]

export default routes;