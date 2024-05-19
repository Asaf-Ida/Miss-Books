import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const googleBooksAPI = 'https://www.googleapis.com/books/v1/volumes?printType=books&q='

export const googleBookService = {
    query
}

function query(searchValue) {
    return axios.get(googleBooksAPI + searchValue)
        .then((res) => {
            const { items } = res.data
            const books = items.map(item => {
                const { id } = item
                const { title, subtitle, publishedDate, description, pageCount, language } = item.volumeInfo
                // const { 0: authors} = item.volumeInfo.authors
                // const { 0: categories} = item.volumeInfo.categories
                let thumbnail = 'assets/BooksImages/1.jpg'
                if (item.volumeInfo.imageLinks) {
                    thumbnail = item.volumeInfo.imageLinks.thumbnail
                } 
                const listPrice =  { 
                    amount: '', 
                    currencyCode: '', 
                    isOnSale: '' 
                }
                if (item.saleInfo.saleability === 'FOR_SALE') {
                    listPrice.amount = item.saleInfo.listPrice.amount
                    listPrice.currencyCode = item.saleInfo.listPrice.currencyCode
                    listPrice.isOnSale = true
                } else {
                    listPrice.isOnSale = false
                }
                const booksDetails = { id, title, subtitle, publishedDate, description, pageCount, thumbnail, language, listPrice }
                return booksDetails
            })
            return Promise.resolve(books)
        })
}