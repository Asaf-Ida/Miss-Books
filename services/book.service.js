import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'booksDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
}
// For Debug (easy access from console):
window.bs = bookService

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(cars => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                cars = cars.filter(car => regExp.test(car.vendor))
            }

            if (filterBy.minSpeed) {
                cars = cars.filter(car => car.maxSpeed >= filterBy.minSpeed)
            }

            return cars
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(car => {
            car = _setNextPrevCarId(car)
            return car
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

// function getEmptyCar(vendor = '', maxSpeed = '') {
//     return { vendor, maxSpeed }
// }

// function getDefaultFilter(filterBy = { txt: '', minSpeed: 0 }) {
//     return { txt: filterBy.txt, minSpeed: filterBy.minSpeed }
// }

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

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = [
            _createCar('Harry Potter', 'EUR', true),
            _createCar('Human History', 'DOL', false),
            _createCar('Lord of the rings', 'EUR', true)
        ]
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createCar(title, currencyCode, isOnSale) {
    const book = {
        id: utilService.makeId(),
        title,
        listPrice: {
            amount: utilService.getRandomIntInclusive(0, 250),
            currencyCode,
            isOnSale
        }
    }

    return book
}

// function _setNextPrevCarId(car) {
//     return storageService.query(CAR_KEY).then((cars) => {
//         const carIdx = cars.findIndex((currCar) => currCar.id === car.id)
//         const nextCar = cars[carIdx + 1] ? cars[carIdx + 1] : cars[0]
//         const prevCar = cars[carIdx - 1] ? cars[carIdx - 1] : cars[cars.length - 1]
//         car.nextCarId = nextCar.id
//         car.prevCarId = prevCar.id
//         return car
//     })
// }

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