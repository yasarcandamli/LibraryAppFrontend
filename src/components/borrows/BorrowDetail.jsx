import { useContext, useEffect } from "react";
import { BorrowContext } from "../../context/BorrowContext";
import { useParams } from "react-router-dom";
import { getBorrowById } from "../../services/BorrowService";
import { toast } from "react-toastify";

const BorrowDetail = () => {
    const { id } = useParams();
    const { borrow, updateBorrow } = useContext(BorrowContext);

    // UseEffect hook to get borrow information from API
    useEffect(() => {
        const fetchBorrow = async () => {
            try {
                const data = await getBorrowById(id); // Pull borrow information via API
                updateBorrow(data);
            } catch (error) {
                toast.error("Ödünç alma bilgileri alınamadı:", error);
            }
        };
        fetchBorrow(); // API call
    }, [id, updateBorrow]);

    return (
        <div className="detail">
            <h2>Ödünç Alma Detayları</h2>
            <div>
                <p><strong>Ödünç Alan:</strong> {borrow.borrowerName}</p>
                <p><strong>Mail Adresi:</strong> {borrow.borrowerMail}</p>
                <p><strong>Ödünç Tarihi:</strong> {borrow.borrowingDate}</p>
                <p><strong>İade Tarihi:</strong> {borrow.returnDate}</p>
                <p><strong>Kitap:</strong> {borrow.book?.name}</p>
            </div>
        </div>
    );
};

export default BorrowDetail;
