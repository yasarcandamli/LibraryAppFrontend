import { createContext, useState, useCallback } from 'react';

export const PublisherContext = createContext();

export const PublisherListProvider = ({ children }) => {
    const [publishers, setPublishers] = useState([]);
    const [publisher, setPublisher] = useState({});

    const updatePublishers = useCallback((publishers) => {
        setPublishers(publishers);
    }, []);

    const addPublisher = (publisher) => {
        setPublishers([...publishers, publisher]);
    }

    const updatePublisher = useCallback((publisher) => {
        setPublisher(publisher);
    }, []);

    const removePublisherById = (id) => {
        const newPublishers = publishers.filter((publisher) => publisher.id !== id);
        setPublishers(newPublishers);
    }

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