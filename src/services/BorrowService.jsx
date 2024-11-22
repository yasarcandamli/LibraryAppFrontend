import axios from 'axios';

const BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL; // API, from environmental variables 
const API_URL = `${BASE_URL}/api/v1/borrows`; // Core API endpoint for Borrows

// Function that brings all borrows
export const getBorrows = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// Function that creates a new borrow
export const createBorrow = async (borrow) => {
    try {
        const response = await axios.post(API_URL, borrow);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// Function that retrieves information from a specific borrow
export const getBorrowById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// Function that updates a specific borrow
export const updateBorrowById = async (id, borrow) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, borrow);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// Function that deletes a specific borrow
export const deleteBorrowById = async (id) => {
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