import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PublisherListProvider } from './context/PublisherContext';
import { CategoryListProvider } from './context/CategoryContext';
import { AuthorListProvider } from './context/AuthorContext';
import { BookListProvider } from './context/BookContext';
import { BorrowListProvider } from './context/BorrowContext';
import PublisherRoutes from './routes/PublisherRoutes';
import CategoryRoutes from './routes/CategoryRoutes';
import AuthorRoutes from './routes/AuthorRoutes';
import BookRoutes from './routes/BookRoutes';
import BorrowRoutes from './routes/BorrowRoutes';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

function App() {

  return (
    // DEĞERLENDİRME 5
    <Router>
      <ToastContainer />
      <div className="container">
        <Navbar />
        <PublisherListProvider>
          <CategoryListProvider>
            <AuthorListProvider>
              <BookListProvider>
                <BorrowListProvider>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/publishers/*" element={<PublisherRoutes />} />
                    <Route path="/categories/*" element={<CategoryRoutes />} />
                    <Route path="/authors/*" element={<AuthorRoutes />} />
                    <Route path="/books/*" element={<BookRoutes />} />
                    <Route path="/borrows/*" element={<BorrowRoutes />} />
                  </Routes>
                </BorrowListProvider>
              </BookListProvider>
            </AuthorListProvider>
          </CategoryListProvider>
        </PublisherListProvider>
      </div>
    </Router>
  );
}

export default App
