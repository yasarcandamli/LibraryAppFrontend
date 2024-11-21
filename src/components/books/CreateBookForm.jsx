import { useState, useEffect } from "react";
import { createBook } from "../../services/BookService";
import { getAuthors } from "../../services/AuthorService";
import { getPublishers } from "../../services/publisherService";
import { getCategories } from "../../services/CategoryService";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const CreateBookForm = () => {
    const [name, setName] = useState("");
    const [publicationYear, setPublicationYear] = useState("");
    const [stock, setStock] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [publisherId, setPublisherId] = useState("");
    const [categoryIds, setCategoryIds] = useState([]);

    const [authors, setAuthors] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setAuthors(await getAuthors());
                setPublishers(await getPublishers());
                setCategories(await getCategories());
            } catch (error) {
                console.error("Kitap verileri yüklenirken bir hata oluştu", error);
                toast.error("Kitap verileri yüklenemedi.");
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !publicationYear || !stock || !authorId || !publisherId || categoryIds.length === 0) {
            setError("Lütfen tüm alanları doldurun.");
            toast.error("Lütfen tüm alanları doldurun.");
            return;
        }

        try {
            const newBook = {
                name,
                publicationYear: parseInt(publicationYear),
                stock: parseInt(stock),
                author: { id: parseInt(authorId) },
                publisher: { id: parseInt(publisherId) },
                categories: categoryIds.map(id => ({ id: parseInt(id) }))
            };
            const response = await createBook(newBook);
            if (response) {
                toast.success("Kitap başarıyla eklendi!");
                navigate("/books");
            } else {
                toast.error("Yayınevi eklenirken bir sorun oluştu.");
            }
        } catch (err) {
            console.error("Create Error:", err);
            setError("Kitap eklenirken bir hata oluştu.");
            toast.error("Kitap eklenirken bir hata oluştu.");
        }
    };

    return (
        <div>
            <h2>Yeni Kitap Ekle</h2>
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
                    <label>Yayın Yılı:</label>
                    <input
                        type="number"
                        value={publicationYear}
                        onChange={(e) => setPublicationYear(e.target.value)}
                    />
                </div>
                <div>
                    <label>Stok:</label>
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                </div>
                <div>
                    <label>Yazar:</label>
                    <select
                        type="text"
                        value={authorId}
                        onChange={(e) => setAuthorId(e.target.value)}
                    >
                        <option value="">Bir yazar seçin</option>
                        {authors.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Yayıncı:</label>
                    <select
                        value={publisherId}
                        onChange={(e) => setPublisherId(e.target.value)}
                    >
                        <option value="">Bir yayınevi seçin</option>
                        {publishers.map((publisher) => (
                            <option key={publisher.id} value={publisher.id}>
                                {publisher.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Kategori:</label>
                    {categories.map((category) => (
                        <div key={category.id}>
                            <input
                                type="checkbox"
                                value={category.id}
                                onChange={(e) => {
                                    const checked = e.target.checked;
                                    setCategoryIds((prev) =>
                                        checked
                                            ? [...prev, category.id]
                                            : prev.filter((id) => id !== category.id)
                                    );
                                }}
                            />
                            {category.name}
                        </div>
                    ))}
                </div>
                <button type="submit">Ekle</button>
            </form>
        </div>
    );
};

export default CreateBookForm;
