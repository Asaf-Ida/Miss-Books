export function BookDetails({ book, setSelectedBook}) {
    const isOnSale = book.listPrice.isOnSale ? 'Yes' : 'No'

    return <section className="book-details">
        <h2>Book detail</h2>
        <h4>{book.title}</h4>
        <p>amount: {book.listPrice.amount}</p>
        <p>Is on sale: {isOnSale}</p>
        <button onClick={() => setSelectedBook(null)}>Close</button>
    </section>
}