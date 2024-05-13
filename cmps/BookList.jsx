const { Link } = ReactRouterDOM
import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books, onRemoveBook }) {
    return <section className="book-list">
        <ul>
            {books.map(book => 
            <li key={book.id}>
                <BookPreview book={book} />
                <Link to={`/book/${book.id}`}><button>Details</button></Link>
                <Link to={`/book/edit/${book.id}`}><button>Edit</button></Link>
                <button onClick={() => onRemoveBook(book.id)}>Delete</button>
            </li>)}
        </ul>
    </section>    
}