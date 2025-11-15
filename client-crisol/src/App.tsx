import Register from './components/auth/Register';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import './App.css'
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import PrivateRoute from './components/auth/PrivateRoute';
import Blog from './pages/Blog';

function App() {
  return (
    <div>
      <Toaster />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/blogs" element={<PrivateRoute element={<Blog />} />} />
    </Routes>
    </div>
  )
}

export default App
