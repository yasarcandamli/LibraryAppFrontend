import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBorrowById, updateBorrowById } from "../../services/BorrowService";
import { toast } from "react-toastify";

const UpdateBorrowForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [borrow, setBorrow] = useState({
        borrowerName: "",
        borrowingDate: "",
        returnDate: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBorrowById(id);
                if (data) {
                    setBorrow({
                        borrowerName: data.borrowerName,
                        borrowingDate: data.borrowingDate,
                        returnDate: data.returnDate,
                    });
                } else {
                    toast.error("Ödünç alma verileri alınamadı.");
                }
            } catch (error) {
                console.error("Fetch Error:", error);
                toast.error("Ödünç alma verileri alınırken bir hata oluştu.");
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBorrow((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!borrow.borrowerName || !borrow.borrowingDate) {
            toast.error("Lütfen zorunlu alanları doldurun.");
            return;
        }

        try {
            const data = await getBorrowById(id);
            if (
                data.borrowerName === borrow.borrowerName &&
                data.borrowingDate === borrow.borrowingDate &&
                data.returnDate === borrow.returnDate
            ) {
                toast.info("Hiçbir değişiklik yapılmadı.");
                return;
            }

            const response = await updateBorrowById(id, borrow);
            if (response) {
                toast.success("Ödünç alma verileri başarıyla güncellendi!");
                navigate("/borrows");
            } else {
                toast.error("Ödünç alma verileri güncellenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Update Error:", error);
            toast.error("Ödünç alma verileri güncellenirken bir hata oluştu.");
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div>
                <label>Ad:</label>
                <input
                    type="text"
                    name="borrowerName"
                    value={borrow.borrowerName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Ödünç Tarihi:</label>
                <input
                    type="date"
                    name="borrowingDate"
                    value={borrow.borrowingDate}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>İade Tarihi:</label>
                <input
                    type="date"
                    name="returnDate"
                    value={borrow.returnDate || ""}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Güncelle</button>
        </form>
    );
};

export default UpdateBorrowForm;