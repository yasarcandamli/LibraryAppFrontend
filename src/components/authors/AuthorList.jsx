import { useContext, useEffect } from "react";
import { AuthorContext } from "../../context/AuthorContext";
import { useNavigate } from "react-router-dom";
import { getAuthors, deleteAuthorById } from "../../services/AuthorService";
import { toast } from 'react-toastify';

const AuthorList = () => {
    const { authors, updateAuthors, removeAuthorById } = useContext(AuthorContext);
    const navigate = useNavigate();

    // With useEffect, we get the authors from the API when the component is loaded.
    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await getAuthors();
                if (response) {
                    updateAuthors(response);
                } else {
                    toast.error("Yazar listesi alınamadı.");
                }
            } catch (error) {
                console.error("Fetch Error:", error);
                toast.error("Yazar listesi alınırken bir hata oluştu.");
            }
        };

        fetchAuthors();
    }, [updateAuthors]);

    // Deleting the author
    const handleDelete = async (id) => {
        try {
            const isDeleted = await deleteAuthorById(id);
            if (isDeleted) {
                removeAuthorById(id);
                toast.success("Yazar başarıyla silindi!");
            } else {
                toast.error("Silme işlemi başarısız oldu!");
            }
        } catch (error) {
            console.log("Delete Error:", error);
            toast.error("Silme işlemi sırasında bir hata oluştu.");
        }

    };

    // Go to the author's edit page
    const handleEdit = (id) => {
        navigate(`/authors/${id}/edit`);
    };

    // Go to the author's detail page
    const handleDetail = (id) => {
        navigate(`/authors/${id}`);
    };

    return (
        <div className="list">
            <h1>Yazar Listesi</h1>
            <button onClick={() => navigate("/authors/new")}>Yazar Ekle</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Yazar Adı</th>
                        <th>Doğum Tarihi</th>
                        <th>Ülke</th>
                        <th>Eylemler</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map((author) => (
                        <tr key={author.id}>
                            <td>{author.id}</td>
                            <td>{author.name}</td>
                            <td>{author.birthDate}</td>
                            <td>{author.country}</td>
                            <td>
                                <button onClick={() => handleDetail(author.id)}>Detay</button>
                                <button onClick={() => handleEdit(author.id)}>Düzenle</button>
                                <button onClick={() => handleDelete(author.id)}>Sil</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AuthorList;
