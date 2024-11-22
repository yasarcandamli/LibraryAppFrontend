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

    // UseEffect hook that gets category information and fills the form
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

    // Function that binds values from form field to state
    const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    // Function to run when the form is submitted
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Checks if the required fields are filled
        if (!category.name || !category.description) {
            toast.error("Lütfen tüm alanları doldurun.");
            return;
        }

        try {
            const data = await getCategoryById(id);

            // If the category data and form data are the same, it informs that no changes have been made
            if (
                data.name === category.name &&
                data.description === category.description
            ) {
                toast.info("Hiçbir değişiklik yapılmadı.");
                return;
            }

            // Updates category information by calling the Update API
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
