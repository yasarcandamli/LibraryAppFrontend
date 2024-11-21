import { Route, Routes } from 'react-router-dom';
import BookList from '../components/books/BookList';
import BookDetail from '../components/books/BookDetail';
import CreateBookForm from '../components/books/CreateBookForm';
import UpdateBookForm from '../components/books/UpdateBookForm';

const BookRoutes = () => (
    <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/new" element={<CreateBookForm />} />
        <Route path="/:id" element={<BookDetail />} />
        <Route path="/:id/edit" element={<UpdateBookForm />} />
    </Routes>
);

export default BookRoutes;