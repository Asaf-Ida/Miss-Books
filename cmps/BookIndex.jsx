const { useState, useEffect } = React

import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"
import { BookFilter } from "./BookFilter.jsx"
import { BookList } from "./BookList.jsx"

export function BookIndex() {


    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBook, setSelectedBook] = useState(null)

    useEffect(() => {
        bookService.query(filterBy)
            .then((books) => setBooks(books))
    }, [filterBy])

    function showBookDetails(book) {
        setSelectedBook(book)
    }

    function onSetFilterBy(newFilter) {
        setFilterBy(newFilter)
    }

    return (
        <section className="book-index">
            <h2>Books</h2>
            <BookFilter filterBy={filterBy} onFilter={onSetFilterBy}/>
            {!selectedBook && <BookList books={books} onShowDetails={showBookDetails} />}
            {selectedBook && <BookDetails book={selectedBook} setSelectedBook={setSelectedBook} />}
        </section>
    )
}