const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { RenderReviews } from "../cmps/RenderReviews.jsx"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { bookService } from "../services/book.service.js"

export function BookDetails() {
    const [book, setBook] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        bookService.get(params.bookId)
            .then(book => {
                setBook(book)
            })
            .catch(() => {
                alert('Something went wrong')
                navigate('/book')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [params.bookId])

    if (isLoading) return <h3>Loading...</h3>
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

        <RenderReviews book={ book }/>
        <Link to={`/book/${book.id}/review`}><button className="add-review-btn">Add Review</button></Link>
        <section className="actions">
            <Link to={`/book/${book.prevBookId}`}><button>Previous</button></Link>
            <Link to={`/book/${book.nextBookId}`}><button>Next</button></Link>
            <Link to="/book"><button className="close-details-btn">Close</button></Link>
        </section>
    </section>
}