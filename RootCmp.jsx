const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AboutUs } from "./pages/AboutUs.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { AppHeader } from "./cmps/appHeader.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"

export function RootCmp() {
    
    return (
        <Router>
            <AppHeader />
            <main className="content-grid">
                <Routes >
                    <Route path="/" element={ <HomePage /> }/>
                    <Route path="/book" element={ <BookIndex /> }/>
                    <Route path="/about" element={ <AboutUs /> }/>
                    <Route path="/book/:bookId" element={ <BookDetails /> }/>
                    <Route path="/book/edit" element={ <BookEdit /> }/>
                    <Route path="/book/edit/:bookId" element={ <BookEdit /> }/>
                </Routes>
            </main>
        </Router>
    )
}