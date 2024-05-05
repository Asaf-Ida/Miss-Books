const { useState, useEffect } = React

import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"
import { BookFilter } from "./BookFilter.jsx"
import { BookList } from "./BookList.jsx"

export function BookIndex() {

    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)

    useEffect(() => {
        bookService.query()
            .then((books) => setBooks(books))
    }, [books])

    function showBookDetails(book) {
        setSelectedBook(book)
    }

    return (
        <section className="book-index">
            <h2>Books</h2>
            <BookFilter />
            {!selectedBook && <BookList books={books} onShowDetails={showBookDetails} />}
            {selectedBook && <BookDetails book={selectedBook} setSelectedBook={setSelectedBook} />}
        </section>
    )
}