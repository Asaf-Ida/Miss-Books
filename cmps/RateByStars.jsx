const { useState } = React

export function RateByStars({ handleChange, rateGiven }) {
    if (typeof rateGiven === 'string' && rateGiven.length > 1) {
        return rateGiven
    }

    const [rating, setRating] = useState(rateGiven || 1) 

    function onSetRating(rate) {
        if (!isEditable) return
        setRating(rate)
        const target = { type: 'stars', name: 'rating', value: rate}
        handleChange({ target })
    }

    const isEditable = typeof handleChange === 'function'
    const editClass = isEditable ? 'edit' : ''

    return (
        <div className={`star-rating ${editClass}`}>
            {[...Array(5)].map((_, idx) => (
                <span
                    key={idx}
                    className={`star ${idx < rating ? 'on': 'off'}`}
                    onClick={() => onSetRating(idx + 1)}
                >
                    &#9733;
                </span>
            ))}
        </div>
    )
}