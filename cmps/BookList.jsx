import { BookDetails } from "./BookDetails.jsx"
import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books, onShowDetails }) {
    return <section className="book-list">
        <ul>
            {books.map(book => 
            <li key={book.id}>
                <BookPreview book={book} />
                <button onClick={() => onShowDetails(book)}>Details</button>
            </li>)}
        </ul>
    </section>    
}