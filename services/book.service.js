import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'booksDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter, 
    getEmptyBook
}
// For Debug (easy access from console):
window.bs = bookService

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }

            if (filterBy.maxPrice) {
                books = books.filter(book => book.listPrice.amount <= filterBy.maxPrice)
            }

            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => {
            book = _setNextPrevBookId(book)
            return book
        })
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', amount = '') {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    const book = {
        title,
        subtitle: utilService.makeLorem(4),
        authors: [utilService.makeLorem(1)],
        publishedDate: utilService.getRandomIntInclusive(1950, 2024),
        description: utilService.makeLorem(100),
        pageCount: utilService.getRandomIntInclusive(20, 600), 
        categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]], 
        thumbnail: `assets/BooksImages/1.jpg`, 
        language: "en", 
        listPrice: { 
            amount, 
            currencyCode: "EUR", 
            isOnSale: Math.random() > 0.7 
        }
    }
    return book
}

function getDefaultFilter(filterBy = { txt: '', maxPrice: 0 }) {
    return { txt: filterBy.txt, maxPrice: filterBy.maxPrice }
}

// function getSpeedStats() {
//     return storageService.query(CAR_KEY)
//         .then(cars => {
//             const carCountBySpeedMap = _getCarCountBySpeedMap(cars)
//             const data = Object.keys(carCountBySpeedMap).map(speedName => ({ title: speedName, value: carCountBySpeedMap[speedName] }))
//             return data
//         })

// }

// function getVendorStats() {
//     return storageService.query(CAR_KEY)
//         .then(cars => {
//             const carCountByVendorMap = _getCarCountByVendorMap(cars)
//             const data = Object.keys(carCountByVendorMap)
//                 .map(vendor =>
//                 ({
//                     title: vendor,
//                     value: Math.round((carCountByVendorMap[vendor] / cars.length) * 100)
//                 }))
//             return data
//         })
// }

// function _createBooks() {
//     let books = utilService.loadFromStorage(BOOK_KEY)
//     if (!books || !books.length) {
//         books = [
//             _createBook('Harry Potter', 'EUR', true),
//             _createBook('Human History', 'DOL', false),
//             _createBook('Lord of the rings', 'EUR', true)
//         ]
//         utilService.saveToStorage(BOOK_KEY, books)
//     }
// }

// function _createBook(title, currencyCode, isOnSale) {
//     const book = {
//         id: utilService.makeId(),
//         title,
//         listPrice: {
//             amount: utilService.getRandomIntInclusive(0, 250),
//             currencyCode,
//             isOnSale
//         }
//     }

//     return book
// }

function _createBooks() {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    const books = []
    for (let i = 0; i < 20; i++) {
        const book = {
            id: utilService.makeId(),
            title: utilService.makeLorem(2),
            subtitle: utilService.makeLorem(4),
            authors: [utilService.makeLorem(1)],
            publishedDate: utilService.getRandomIntInclusive(1950, 2024),
            description: utilService.makeLorem(100),
            pageCount: utilService.getRandomIntInclusive(20, 600), 
            categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]], 
            thumbnail: `assets/BooksImages/${i + 1}.jpg`, 
            language: "en", 
            listPrice: { 
                amount: utilService.getRandomIntInclusive(1, 300), 
                currencyCode: "EUR", 
                isOnSale: Math.random() > 0.7 
            }
        } 
        books.push(book)
    } 
    utilService.saveToStorage(BOOK_KEY, books)
}

function _setNextPrevBookId(book) {
    return storageService.query(BOOK_KEY).then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

// function _getCarCountBySpeedMap(cars) {
//     const carCountBySpeedMap = cars.reduce((map, car) => {
//         if (car.maxSpeed < 120) map.slow++
//         else if (car.maxSpeed < 200) map.normal++
//         else map.fast++
//         return map
//     }, { slow: 0, normal: 0, fast: 0 })
//     return carCountBySpeedMap
// }

// function _getCarCountByVendorMap(cars) {
//     const carCountByVendorMap = cars.reduce((map, car) => {
//         if (!map[car.vendor]) map[car.vendor] = 0
//         map[car.vendor]++
//         return map
//     }, {})
//     return carCountByVendorMap
// }