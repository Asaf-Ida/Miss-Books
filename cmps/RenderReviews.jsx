const { useState, useEffect } = React

import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function RenderReviews({ book }) {
    if (!book.reviews) return
    
    const [reviews, setReviews] = useState(book.reviews)

    useEffect(() => {

    }, [reviews])

    function deleteReview(reviewId) {
        bookService.deleteReview(book, reviewId)
            .then(() => {
                showSuccessMsg('The review has been deleted successfully!')
                setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId))
            })
            .catch(() => {
                showErrorMsg('The review could not be deleted')
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