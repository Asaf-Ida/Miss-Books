const { useState, useEffect } = React

import { storageService } from "../services/async-storage.service.js"

export function BookIndex() {
    const [books, setBooks] = useState([])

    useEffect(() => {
        storageService.query()
            .then((books) => setBooks(books))
    }, [books])

    return (
        <section>
            <span>BookIndex</span>
            <pre>{JSON.stringify(books, null, 4)}</pre>
        </section>
    )
}
