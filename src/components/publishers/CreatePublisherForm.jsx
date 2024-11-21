import { useState } from "react";
import { createPublisher } from "../../services/publisherService";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const CreatePublisherForm = () => {
    const [name, setName] = useState("");
    const [establishmentYear, setEstablishmentYear] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !establishmentYear || !address) {
            setError("Lütfen tüm alanları doldurun.");
            toast.error("Lütfen tüm alanları doldurun.");
            return;
        }

        try {
            const newPublisher = { name, establishmentYear: parseInt(establishmentYear), address };
            const response = await createPublisher(newPublisher);
            if (response) {
                toast.success("Yayınevi başarıyla eklendi!");
                navigate("/publishers");
            } else {
                toast.error("Yayınevi eklenirken bir sorun oluştu.");
            }
        } catch (err) {
            console.error("Create Error:", err);
            setError("Yayınevi eklenirken bir hata oluştu.");
            toast.error("Yayınevi eklenirken bir hata oluştu.");
        }
    };

    return (
        <div>
            <h2>Yeni Yayınevi Ekle</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form className="form" onSubmit={handleSubmit}>
                <div>
                    <label>Ad:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Kuruluş Yılı:</label>
                    <input
                        type="number"
                        value={establishmentYear}
                        onChange={(e) => setEstablishmentYear(e.target.value)}
                    />
                </div>
                <div>
                    <label>Adres:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <button type="submit">Ekle</button>
            </form>
        </div>
    );
};

export default CreatePublisherForm;
