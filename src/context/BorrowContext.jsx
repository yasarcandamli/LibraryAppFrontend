import { createContext, useState, useCallback } from 'react';

export const BorrowContext = createContext();

export const BorrowListProvider = ({ children }) => {
    const [borrows, setBorrows] = useState([]);
    const [borrow, setBorrow] = useState({});

    const updateBorrows = useCallback((borrows) => {
        setBorrows(borrows);
    }, []);

    const addBorrow = (borrow) => {
        setBorrows([...borrows, borrow]);
    };

    const updateBorrow = useCallback((borrow) => {
        setBorrow(borrow);
    }, []);

    const removeBorrowById = (id) => {
        const newBorrows = borrows.filter((borrow) => borrow.id !== id);
        setBorrows(newBorrows);
    };

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
