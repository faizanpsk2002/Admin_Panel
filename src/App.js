import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogForm from './pages/BlogForm';
import BlogView from './pages/BlogView';
import CategoryList from './pages/CategoryList';
import CategoryView from './pages/CategoryView';
import CategoryForm from './pages/CategoryForm';
import AuthorForm from './pages/AuthorForm';
import AuthorList from './pages/AuthorList';
import AuthorView from './pages/AuthorView';
import Footer from './components/Footer';
import './App.css'; // global layout CSS
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blogs/new" element={<BlogForm />} />
            <Route path="/blogs/edit/:id" element={<BlogForm />} />
            <Route path="/blogs/view/:id" element={<BlogView />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/categories/view/:id" element={<CategoryView />} />
            <Route path="/categories/edit/:id" element={<CategoryForm />} />
            <Route path="/categories/new" element={<CategoryForm />} />

            <Route path="/authors" element={<AuthorList />} />
            <Route path="/authors/view/:id" element={<AuthorView />} />
            <Route path="/authors/new" element={<AuthorForm />} />
            <Route path="/authors/edit/:id" element={<AuthorForm />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
