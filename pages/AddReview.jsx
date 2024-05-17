const { useState } = React
const { useParams, useNavigate } = ReactRouter

import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { RateBySelect } from "../cmps/RateBySelect.jsx"
import { RateByTextbox } from "../cmps/RateByTextbox.jsx"
import { RateByStars } from "../cmps/RateByStars.jsx"

export function AddReview() {
    const [review, setReview] = useState(bookService.getEmptyReview())
    const [cmpType, setCmpType] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    function onSave(ev) {
        ev.preventDefault()
        bookService.addReview(params.bookId, review)
            .then(() => {
                showSuccessMsg('The review has been saved successfully!')
            })
            .catch(() => {
                showErrorMsg('The review could not be saved')
            })
            .finally(() => navigate(`/book/${params.bookId}`))
    }

    function handleChange({ target }) {
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'select-one':
            case 'range':
            case 'number':
            case 'stars':
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

        {/* <label htmlFor="rating">Rating: </label>
        <input onChange={handleChange} value={review.rating} type="number" placeholder="rating" id="rating" name="rating"/> */}

        <legend>Please select your preferred rating method:</legend>
        <div onChange={(ev) => setCmpType(ev.target.value)}>
            <input type="radio" id="ratingChoice1" name="rating" value="select"/>
            <label htmlFor="ratingChoice1">Select</label>

            <input type="radio" id="ratingChoice2" name="rating" value="textbox"/>
            <label htmlFor="ratingChoice2">Textbox</label>

            <input type="radio" id="ratingChoice3" name="rating" value="stars"/>
            <label htmlFor="ratingChoice3">Stars</label>
        </div>
        <DynamicCmp cmpType={cmpType} handleChange={handleChange}/>

        <button>Save</button>
    </form>
</section>
}


function DynamicCmp(props) {
    if (!props) return

    switch (props.cmpType) {
        case 'select':
            return <RateBySelect {...props} />
        case 'textbox':
            return <RateByTextbox {...props} />
        case 'stars':
            return <RateByStars {...props} />
    }
}