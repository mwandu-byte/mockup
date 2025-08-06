import { Routes, Route, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { DarkModeProvider } from './context/DarkModeContext';
import Lookup from './pages/LookUp';
import Login from './pages/Login';



function App() {
  return (
    <DarkModeProvider>
      <>


        <Routes>
          {/* Public route */}
          <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lookup" element={<Lookup />} />
        </Routes>
      </>
    </DarkModeProvider>
  );
}

export default App;
