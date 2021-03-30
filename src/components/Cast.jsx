import { Component } from 'react';

import defaultImg from "../images/notFound.png";
import fetchCast from "../services/movieCastApi";


class Cast extends Component {
    state = {
        cast: [],
    }

    componentDidMount() {
        const movieId = this.props.movieId;
        fetchCast(movieId)
            .then(res => this.setState({ cast: res.data.cast }))
            .catch(err => console.log("err from cast:", err))
    }

    render() {
        const { cast } = this.state;

        return (
            cast ?
                <ul>
                    {cast.map(({ name, profile_path, character, job, credit_id }) =>
                        <li key={credit_id}>
                            <img src={profile_path
                                ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                                : defaultImg}
                                alt={job} width="100px" />
                            <h2>{name}</h2>
                            <p>Character: {character ? `${character}` : 'unknown'}</p>
                        </li>
                    )}
                </ul>
                : null

        );
    }
}

export default Cast;