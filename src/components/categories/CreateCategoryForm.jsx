import { useState } from "react";
import { createCategory } from "../../services/CategoryService";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const CreateCategoryForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !description) {
            setError("Lütfen tüm alanları doldurun.");
            toast.error("Lütfen tüm alanları doldurun.");
            return;
        }

        try {
            const newCategory = { name, description };
            const response = await createCategory(newCategory);
            if (response) {
                toast.success("Kategori eklendi!");
                navigate("/categories");
            } else {
                toast.error("Kategori eklenirken bir sorun oluştu.");
            }
        } catch (err) {
            console.error("Create Error:", err);
            setError("Kategori eklenirken bir hata oluştu.");
            toast.error("Kategori eklenirken bir hata oluştu.");
        }
    };

    return (
        <div>
            <h2>Yeni Kategori Ekle</h2>
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
                    <label>Açıklama:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Ekle</button>
            </form>
        </div>
    );
};

export default CreateCategoryForm;
