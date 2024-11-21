import { Route, Routes } from 'react-router-dom';
import BorrowList from '../components/borrows/BorrowList';
import BorrowDetail from '../components/borrows/BorrowDetail';
import CreateBorrowForm from '../components/borrows/CreateBorrowForm';
import UpdateBorrowForm from '../components/borrows/UpdateBorrowForm';

const BorrowRoutes = () => (
    <Routes>
        <Route path="/" element={<BorrowList />} />
        <Route path="/new" element={<CreateBorrowForm />} />
        <Route path="/:id" element={<BorrowDetail />} />
        <Route path="/:id/edit" element={<UpdateBorrowForm />} />
    </Routes>
);

export default BorrowRoutes;