import { createContext, useState, useCallback } from 'react';

export const CategoryContext = createContext();

export const CategoryListProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({});

    // Function used to update the list of categories
    const updateCategories = useCallback((categories) => {
        setCategories(categories);
    }, []);

    // Function to add a new category
    const addCategory = (category) => {
        setCategories([...categories, category]);
    }

    // Function to update the details of a selected category
    const updateCategory = useCallback((category) => {
        setCategory(category);
    }, []);

    // Remove an category from the list based on a specific category ID
    const removeCategoryById = (id) => {
        const newCategories = categories.filter((category) => category.id !== id);
        setCategories(newCategories);
    }

    // Values to be transferred to Provider
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