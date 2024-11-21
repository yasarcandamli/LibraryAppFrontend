import { useContext, useEffect } from "react";
import { BookContext } from "../../context/BookContext";
import { useNavigate } from "react-router-dom";
import { getBooks, deleteBookById } from "../../services/BookService";
import { toast } from 'react-toastify';

const BookList = () => {
    const { books, updateBooks, removeBookById } = useContext(BookContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks();
                if (response) {
                    updateBooks(response);
                } else {
                    toast.error("Kitap listesi alınamadı.");
                }
            } catch (error) {
                console.error("Fetch Error:", error);
                toast.error("Kitap listesi alınırken bir hata oluştu.");
            }
        };

        fetchBooks();
    }, [updateBooks]);

    const handleDelete = async (id) => {
        try {
            const isDeleted = await deleteBookById(id);

            if (isDeleted) {
                removeBookById(id);
                toast.success("Kitap başarıyla silindi!");
            } else {
                toast.error("Silme işlemi başarısız oldu!");
            }
        } catch (error) {
            console.log("Delete Error:", error);
            toast.error("Silme işlemi sırasında bir hata oluştu.");
        }

    };

    const handleEdit = (id) => {
        navigate(`/books/${id}/edit`);
    };

    const handleDetail = (id) => {
        navigate(`/books/${id}`);
    };

    return (
        <div className="list">
            <h1>Kitap Listesi</h1>
            <button onClick={() => navigate("/books/new")}>Kitap Ekle</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Kitap Adı</th>
                        <th>Yayın Yılı</th>
                        <th>Stok</th>
                        <th>Yazar</th>
                        <th>Yayınevi</th>
                        <th>Kategori</th>
                        <th>Eylemler</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.name}</td>
                            <td>{book.publicationYear}</td>
                            <td>{book.stock}</td>
                            <td>{book.author.name}</td>
                            <td>{book.publisher.name}</td>
                            <td>{book.categories?.map((category) => (
                                <p key={category.id}>{category.name} </p>
                            ))}</td>
                            <td>
                                <button onClick={() => handleDetail(book.id)}>Detay</button>
                                <button onClick={() => handleEdit(book.id)}>Düzenle</button>
                                <button onClick={() => handleDelete(book.id)}>Sil</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookList;
