const { useState, useEffect } = React

const { Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

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

    function removeBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
                showSuccessMsg('The book has been removed successfully!')
            })
            .catch(() => {
                showErrorMsg('The book could not be removed')
            })
    }

    return (
        <section className="book-index">
            <h2>Books</h2>
            <Link to="/book/edit"><button>Add a Book</button></Link>
            <BookFilter filterBy={filterBy} onFilter={onSetFilterBy}/>
            <BookList books={books} onRemoveBook={removeBook}/>
        </section>
    )
}