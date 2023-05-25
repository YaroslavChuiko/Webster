import { Route, Routes } from 'react-router-dom';
import Studio from './pages/Studio/Studio';
import SignIn from '~/pages/Auth/SignIn';
import SignUp from '~/pages/Auth/SignUp';
import EmailConfirm from '~/pages/Auth/EmailConfirm';
import AuthLayout from './pages/Auth/AuthLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Studio />} />
      <Route element={<AuthLayout />}>
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/verify-email" element={<EmailConfirm />} />
      </Route>
    </Routes>
  );
}

export default App;
