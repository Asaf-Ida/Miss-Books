const { useState, useEffect } = React

import { bookService } from "../services/book.service.js"

export function BookFilter({ filterBy, onFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target}) {
        const { name, type } = target
        const value = (type === 'number') ? +target.value : target.value

        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: value}))
    }

    return <section className="book-filter">
        <h3>Filter</h3>
        <input value={filterByToEdit.txt} onChange={handleChange} name="txt" type="text" placeholder="Title" />
        <input value={filterByToEdit.maxPrice} onChange={handleChange} name="maxPrice" type="number" placeholder="Price" />
    </section>
}