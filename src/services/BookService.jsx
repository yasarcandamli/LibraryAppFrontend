import axios from 'axios';

const BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL; // API, from environmental variables 
const API_URL = `${BASE_URL}/api/v1/books`; // Core API endpoint for Books

// DEĞERLENDİRME 8
// Function that brings all books
export const getBooks = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// DEĞERLENDİRME 8
// Function that creates a new book
export const createBook = async (book) => {
    try {
        const response = await axios.post(API_URL, book);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// DEĞERLENDİRME 8
// Function that retrieves information from a specific book
export const getBookById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// DEĞERLENDİRME 8
// Function that updates a specific book
export const updateBookById = async (id, book) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, book);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// DEĞERLENDİRME 8
// Function that deletes a specific book
export const deleteBookById = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        if (response.status === 200 || response.status === 204) {
            return true;
        }
        return false;
    } catch (error) {
        console.error("API Delete Error:", error.response || error);
        return false;
    }
};