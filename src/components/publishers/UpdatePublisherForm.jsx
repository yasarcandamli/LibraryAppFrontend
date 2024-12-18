import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPublisherById, updatePublisherById } from '../../services/PublisherService';
import { toast } from 'react-toastify';

// DEĞERLENDİRME 6
const UpdatePublisherForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [publisher, setPublisher] = useState({
        name: '',
        establishmentYear: '',
        address: '',
    });

    // UseEffect hook that gets publisher information and fills the form
    useEffect(() => {
        const fetchPublisher = async () => {
            try {
                const data = await getPublisherById(id);
                if (data) {
                    setPublisher(data);
                } else {
                    toast.error("Yayınevi bilgileri alınamadı.");
                }
            } catch (error) {
                console.error("Fetch Error:", error);
                toast.error("Yayınevi bilgileri alınırken bir hata oluştu.");
            }
        };
        fetchPublisher();
    }, [id]);

    // Function that binds values from form field to state
    const handleChange = (e) => {
        setPublisher({ ...publisher, [e.target.name]: e.target.value });
    };

    // Function to run when the form is submitted
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Checks if the required fields are filled
        if (!publisher.name || !publisher.establishmentYear || !publisher.address) {
            toast.error("Lütfen tüm alanları doldurun.");
            return;
        }

        try {
            const data = await getPublisherById(id);

            // If the publisher data and form data are the same, it informs that no changes have been made
            if (
                data.name === publisher.name &&
                data.establishmentYear === publisher.establishmentYear &&
                data.address === publisher.address
            ) {
                toast.info("Hiçbir değişiklik yapılmadı.");
                return;
            }

            // Updates publisher information by calling the Update API
            const response = await updatePublisherById(id, publisher);
            if (response) {
                toast.success("Yayınevi başarıyla güncellendi!");
                navigate('/publishers');
            } else {
                toast.error("Yayınevi güncellenirken bir hata oluştu.");
            }
        } catch (err) {
            console.error("Update Error:", err);
            toast.error("Yayınevi güncellenirken bir hata oluştu.");
        }
    };

    return (
        <form className='form' onSubmit={handleSubmit}>
            <div>
                <label>Yayınevi Adı:</label>
                <input
                    type="text"
                    name="name"
                    value={publisher.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Kuruluş Yılı:</label>
                <input
                    type="number"
                    name="establishmentYear"
                    value={publisher.establishmentYear}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Adres:</label>
                <input
                    type="text"
                    name="address"
                    value={publisher.address}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Güncelle</button>
        </form>
    );
};

export default UpdatePublisherForm;
