import { useContext, useEffect } from "react";
import { BorrowContext } from "../../context/BorrowContext";
import { useNavigate } from "react-router-dom";
import { getBorrows, deleteBorrowById } from "../../services/BorrowService";
import { toast } from "react-toastify";

const BorrowList = () => {
    const { borrows, updateBorrows, removeBorrowById } = useContext(BorrowContext);
    const navigate = useNavigate();

    // With useEffect, we get the borrows from the API when the component is loaded.
    useEffect(() => {
        const fetchBorrows = async () => {
            try {
                const response = await getBorrows();
                if (response) {
                    updateBorrows(response);
                } else {
                    toast.error("Ödünç alma listesi alınamadı.");
                }
            } catch (error) {
                console.error("Fetch Error:", error);
                toast.error("Ödünç alma listesi alınırken bir hata oluştu.");
            }
        };

        fetchBorrows();
    }, [updateBorrows]);

    // Deleting the borrow
    const handleDelete = async (id) => {
        try {
            const isDeleted = await deleteBorrowById(id);
            if (isDeleted) {
                removeBorrowById(id);
                toast.success("Ödünç alma kaydı başarıyla silindi!");
            } else {
                toast.error("Silme işlemi başarısız oldu!");
            }
        } catch (error) {
            console.error("Delete Error:", error);
            toast.error("Silme işlemi sırasında bir hata oluştu.");
        }
    };

    // Go to the borrow's edit page
    const handleEdit = (id) => {
        navigate(`/borrows/${id}/edit`);
    };

    // Go to the borrow's detail page
    const handleDetail = (id) => {
        navigate(`/borrows/${id}`);
    };

    return (
        <div className="list">
            <h1>Ödünç Alma Listesi</h1>
            <button onClick={() => navigate("/borrows/new")}>Ödünç Al</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ad - Soyad</th>
                        <th>Email</th>
                        <th>Ödünç Tarihi</th>
                        <th>İade Tarihi</th>
                        <th>Kitap Adı</th>
                        <th>Yazar</th>
                        <th>Yayınevi</th>
                        <th>Eylemler</th>
                    </tr>
                </thead>
                <tbody>
                    {borrows.map((borrow) => (
                        <tr key={borrow.id}>
                            <td>{borrow.id}</td>
                            <td>{borrow.borrowerName}</td>
                            <td>{borrow.borrowerMail}</td>
                            <td>{borrow.borrowingDate}</td>
                            <td>{borrow.returnDate}</td>
                            <td>{borrow.book.name}</td>
                            <td>{borrow.book.author.name}</td>
                            <td>{borrow.book.publisher.name}</td>
                            <td>
                                <button onClick={() => handleDetail(borrow.id)}>Detay</button>
                                <button onClick={() => handleEdit(borrow.id)}>Düzenle</button>
                                <button onClick={() => handleDelete(borrow.id)}>Sil</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BorrowList;
