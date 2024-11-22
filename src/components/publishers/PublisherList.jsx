import { useContext, useEffect } from "react";
import { PublisherContext } from "../../context/PublisherContext";
import { useNavigate } from "react-router-dom";
import { getPublishers, deletePublisherById } from "../../services/PublisherService";
import { toast } from 'react-toastify';

const PublisherList = () => {
    const { publishers, updatePublishers, removePublisherById } = useContext(PublisherContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPublishers = async () => {
            try {
                const response = await getPublishers();
                if (response) {
                    updatePublishers(response);
                } else {
                    toast.error("Yayınevi listesi alınamadı.");
                }
            } catch (error) {
                console.error("Fetch Error:", error);
                toast.error("Yayınevi listesi alınırken bir hata oluştu.");
            }
        };

        fetchPublishers();
    }, [updatePublishers]);

    const handleDelete = async (id) => {
        try {
            const isDeleted = await deletePublisherById(id);

            if (isDeleted) {
                removePublisherById(id);
                toast.success("Yayınevi başarıyla silindi!");
            } else {
                toast.error("Silme işlemi başarısız oldu!");
            }
        } catch (error) {
            console.error("Delete Error:", error);
            toast.error("Silme işlemi sırasında bir hata oluştu.");
        }
    };

    const handleEdit = (id) => {
        navigate(`/publishers/${id}/edit`);
    };

    const handleDetail = (id) => {
        navigate(`/publishers/${id}`);
    };

    return (
        <div className="list">
            <h1>Yayınevi Listesi</h1>
            <button onClick={() => navigate("/publishers/new")}>Yayınevi Ekle</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Yayınevi Adı</th>
                        <th>Kuruluş Yılı</th>
                        <th>Adres</th>
                        <th>Eylemler</th>
                    </tr>
                </thead>
                <tbody>
                    {publishers.map((publisher) => (
                        <tr key={publisher.id}>
                            <td>{publisher.id}</td>
                            <td>{publisher.name}</td>
                            <td>{publisher.establishmentYear}</td>
                            <td>{publisher.address}</td>
                            <td>
                                <button onClick={() => handleDetail(publisher.id)}>Detay</button>
                                <button onClick={() => handleEdit(publisher.id)}>Düzenle</button>
                                <button onClick={() => handleDelete(publisher.id)}>Sil</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PublisherList;
