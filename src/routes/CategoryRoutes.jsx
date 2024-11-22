import { Route, Routes } from 'react-router-dom';
import CategoryList from '../components/categories/CategoryList';
import CategoryDetail from '../components/categories/CategoryDetail';
import CreateCategoryForm from '../components/categories/CreateCategoryForm';
import UpdateCategoryForm from '../components/categories/UpdateCategoryForm';

// Defines the routes for managing categories, including listing, creating, viewing, and updating categories
const PublisherRoutes = () => (
    <Routes>
        <Route path="/" element={<CategoryList />} />
        <Route path="/new" element={<CreateCategoryForm />} />
        <Route path="/:id" element={<CategoryDetail />} />
        <Route path="/:id/edit" element={<UpdateCategoryForm />} />
    </Routes>
);

export default PublisherRoutes;