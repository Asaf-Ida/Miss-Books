export function BookDetails({ book, setSelectedBook}) {
    const isOnSale = book.listPrice.isOnSale ? 'Yes' : 'No'

    return <section className="book-details">
        <h2>{book.title}</h2>
        <p>amount: {book.listPrice.amount}</p>
        <p>Is on sale: {isOnSale}</p>
        <img src={book.thumbnail} />
        <button onClick={() => setSelectedBook(null)}>Close</button>
    </section>
}