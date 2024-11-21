import { Route, Routes } from 'react-router-dom';
import CategoryList from '../components/categories/CategoryList';
import CategoryDetail from '../components/categories/CategoryDetail';
import CreateCategoryForm from '../components/categories/CreateCategoryForm';
import UpdateCategoryForm from '../components/categories/UpdateCategoryForm';

const PublisherRoutes = () => (
    <Routes>
        <Route path="/" element={<CategoryList />} />
        <Route path="/new" element={<CreateCategoryForm />} />
        <Route path="/:id" element={<CategoryDetail />} />
        <Route path="/:id/edit" element={<UpdateCategoryForm />} />
    </Routes>
);

export default PublisherRoutes;