import { Route, Routes } from 'react-router-dom';
import Studio from './pages/Studio/Studio';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Studio />} />
    </Routes>
  );
}

export default App;
