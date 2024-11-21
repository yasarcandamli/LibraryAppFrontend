import { useContext, useEffect } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { useParams } from "react-router-dom";
import { getCategoryById } from "../../services/CategoryService";

const CategoryDetail = () => {
    const { id } = useParams();
    const { category, updateCategory } = useContext(CategoryContext);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const data = await getCategoryById(id);
                updateCategory(data);
            } catch (error) {
                toast.error("Kategori bilgileri alınamadı:", error);
            }
        };
        fetchCategory();
    }, [id, updateCategory]);

    return (
        <div className="detail">
            <h2>Kategori Detayları</h2>
            {category && (
                <div>
                    <p><strong>Ad:</strong> {category.name}</p>
                    <p><strong>Açıklama:</strong> {category.description}</p>
                </div>
            )}
        </div>
    );
};

export default CategoryDetail;
