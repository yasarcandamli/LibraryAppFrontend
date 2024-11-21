import { createContext, useState, useCallback } from 'react';

export const AuthorContext = createContext();

export const AuthorListProvider = ({ children }) => {
    const [authors, setAuthors] = useState([]);
    const [author, setAuthor] = useState({});

    const updateAuthors = useCallback((authors) => {
        setAuthors(authors);
    }, []);

    const addAuthor = (author) => {
        setAuthors([...authors, author]);
    }

    const updateAuthor = useCallback((author) => {
        setAuthor(author);
    }, []);

    const removeAuthorById = (id) => {
        const newAuthors = authors.filter((author) => author.id !== id);
        setAuthors(newAuthors);
    }

    const values = {
        authors,
        author,
        updateAuthors,
        updateAuthor,
        removeAuthorById,
        addAuthor
    }
    return (
        <AuthorContext.Provider value={values}>
            {children}
        </AuthorContext.Provider>
    );
}