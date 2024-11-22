import { useContext, useEffect } from "react";
import { AuthorContext } from "../../context/AuthorContext";
import { useParams } from "react-router-dom";
import { getAuthorById } from "../../services/AuthorService";

const AuthorDetail = () => {
    const { id } = useParams();
    const { author, updateAuthor } = useContext(AuthorContext);

    // UseEffect hook to get author information from API
    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const data = await getAuthorById(id); // Pull author information via API
                updateAuthor(data);
            } catch (error) {
                toast.error("Yazar bilgileri alınamadı:", error);
            }
        };
        fetchAuthor(); // API call
    }, [id, updateAuthor]);

    return (
        <div className="detail">
            <h2>Yazar Detayları</h2>
            {author && (
                <div>
                    <p><strong>Yazar Adı:</strong> {author.name}</p>
                    <p><strong>Doğum Tarihi:</strong> {author.birthDate}</p>
                    <p><strong>Ülke:</strong> {author.country}</p>
                </div>
            )}
        </div>
    );
};

export default AuthorDetail;
