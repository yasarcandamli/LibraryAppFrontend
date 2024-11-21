import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuthorById, updateAuthorById } from '../../services/AuthorService';
import { toast } from 'react-toastify';

const UpdateAuthorForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [author, setAuthor] = useState({
        name: '',
        birthDate: '',
        country: '',
    });

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const data = await getAuthorById(id);
                if (data) {
                    setAuthor(data);
                } else {
                    toast.error("Yazar bilgileri alınamadı.");
                }
            } catch (error) {
                console.error("Fetch Error:", error);
                toast.error("Yazar bilgileri alınırken bir hata oluştu.");
            }
        };
        fetchAuthor();
    }, [id]);

    const handleChange = (e) => {
        setAuthor({ ...author, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!author.name || !author.birthDate || !author.country) {
            toast.error("Lütfen tüm alanları doldurun.");
            return;
        }

        try {
            const data = await getAuthorById(id);
            if (
                data.name === author.name &&
                data.birthDate === author.birthDate &&
                data.country === author.country
            ) {
                toast.info("Hiçbir değişiklik yapılmadı.");
                return;
            }


            const response = await updateAuthorById(id, author);
            if (response) {
                toast.success("Yazar başarıyla güncellendi!");
                navigate('/authors');
            } else {
                toast.error("Yazar güncellenirken bir hata oluştu.");
            }
        } catch (err) {
            console.error("Update Error:", err);
            toast.error("Yazar güncellenirken bir hata oluştu.");
        }
    };

    return (
        <form className='form' onSubmit={handleSubmit}>
            <div>
                <label>Ad:</label>
                <input
                    type="text"
                    name="name"
                    value={author.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Doğum Tarihi:</label>
                <input
                    type="date"
                    name="birthDate"
                    value={author.birthDate}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Ülke:</label>
                <input
                    type="text"
                    name="country"
                    value={author.country}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Güncelle</button>
        </form>
    );
};

export default UpdateAuthorForm;
