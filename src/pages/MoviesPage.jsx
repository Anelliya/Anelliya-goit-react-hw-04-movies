import { NavLink } from "react-router-dom";
import { Component } from 'react';
import queryString from "query-string";

import fetchMovies from "../services/movieSearchApi";
import NotFound from "../components/NotFound";
import defaultImage from '../images/notFound.png'

class MoviesPage extends Component {
  state = {
    query: queryString.parse(this.props.location.state).query,
    movies: [],
    page: 1,
    error: false,
  }

  componentDidMount() {
    const { query, page, baseURL } = this.state;

    this.setState({ page: 1, error: false, });
    query?.length > 1 && fetchMovies(query, page, baseURL)
      .then(queryResult => queryResult.length > 1 ? this.setState({ movies: queryResult }) : this.setState({ error: true }))
      .catch(() => this.setState({ error: true }))
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      const { page, query, baseURL } = this.state;
      fetchMovies(query, page, baseURL).then(queryResult => this.setState({ movies: queryResult }))
    }

    if (prevState.query !== this.state.query) {
      this.setState({ error: false, });
    }

    if (prevState.movies !== this.state.movies) {
      this.state.movies.length > 1 && this.props.history.push({
        search: `query=${this.state.query}`
      })
    }
  }

  setQuery = (event) => {
    this.setState({ query: event.target.value });
  }

  getMovies = (event) => {
    const { query, page, baseURL } = this.state;
    event.preventDefault()

    fetchMovies(query, page, baseURL)
      .then(queryResult => queryResult.length > 1 ? this.setState({ movies: queryResult }) : this.setState({ error: true }))
      .catch((err) => { console.log('err', err) }).finally(this.setState({ movies: [] }))
  }

  handleRenderNextPage = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }))
  }

  handleRenderPrevPage = () => {
    this.state.page > 1 && this.setState((prevState) => ({ page: prevState.page - 1 }))
  }

  render() {
    const { movies, page, error, query } = this.state;
    // console.log('query', query)

    return (
      < >
        <form className="Searchbar">
          <input type='imput'
            onChange={this.setQuery}
            className="SearchForm-input"
            placeholder="Search..."
          />

          <button onClick={this.getMovies}
            className="SearchForm-button">Search</button>
        </form>

        {movies.length > 1 &&
          <ul className="ImageGallery">
            {movies.map(({ title, id, poster_path }) =>
              <li key={id}>
                <NavLink to={
                  {
                    pathname: `${this.props.match.url}/${id}`,
                    state: `query=${query}`,
                    from: `${this.props.location.pathname}`
                  }
                }>
                  <img src={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                      : defaultImage}
                    alt=""
                    className="ImageGalleryItem-image" />
                  <p>{title}</p>
                </NavLink>
              </li>)}
          </ul>
        }

        {error && <NotFound />}
        <div className="Navigation-button-wrapper">
          {movies.length > 1 && <button onClick={this.handleRenderNextPage} className="Navigation-button">Next page</button>}
          {page > 1 && <button onClick={this.handleRenderPrevPage} className="Navigation-button">Prev page</button>}
        </div>
      </>
    )
  }
}

export default MoviesPage;
