import axios from 'axios';

const BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL; // API, from environmental variables
const API_URL = `${BASE_URL}/api/v1/publishers`; // Core API endpoint for Publishers

// DEĞERLENDİRME 6
// Function that brings all publishers
export const getPublishers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// DEĞERLENDİRME 6
// Function that creates a new publisher
export const createPublisher = async (publisher) => {
    try {
        const response = await axios.post(API_URL, publisher);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// DEĞERLENDİRME 6
// Function that retrieves information from a specific publisher
export const getPublisherById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// DEĞERLENDİRME 6
// Function that updates a specific publisher
export const updatePublisherById = async (id, publisher) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, publisher);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// DEĞERLENDİRME 6
// Function that deletes a specific publisher
export const deletePublisherById = async (id) => {
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