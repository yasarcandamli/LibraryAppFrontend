import { createContext, useState, useCallback } from 'react';

export const CategoryContext = createContext();

export const CategoryListProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({});

    const updateCategories = useCallback((categories) => {
        setCategories(categories);
    }, []);

    const addCategory = (category) => {
        setCategories([...categories, category]);
    }

    const updateCategory = useCallback((category) => {
        setCategory(category);
    }, []);

    const removeCategoryById = (id) => {
        const newCategories = categories.filter((category) => category.id !== id);
        setCategories(newCategories);
    }

    const values = {
        categories,
        category,
        updateCategories,
        updateCategory,
        removeCategoryById,
        addCategory
    }
    return (
        <CategoryContext.Provider value={values}>
            {children}
        </CategoryContext.Provider>
    );
}