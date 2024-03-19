import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import WithNavbar from '../layouts/WithNavbar';
import WithoutNavbar from '../layouts/WithoutNavbar';
import ProfilePage from './ProfilePage';
import LoginPage from './LoginPage';
import ProfessorsPage from './ProfessorsPage';
import DeadlinesPage from './DeadlinesPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<WithoutNavbar />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<WithNavbar />}>
          <Route index element={<Navigate to="/profile" />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/professors" element={<ProfessorsPage />} />
          <Route path="/deadlines" element={<DeadlinesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
