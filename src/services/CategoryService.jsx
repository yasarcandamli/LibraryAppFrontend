import axios from 'axios';

const BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL; // API, from environmental variables
const API_URL = `${BASE_URL}/api/v1/categories`; // Core API endpoint for Categories

// Function that brings all categories
export const getCategories = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// Function that creates a new category
export const createCategory = async (category) => {
    try {
        const response = await axios.post(API_URL, category);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// Function that retrieves information from a specific category
export const getCategoryById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// Function that updates a specific category
export const updateCategoryById = async (id, category) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, category);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// Function that deletes a specific category
export const deleteCategoryById = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        console.log("Delete Response:", response);
        if (response.status === 200 || response.status === 204) {
            return true;
        }
        return false;
    } catch (error) {
        console.error("API Delete Error:", error.response || error);
        return false;
    }
};