import { createContext, useState, useCallback } from 'react';

export const AuthorContext = createContext();

export const AuthorListProvider = ({ children }) => {
    const [authors, setAuthors] = useState([]);
    const [author, setAuthor] = useState({});

    // Function used to update the list of authors
    const updateAuthors = useCallback((authors) => {
        setAuthors(authors);
    }, []);

    // Function to add a new author
    const addAuthor = (author) => {
        setAuthors([...authors, author]);
    }

    // Function to update the details of a selected author
    const updateAuthor = useCallback((author) => {
        setAuthor(author);
    }, []);

    // Remove an author from the list based on a specific author ID
    const removeAuthorById = (id) => {
        const newAuthors = authors.filter((author) => author.id !== id);
        setAuthors(newAuthors);
    }

    // Values to be transferred to Provider
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