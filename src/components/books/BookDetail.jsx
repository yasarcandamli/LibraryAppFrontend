import { useContext, useEffect } from "react";
import { BookContext } from "../../context/BookContext";
import { useParams } from "react-router-dom";
import { getBookById } from "../../services/BookService";
import { toast } from "react-toastify";

// DEĞERLENDİRME 8
const BookDetail = () => {
    const { id } = useParams();
    const { book, updateBook } = useContext(BookContext);

    // UseEffect hook to get book information from API
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const data = await getBookById(id); // Pull book information via API
                updateBook(data);
            } catch (error) {
                toast.error("Kitap bilgileri alınamadı:", error);
            }
        };
        fetchBook(); // API call
    }, [id, updateBook]);

    return (
        <div className="detail">
            <h2>Kitap Detayları</h2>
            <div>
                <p><strong>Kitap Adı:</strong> {book.name}</p>
                <p><strong>Yayın Yılı:</strong> {book.publicationYear}</p>
                <p><strong>Stok:</strong> {book.stock}</p>
                <p><strong>Yazar:</strong> {book.author?.name} ({book.author?.country})</p>
                <p><strong>Yayınevi:</strong> {book.publisher?.name} ({book.publisher?.address})</p>
                <p><strong>Kategori:</strong></p>
                <ul>
                    {book.categories?.map((category) => (
                        <li key={category.id}>{category.name} - {category.description}</li>
                    ))}
                </ul>

            </div>
        </div>
    );
};

export default BookDetail;
