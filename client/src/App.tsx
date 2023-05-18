import { Route, Routes } from 'react-router-dom';
import Studio from './pages/Studio/Studio';
import SignIn from '~/pages/Auth/SignIn';
import SignUp from '~/pages/Auth/SignUp';
import EmailConfirm from '~/pages/Auth/EmailConfirm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Studio />} />
      <Route path="/home" element={<div>HOME</div>} />
      <Route path="/auth/sign-in" element={<SignIn />} />
      <Route path="/auth/sign-up" element={<SignUp />} />
      <Route path="/auth/verify-email" element={<EmailConfirm />} />
    </Routes>
  );
}

export default App;
