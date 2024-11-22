import { createContext, useState, useCallback } from 'react';

export const BookContext = createContext();

export const BookListProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [book, setBook] = useState({});

    // Function used to update the list of books
    const updateBooks = useCallback((books) => {
        setBooks(books);
    }, []);

    // Function to add a new book
    const addBook = (book) => {
        setBooks([...books, book]);
    }

    // Function to update the details of a selected book
    const updateBook = useCallback((book) => {
        setBook(book);
    }, []);

    // Remove an book from the list based on a specific book ID
    const removeBookById = (id) => {
        const newBooks = books.filter((book) => book.id !== id);
        setBooks(newBooks);
    }

    // Values to be transferred to Provider
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