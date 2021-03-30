import { Component } from 'react';
import { NavLink } from "react-router-dom";

import fetchTrendsMovies from "../services/moviesApi";
import Button from "../components/Button";
import Loading from "../components/Loading";
import defaultImage from '../images/notFound.png'


class HomePage extends Component {

    state = {
        path: '/',
        trendsMovies: null,
        page: 1,
    }

    componentDidMount() {
        this.getTrendsMovies();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            this.getTrendsMovies()
        }
    }

    getTrendsMovies = () => {
        const { page } = this.state;
        fetchTrendsMovies(page)
            .then(movies => this.setState({ trendsMovies: movies }))
    }

    handleNextPage = () => {
        this.setState((prevState) => ({ page: prevState.page + 1 }))
    }

    handlePrevPage = () => {
        this.state.page > 1 && this.setState((prevState) => ({ page: prevState.page - 1 }))
    }

    render() {
        const { trendsMovies, page } = this.state;

        return (
            trendsMovies ?
                <>
                    <h1 className="Trends-film-title"> Trends Movies</h1>
                    <ul className="ImageGallery">
                        {trendsMovies.map(({ id, title, name, backdrop_path }) =>
                            <li key={id}>
                                <NavLink to={{
                                    pathname: `movies/${id}`,
                                    from: `${this.props.location.pathname}`
                                }}>
                                    <img src={
                                        (backdrop_path)
                                            ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
                                            : defaultImage}
                                        alt="movie's pic"
                                        className="ImageGalleryItem-image" />
                                    <p >{title}{name} </p>
                                </NavLink>
                            </li>
                        )}
                    </ul>

                    <div className="Navigation-button-wrapper">
                        <Button onClick={this.handleNextPage} title={"Next page"} className="Navigation-button" />
                        {page > 1 && <Button onClick={this.handlePrevPage} title={"Prev page"} className="Navigation-button" />}
                    </div>
                </>
                : <Loading />
        )
    }



}


export default HomePage;