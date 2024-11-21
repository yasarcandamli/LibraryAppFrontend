import { Route, Routes } from 'react-router-dom';
import AuthorList from '../components/authors/AuthorList';
import AuthorDetail from '../components/authors/AuthorDetail';
import CreateAuthorForm from '../components/authors/CreateAuthorForm';
import UpdateAuthorForm from '../components/authors/UpdateAuthorForm';

const AuthorRoutes = () => (
    <Routes>
        <Route path="/" element={<AuthorList />} />
        <Route path="/new" element={<CreateAuthorForm />} />
        <Route path="/:id" element={<AuthorDetail />} />
        <Route path="/:id/edit" element={<UpdateAuthorForm />} />
    </Routes>
);

export default AuthorRoutes;