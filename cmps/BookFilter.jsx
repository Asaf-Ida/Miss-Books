const { useState } = React

import { bookService } from "../services/book.service.js"

export function BookFilter() {
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    function handleChange({ target}) {
        const { name, type } = target
        const value = (type === 'number') ? +target.value : target.value

        setFilterBy(prevFilterBy => ({ ...prevFilterBy, [name]: value}))
    }

    return <section className="book-filter">
        <h3>Filter</h3>
        <input value={filterBy.txt} onChange={handleChange} name="txt" type="text" placeholder="Title" />
        <input value={filterBy.maxPrice} onChange={handleChange} name="maxPrice" type="number" placeholder="Price" />
    </section>
}