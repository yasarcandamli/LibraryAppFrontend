import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById, updateBookById } from '../../services/BookService';
import { getAuthors } from '../../services/AuthorService';
import { getPublishers } from '../../services/PublisherService';
import { getCategories } from '../../services/CategoryService';
import { toast } from 'react-toastify';

const UpdateBookForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState({
        name: '',
        publicationYear: '',
        stock: '',
        authorId: '',
        publisherId: '',
        categoryIds: [],
    });

    const [authors, setAuthors] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bookData, authorData, publisherData, categoryData] = await Promise.all([
                    getBookById(id),
                    getAuthors(),
                    getPublishers(),
                    getCategories(),
                ]);
                if ([bookData, authorData, publisherData, categoryData]) {
                    setBook({
                        ...bookData,
                        authorId: bookData.author.id,
                        publisherId: bookData.publisher.id,
                        categoryIds: bookData.categories.map((cat) => cat.id),
                    });
                    setAuthors(authorData);
                    setPublishers(publisherData);
                    setCategories(categoryData);
                } else {
                    toast.error("Kitap bilgileri alınamadı.");
                }
            } catch (error) {
                console.error("Fetch Error:", error);
                toast.error('Kitap verileri alınırken bir hata oluştu.');
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook((prev) => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (e) => {
        const categoryId = parseInt(e.target.value);
        setBook((prev) => {
            const isSelected = prev.categoryIds.includes(categoryId);
            const updatedCategories = isSelected
                ? prev.categoryIds.filter((id) => id !== categoryId)
                : [...prev.categoryIds, categoryId];

            const updatedCategoryObjects = categories.filter((category) =>
                updatedCategories.includes(category.id)
            );

            return {
                ...prev,
                categoryIds: updatedCategories,
                categories: updatedCategoryObjects,
            };
        });
    };

    const areCategoriesEqual = (categories1, categories2) => {
        const ids1 = categories1.map((cat) => cat.id).sort();
        const ids2 = categories2.map((cat) => cat.id).sort();
        return JSON.stringify(ids1) === JSON.stringify(ids2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!book.name || !book.publicationYear || !book.stock || !book.authorId || !book.publisherId || book.categoryIds.length === 0) {
            toast.error("Lütfen tüm alanları doldurun.");
            return;
        }

        try {
            const data = await getBookById(id);

            if (
                data.name === book.name &&
                data.publicationYear === book.publicationYear &&
                data.stock === book.stock &&
                data.author.id === book.authorId &&
                data.publisher.id === book.publisherId &&
                areCategoriesEqual(data.categories, book.categories)
            ) {
                toast.info("Hiçbir değişiklik yapılmadı.");
                return;
            }

            const response = await updateBookById(id, {
                ...book,
                categories: book.categories,
            });
            if (response) {
                toast.success("Kitap başarıyla güncellendi!");
                navigate('/books');
            } else {
                toast.error("Kitap güncellenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error('Kitap güncellenirken hata:', error);
            toast.error('Kitap güncellenirken bir hata oluştu.');
        }
    };

    return (
        <form className='form' onSubmit={handleSubmit}>
            <div>
                <label>Ad:</label>
                <input
                    type="text"
                    name="name"
                    value={book.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Yayın Yılı:</label>
                <input
                    type="number"
                    name="publicationYear"
                    value={book.publicationYear}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Stok:</label>
                <input
                    type="number"
                    name="stock"
                    value={book.stock}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Yazar:</label>
                <select
                    name="authorId"
                    value={book.authorId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Yazar Seç</option>
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
                    name="publisherId"
                    value={book.publisherId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Yayıncı Seç</option>
                    {publishers.map((publisher) => (
                        <option key={publisher.id} value={publisher.id}>
                            {publisher.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className='category-input'>
                <label>Kategoriler:</label>
                {categories.map((category) => (
                    <div className='category-checkbox' key={category.id}>
                        <input
                            type="checkbox"
                            value={category.id}
                            checked={book.categoryIds.includes(category.id)}
                            onChange={handleCategoryChange}
                        />
                        <label>{category.name}</label>
                    </div>
                ))}
            </div>
            <button type="submit">Güncelle</button>
        </form>
    );
};

export default UpdateBookForm;
