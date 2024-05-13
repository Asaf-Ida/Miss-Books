const { useState } = React
const { useParams, useNavigate } = ReactRouter

import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function AddReview() {
    const [review, setReview] = useState(bookService.getEmptyReview())
    const params = useParams()
    const navigate = useNavigate()

    function onSave(ev) {
        ev.preventDefault()
        bookService.addReview(params.bookId, review)
            .then(() => {
                navigate(`/book/${params.bookId}`)
                showSuccessMsg('The review has been saved successfully!')
            })
            .catch(() => {
                showErrorMsg('The review could not be saved')
                navigate(`/book/${params.bookId}`)
            })
    }

    function handleChange({ target }) {
        const { type, name: prop } = target

        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;
        }
        setReview(prevReview => ({ ...prevReview, [prop]: value}))
    }

    return <section className="add-book-review">
    <h1>Add Review</h1>
    <form onSubmit={onSave}>
        <label htmlFor="fullname">Full Name: </label>
        <input onChange={handleChange} value={review.fullname} type="text" placeholder="Full Name" id="fullname" name="fullname"/>

        <label htmlFor="rating">Rating: </label>
        <input onChange={handleChange} value={review.rating} type="number" placeholder="rating" id="rating" name="rating"/>

        <button>Save</button>
    </form>
</section>
}