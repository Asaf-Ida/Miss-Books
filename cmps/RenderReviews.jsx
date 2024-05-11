const { useState, useEffect } = React

import { bookService } from "../services/book.service.js"

export function RenderReviews({ book }) {
    if (!book.reviews) return
    
    const [reviews, setReviews] = useState(book.reviews)

    useEffect(() => {

    }, [reviews])

    function deleteReview(reviewId) {
        bookService.deleteReview(book, reviewId)
            .then(() => {
                console.log('review has been deleted')
                setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId))
            })
    }

    return <section className="reviews-list">
        <h4>Reviews</h4>
        <ul>
            {reviews.map(review => {
                return <li key={review.id}>
                    <span>Reviewer: {review.fullname}</span>
                    <span>Rating: {review.rating}</span>
                    <button onClick={() => deleteReview(review.id)}>delete</button>
                    </li>
            })} 
        </ul>
    </section>
}