const { useState, useEffect } = React

const { Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"

export function BookIndex() {


    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        bookService.query(filterBy)
            .then((books) => setBooks(books))
    }, [filterBy])

    function onSetFilterBy(newFilter) {
        setFilterBy(newFilter)
    }

    return (
        <section className="book-index">
            <h2>Books</h2>
            <Link to="/book/edit"><button>Add a Book</button></Link>
            <BookFilter filterBy={filterBy} onFilter={onSetFilterBy}/>
            <BookList books={books}/>
        </section>
    )
}