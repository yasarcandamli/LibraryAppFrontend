import { Link } from 'react-router-dom';
import './Home.styles.css';

const Home = () => {
    return (
        <div className="home">
            <h1 className="home-title">Library Management System'e Hoş Geldiniz</h1>
            <ul className="management-list">
                <li>
                    <Link to="/publishers" className="management-link">
                        📚 Yayınevleri
                    </Link>
                </li>
                <li>
                    <Link to="/categories" className="management-link">
                        🗂️ Kategoriler
                    </Link>
                </li>
                <li>
                    <Link to="/authors" className="management-link">
                        ✍️ Yazarlar
                    </Link>
                </li>
                <li>
                    <Link to="/books" className="management-link">
                        📖 Kitaplar
                    </Link>
                </li>
                <li>
                    <Link to="/borrows" className="management-link">
                        🛒 Ödünç Alma
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Home;
