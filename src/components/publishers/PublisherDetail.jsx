import { useContext, useEffect } from "react";
import { PublisherContext } from "../../context/PublisherContext";
import { useParams } from "react-router-dom";
import { getPublisherById } from "../../services/PublisherService";

const PublisherDetail = () => {
    const { id } = useParams();
    const { publisher, updatePublisher } = useContext(PublisherContext);

    useEffect(() => {
        const fetchPublisher = async () => {
            try {
                const data = await getPublisherById(id);
                updatePublisher(data);
            } catch (error) {
                toast.error("Yayınevi bilgileri alınamadı:", error);
            }
        };
        fetchPublisher();
    }, [id, updatePublisher]);

    return (
        <div className="detail">
            <h2>Yayınevi Detayları</h2>
            {publisher && (
                <div>
                    <p><strong>Ad:</strong> {publisher.name}</p>
                    <p><strong>Kuruluş Yılı:</strong> {publisher.establishmentYear}</p>
                    <p><strong>Adres:</strong> {publisher.address}</p>
                </div>
            )}
        </div>
    );
};

export default PublisherDetail;
