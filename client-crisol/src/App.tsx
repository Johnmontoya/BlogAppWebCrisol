import Register from './components/auth/Register';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import BlogId from './pages/Blog';
import { useAuthContext } from './components/auth/AuthProvider';
import Layout from './pages/admin/Layout';
import Dashboard from './pages/admin/Dashboard';
import BlogList from './components/blog/BlogList';
import Comments from './pages/admin/Comment';
import './App.css';
import AddBlog from './pages/admin/AddBlog';

function App() {
  const { isAuthenticated } = useAuthContext();
  
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/admin" /> : <Login />} />
        <Route path="/blog/:id" element={<BlogId />} />
        <Route 
          path="/admin" 
          element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}
        >
          <Route index element={<Dashboard />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path='listBlog' element={<BlogList />} />
          <Route path="comments" element={<Comments />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;