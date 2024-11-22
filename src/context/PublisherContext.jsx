import { createContext, useState, useCallback } from 'react';

export const PublisherContext = createContext();

export const PublisherListProvider = ({ children }) => {
    const [publishers, setPublishers] = useState([]);
    const [publisher, setPublisher] = useState({});

    // Function used to update the list of authors
    const updatePublishers = useCallback((publishers) => {
        setPublishers(publishers);
    }, []);

    // Function to add a new author
    const addPublisher = (publisher) => {
        setPublishers([...publishers, publisher]);
    }

    // Function to update the details of a selected author
    const updatePublisher = useCallback((publisher) => {
        setPublisher(publisher);
    }, []);

    // Remove an author from the list based on a specific author ID
    const removePublisherById = (id) => {
        const newPublishers = publishers.filter((publisher) => publisher.id !== id);
        setPublishers(newPublishers);
    }

    // Values to be transferred to Provider
    const values = {
        publishers,
        publisher,
        updatePublishers,
        updatePublisher,
        removePublisherById,
        addPublisher
    }
    return (
        <PublisherContext.Provider value={values}>
            {children}
        </PublisherContext.Provider>
    );
}