import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import ProtectedRoutes from './routes/ProtectedRoutes';
import PublicRoutes from './routes/PublicRoutes';

function App() {
  return (
    <>
      <BrowserRouter>
      <Toaster />
        <Routes>
          <Route path='/' element={<ProtectedRoutes />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/login" element={<PublicRoutes />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/register" element={<PublicRoutes />}>
            <Route index element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
