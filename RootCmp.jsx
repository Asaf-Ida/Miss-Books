const { useState } = React

import { AboutUs } from "./cmps/AboutUs.jsx"
import { BookIndex } from "./cmps/BookIndex.jsx"
import { HomePage } from "./cmps/HomePage.jsx"

export function RootCmp() {
    const [route, setRoute] = useState('books')

    return (
        <React.Fragment>
            <header>
                <h1>Miss Books</h1>
                <nav>
                    <a href="#" onClick={() => setRoute('home')}>HomePage</a>
                    <a href="#" onClick={() => setRoute('about')}>AboutUs</a>
                    <a href="#" onClick={() => setRoute('books')}>Books</a>
                </nav>
            </header>
            <main className="content-grid">
                {route === 'home' && <HomePage />}
                {route === 'about' && <AboutUs />}
                {route === 'books' && <BookIndex />}
            </main>
        </React.Fragment>
    )
}