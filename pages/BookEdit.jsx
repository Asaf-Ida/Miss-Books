const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouter

import { bookService } from "../services/book.service.js"

export function BookEdit() {
    const [book, setBook] = useState(bookService.getEmptyBook())
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!params.bookId) return
        
        bookService.get(params.bookId)
            .then(setBook)
    }, [])

    function onSave(ev) {
        ev.preventDefault()
        bookService.save(book)
            .then(() => navigate('/book'))
            .catch(() => {
                alert('coudnt save...')
                navigate('/book')
            })
    }

    function handleChange({ target }) {
        const { type, name: prop } = target

        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;
        }
        setBook(prevBook => ({ ...prevBook, [prop]: value}))
    }

    return <section className="book-edit">
        <h1>{params.bookId ? 'Edit book' : 'Add book'}</h1>
        <form onSubmit={onSave}>
            <label htmlFor="title">Title: </label>
            <input onChange={handleChange} value={book.title} type="text" placeholder="title" id="title" name="title"/>

            <label htmlFor="price">Price: </label>
            <input onChange={handleChange} value={book.listPrice.amount} type="number" placeholder="price" id="price" name="amount"/>

            <button>Save</button>
        </form>
    </section>
}