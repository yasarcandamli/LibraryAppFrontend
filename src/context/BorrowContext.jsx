import { createContext, useState, useCallback } from 'react';

export const BorrowContext = createContext();

export const BorrowListProvider = ({ children }) => {
    const [borrows, setBorrows] = useState([]);
    const [borrow, setBorrow] = useState({});

    // Function used to update the list of authors
    const updateBorrows = useCallback((borrows) => {
        setBorrows(borrows);
    }, []);

    // Function to add a new author
    const addBorrow = (borrow) => {
        setBorrows([...borrows, borrow]);
    };

    // Function to update the details of a selected author
    const updateBorrow = useCallback((borrow) => {
        setBorrow(borrow);
    }, []);

    // Remove an author from the list based on a specific author ID
    const removeBorrowById = (id) => {
        const newBorrows = borrows.filter((borrow) => borrow.id !== id);
        setBorrows(newBorrows);
    };

    // Values to be transferred to Provider
    const values = {
        borrows,
        borrow,
        updateBorrows,
        addBorrow,
        updateBorrow,
        removeBorrowById,
    };

    return (
        <BorrowContext.Provider value={values}>
            {children}
        </BorrowContext.Provider>
    );
};
