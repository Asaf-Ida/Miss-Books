const { useState, useEffect } = React

import { storageService } from "../services/async-storage.service.js"
import { bookService } from "../services/book.service.js"
import { BookList } from "./BookList.jsx"

export function BookIndex() {
    const [books, setBooks] = useState([])

    useEffect(() => {
        bookService.query()
            .then((books) => setBooks(books))
    }, [books])

    return (
        <section>
            <h2>Books</h2>
            <BookList books={books}/>
        </section>
    )
}
