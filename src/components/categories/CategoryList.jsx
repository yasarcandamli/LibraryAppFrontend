import { useContext, useEffect } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { useNavigate } from "react-router-dom";
import { getCategories, deleteCategoryById } from "../../services/CategoryService";
import { toast } from 'react-toastify';

const CategoryList = () => {
    const { categories, updateCategories, removeCategoryById } = useContext(CategoryContext);
    const navigate = useNavigate();

    // With useEffect, we get the categories from the API when the component is loaded.
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                if (response) {
                    updateCategories(response);
                } else {
                    toast.error("Kategori listesi alınamadı.");
                }
            } catch (error) {
                console.error("Fetch Error:", error);
                toast.error("Kategori listesi alınırken bir hata oluştu..");
            }
        };

        fetchCategories();
    }, [updateCategories]);

    // Deleting the category
    const handleDelete = async (id) => {
        try {
            const isDeleted = await deleteCategoryById(id);
            if (isDeleted) {
                removeCategoryById(id);
                toast.success("Kategori başarıyla silindi!");
            } else {
                toast.error("Silme işlemi başarısız oldu!");
            }
        } catch (error) {
            console.log("Delete Error:", error);
            toast.error("Silme işlemi sırasında bir hata oluştu.");
        }

    };

    // Go to the category's edit page
    const handleEdit = (id) => {
        navigate(`/categories/${id}/edit`);
    };

    // Go to the category's detail page
    const handleDetail = (id) => {
        navigate(`/categories/${id}`);
    };

    return (
        <div className="list">
            <h1>Kategori Listesi</h1>
            <button onClick={() => navigate("/categories/new")}>Kategori Ekle</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Kategori Adı</th>
                        <th>Açıklama</th>
                        <th>Eylemler</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>
                                <button onClick={() => handleDetail(category.id)}>Detay</button>
                                <button onClick={() => handleEdit(category.id)}>Düzenle</button>
                                <button onClick={() => handleDelete(category.id)}>Sil</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;
