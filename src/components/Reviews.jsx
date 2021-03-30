import { Component } from 'react';


import fetchReviews from '../services/movieReviesApi'

class Reviews extends Component {
    state = {
        reviews: [],
    }

    componentDidMount() {
        const movieId = this.props.movieId;

        fetchReviews(movieId)
            .then(reviews => this.setState({ reviews: reviews }))
    }

    render() {
        const { reviews } = this.state;
        return (
            reviews?.length > 0
                ? reviews.map(({ author, content, id }) =>
                    <div key={id}>
                        <h2>Author : {author} </h2>
                        <p>{content}</p>
                    </div>
                )
                : <h2>We don't have any review for this movie.</h2>
        )
    }

}

export default Reviews;