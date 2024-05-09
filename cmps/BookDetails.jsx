import { LongTxt } from "./LongTxt.jsx"

export function BookDetails({ book, setSelectedBook}) {
    const isOnSale = book.listPrice.isOnSale ? 'On Sale' : ''
    const OnSaleSign = book.listPrice.isOnSale ? 'on-sale-sign' : ''

    function classifyBookLevel() {
        let bookLevel = 'regular reading'
        const { pageCount } = book
        if (pageCount > 500) {
            bookLevel = 'Serious Reading'
        } else if (pageCount > 200) {
             bookLevel = 'Descent Reading'
        } else if (pageCount < 100) {
            bookLevel = 'Light Reading'
        }

        return bookLevel
    }

    function classifyBookAge() {
        const date = new Date()
        const bookAge =  date.getFullYear() - book.publishedDate
        return bookAge > 10 ? 'Vintage' : 'New'
    }

    function classifyBookPrice() {
        const { amount } = book.listPrice
        if (amount > 150) return 'expensive'
        else if (amount < 20) return 'cheap'
        return ''
    }

    return <section className="book-details">
        <h2>{book.title}</h2>
        <p>{classifyBookLevel()}</p>
        <p>{classifyBookAge()}</p>
        <p>amount: <span className={classifyBookPrice()}>{book.listPrice.amount}</span></p>
        <p className={OnSaleSign}>{isOnSale}</p>
        <LongTxt txt={book.description}/>
        <img src={book.thumbnail} />
        <button onClick={() => setSelectedBook(null)}>Close</button>
    </section>
}