import { useState } from "react";
import { createAuthor } from "../../services/AuthorService";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

// DEĞERLENDİRME 9
const CreateAuthorForm = () => {
    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [country, setCountry] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // handleSubmit function triggered when the form is submitted
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Checks if the required fields are filled
        if (!name || !birthDate || !country) {
            setError("Lütfen tüm alanları doldurun.");
            toast.error("Lütfen tüm alanları doldurun.");
            return;
        }

        try {
            const newAuthor = { name, birthDate, country };
            const response = await createAuthor(newAuthor); // API call to add a author
            if (response) {
                toast.success("Yazar eklendi!");
                navigate("/authors");
            } else {
                toast.error("Yayınevi eklenirken bir sorun oluştu.");
            }
        } catch (err) {
            console.error("Create Error:", err);
            setError("Yazar eklenirken bir hata oluştu.");
            toast.error("Yazar eklenirken bir hata oluştu.");
        }
    };

    return (
        <div>
            <h2>Yeni Yazar Ekle</h2>
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
                    <label>Doğum Tarihi:</label>
                    <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>Ülke:</label>
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <button type="submit">Ekle</button>
            </form>
        </div>
    );
};

export default CreateAuthorForm;
