export function BookPreview({ book }) {
    const isOnSale = book.listPrice.isOnSale ? 'Yes' : 'No'

    return <article>
        <h3>{book.title}</h3>
        <p>amount: {book.listPrice.amount}</p>
        <p>Is on sale: {isOnSale}</p>
    </article>
}