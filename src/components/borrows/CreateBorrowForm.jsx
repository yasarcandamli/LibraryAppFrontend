import { useState, useEffect } from "react";
import { createBorrow } from "../../services/BorrowService";
import { getBooks } from "../../services/BookService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateBorrowForm = () => {
    const [borrowerName, setBorrowerName] = useState("");
    const [borrowerMail, setBorrowerMail] = useState("");
    const [borrowingDate, setBorrowingDate] = useState("");
    const [bookId, setBookId] = useState("");

    const [books, setBooks] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // UseEffect hook to get book data
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const booksData = await getBooks();
                setBooks(booksData);
            } catch (error) {
                console.error("Ödünç alma verileri yüklenirken bir hata oluştu", error);
                toast.error("Ödünç alma verileri yüklenemedi.");
            }
        };
        fetchBooks();
    }, []);

    // handleSubmit function triggered when the form is submitted
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Checks if the required fields are filled
        if (!borrowerName || !borrowerMail || !borrowingDate || !bookId) {
            setError("Lütfen tüm alanları doldurun.");
            toast.error("Lütfen tüm alanları doldurun.");
            return;
        }

        try {
            const newBorrow = {
                borrowerName,
                borrowerMail,
                borrowingDate,
                bookForBorrowingRequest: { id: parseInt(bookId) },
            };

            const response = await createBorrow(newBorrow); // API call to add a borrow
            if (response) {
                toast.success("Ödünç alma işlemi başarılı!");
                navigate("/borrows");
            } else {
                toast.error("Ödünç alma işlemi yapılırken bir sorun oluştu.");
            }
        } catch (err) {
            console.error("Create Error:", err);
            setError("Ödünç alma işlemi sırasında bir hata oluştu.");
            toast.error("Ödünç alma işlemi sırasında bir hata oluştu.");
        }
    };

    return (
        <div>
            <h2>Yeni Ödünç Alma İşlemi</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form className="form" onSubmit={handleSubmit}>
                <div>
                    <label>Ad:</label>
                    <input
                        type="text"
                        value={borrowerName}
                        onChange={(e) => setBorrowerName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={borrowerMail}
                        onChange={(e) => setBorrowerMail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Ödünç Alma Tarihi:</label>
                    <input
                        type="date"
                        value={borrowingDate}
                        onChange={(e) => setBorrowingDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>Kitap:</label>
                    <select
                        value={bookId}
                        onChange={(e) => setBookId(e.target.value)}
                    >
                        <option value="">Bir kitap seçin</option>
                        {books.map((book) => (
                            <option key={book.id} value={book.id}>
                                {book.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Ekle</button>
            </form>
        </div>
    );
};

export default CreateBorrowForm;
