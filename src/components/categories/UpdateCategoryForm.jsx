import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryById, updateCategoryById } from '../../services/CategoryService';
import { toast } from 'react-toastify';

const UpdateCategoryForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState({
        name: '',
        description: '',
    });

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const data = await getCategoryById(id);
                if (data) {
                    setCategory(data);
                } else {
                    toast.error("Kategori bilgileri alınamadı.");
                }
            } catch (error) {
                console.error("Fetch Error:", error);
                toast.error("Kategori bilgileri alınırken bir hata oluştu.");
            }
        };
        fetchCategory();
    }, [id]);

    const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category.name || !category.description) {
            toast.error("Lütfen tüm alanları doldurun.");
            return;
        }

        try {
            const data = await getCategoryById(id);
            if (
                data.name === category.name &&
                data.description === category.description
            ) {
                toast.info("Hiçbir değişiklik yapılmadı.");
                return;
            }


            const response = await updateCategoryById(id, category);
            if (response) {
                toast.success("Kategori başarıyla güncellendi!");
                navigate('/categories');
            } else {
                toast.error("Kategori güncellenirken bir hata oluştu.");
            }
        } catch (err) {
            console.error("Update Error:", err);
            toast.error("Kategori güncellenirken bir hata oluştu.");
        }
    };

    return (
        <form className='form' onSubmit={handleSubmit}>
            <div>
                <label>Kategori Adı:</label>
                <input
                    type="text"
                    name="name"
                    value={category.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Açıklama:</label>
                <input
                    type="text"
                    name="description"
                    value={category.description}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Güncelle</button>
        </form>
    );
};

export default UpdateCategoryForm;
