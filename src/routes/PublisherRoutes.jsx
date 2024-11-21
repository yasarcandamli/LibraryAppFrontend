import { Route, Routes } from 'react-router-dom';
import PublisherList from '../components/publishers/PublisherList';
import PublisherDetail from '../components/publishers/PublisherDetail';
import CreatePublisherForm from '../components/publishers/CreatePublisherForm';
import UpdatePublisherForm from '../components/publishers/UpdatePublisherForm';

const PublisherRoutes = () => (
    <Routes>
        <Route path="/" element={<PublisherList />} />
        <Route path="/new" element={<CreatePublisherForm />} />
        <Route path="/:id" element={<PublisherDetail />} />
        <Route path="/:id/edit" element={<UpdatePublisherForm />} />
    </Routes>
);

export default PublisherRoutes;