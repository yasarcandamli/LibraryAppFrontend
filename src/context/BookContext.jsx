import { createContext, useState, useCallback } from 'react';

export const BookContext = createContext();

export const BookListProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [book, setBook] = useState({});

    const updateBooks = useCallback((books) => {
        setBooks(books);
    }, []);

    const addBook = (book) => {
        setBooks([...books, book]);
    }

    const updateBook = useCallback((book) => {
        setBook(book);
    }, []);

    const removeBookById = (id) => {
        const newBooks = books.filter((book) => book.id !== id);
        setBooks(newBooks);
    }

    const values = {
        books,
        book,
        updateBooks,
        updateBook,
        removeBookById,
        addBook
    }
    return (
        <BookContext.Provider value={values}>
            {children}
        </BookContext.Provider>
    );
}