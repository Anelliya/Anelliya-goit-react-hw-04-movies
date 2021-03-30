import { Component } from 'react';
import { Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import fetchMovieById from "../services/movieDitailsApi";
import NotFound from "../components/NotFound";
import Button from "../components/Button";
import Cast from "../components/Cast";
import Reviews from "../components/Reviews";


class movieDitails extends Component {

    state = {
        movieDitails: null,
        genres: '',
        release: '',
    }

    componentDidMount() {
        !this.state.movieditail && this.getMovieDitail();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.movieDitails !== this.state.movieDitails) {
            const getGenres = () => this.state.movieDitails.genres.map(genre => genre.name).join(" ");
            const date = () => this.state.movieDitails.release_date.split('-')[0];
            this.setState({ genres: getGenres(), release: date(), cast: this.state.movieDitails.cast })
        }
    }

    getMovieDitail = () => {
        const movieId = this.props.match.params.movieId;

        fetchMovieById(movieId)
            .then(movieDitails => this.setState({ movieDitails: { ...movieDitails } }))
            .catch(err => console.log('err:', err))
    }

    goBackBtnClick = () => {
        this.props.history.push({
            pathname: `${this.props.location.from}` || '/',
            state: `${this.props.location.state}`
        })
    }

    render() {
        const { movieDitails, genres, release } = this.state;
        const movieId = this.props.match.params.movieId;

        return (

            (movieDitails ?
                (
                    <div className="Movie-Ditails-Wrapper">
                        <Button
                            onClick={this.goBackBtnClick} title={'Go back'} className="Navigation-button" />
                        <div className="Movie-ditails">
                            <img src={`https://image.tmdb.org/t/p/w500/${movieDitails.backdrop_path}`} alt=""
                                className="Movie-ditails-img" />
                            <div>
                                <h1>{(movieDitails.title) ? `${movieDitails.title}` : `${movieDitails.name}`} {release}</h1>
                                <p>{`User Score: ${movieDitails.vote_average * 10}%`}</p>
                                <h2>Genres</h2>
                                <p>{`${genres}`}</p>
                                <h2>Overview</h2>
                                <p>{`${movieDitails.overview}`}</p>
                            </div>
                        </div>
                        <div className="Aditional-information-wrapper">
                            <h2>Aditional information</h2>
                            <p><NavLink
                                to={{
                                    pathname: `${this.props.match.url}/cast`,
                                    from: `${this.props.location.from}`
                                }}>Cast</NavLink></p>
                            <p><NavLink
                                to={{
                                    pathname: `${this.props.match.url}/reviews`,
                                    from: `${this.props.location.from}`
                                }}>Reviews</NavLink></p>
                        </div>
                        <Route path={`${this.props.match.url}/cast`} render={props => <Cast movieId={movieId} />} />
                        <Route path={`${this.props.match.url}/reviews`} render={props => <Reviews movieId={movieId} />} />
                    </div >
                )
                : <NotFound />
            ));
    }
}

export default movieDitails;