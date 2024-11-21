import { Link } from "react-router-dom";
import './Navbar.styles.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-list-item">
                    <Link to="/" className="nav-link">Ana Sayfa</Link>
                </li>
                <li className="nav-list-item">
                    <Link to="/publishers" className="nav-link">Yayınevleri</Link>
                </li>
                <li className="nav-list-item">
                    <Link to="/categories" className="nav-link">Kategoriler</Link>
                </li>
                <li className="nav-list-item">
                    <Link to="/authors" className="nav-link">Yazarlar</Link>
                </li>
                <li className="nav-list-item">
                    <Link to="/books" className="nav-link">Kitaplar</Link>
                </li>
                <li className="nav-list-item">
                    <Link to="/borrows" className="nav-link">Ödünç Alma</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
