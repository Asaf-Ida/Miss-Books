const { useState } = React
const { useNavigate } = ReactRouter

import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { googleBookService } from "../services/googleBook.service.js"

export function BookAdd() {
    const [book, setBook] = useState(bookService.getEmptyBook())
    const [books, setBooks] = useState([])
    const navigate = useNavigate()
    
    // const books = [
    //     { id: '153sd', title: 'Harry Potter 3'},
    //     { id: '546ss', title: 'Lord of the rings'}, 
    //     { id: '878ty', title: 'Human History'}
    // ]

    function addGoogleBook(book) {
        bookService.addGoogleBook(book)
            .then(() => {
                showSuccessMsg(`The book - ${book.title} has been saved successfully!`)
            })
            .catch(() => {
                showErrorMsg(`The book - ${book.title} couldn't be saved`)
            })
            .finally(() => navigate('/book'))
    }

    function handleChange({ target }) {
        const { name, value } = target

        setBook(prevBook => ({ ...prevBook, [name]: value}))
    }

    function onSearch(ev) {
        ev.preventDefault()
        
        googleBookService.query(book.title)
            .then(setBooks)
    }

    return <section className="google-books">
        <form onSubmit={onSearch}>
            <label htmlFor="title">Title: </label>
            <input onChange={handleChange} value={book.title} type="text" placeholder="title" id="title" name="title"/>

            <button>Search</button>
        </form>

        <ul>
            { books.map( book => {
                return <li key={book.id}>
                    <span>{book.title}</span>
                    <button onClick={() => addGoogleBook(book)}>+</button>
                </li>
            })}
        </ul>
    </section>
}