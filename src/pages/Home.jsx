import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBlog, FaUser, FaFolder } from 'react-icons/fa';
import './Home.css';

const Home = () => {
    const [counts, setCounts] = useState({
        blogs: 0,
        authors: 0,
        categories: 0,
    });

    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const [blogsRes, authorsRes, categoriesRes] = await Promise.all([
                    fetch('/api/blogs'),
                    fetch('/api/authors'),
                    fetch('/api/categories'),
                ]);

                const [blogs, authors, categories] = await Promise.all([
                    blogsRes.json(),
                    authorsRes.json(),
                    categoriesRes.json(),
                ]);

                setCounts({
                    blogs: blogs.length,
                    authors: authors.length,
                    categories: categories.length,
                });
            } catch (error) {
                console.error('Failed to fetch counts:', error);
            }
        };

        fetchCounts();
    }, []);

    return (
        <div className="admin-container">



            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <h2>Admin Panel</h2>
                <nav>
                    <ul>
                        <li><Link to="/blogs" onClick={() => setSidebarOpen(false)}>Blogs</Link></li>
                        <li><Link to="/authors" onClick={() => setSidebarOpen(false)}>Authors</Link></li>
                        <li><Link to="/categories" onClick={() => setSidebarOpen(false)}>Categories</Link></li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            
            <main className="dashboard container py-4">
                <header className="dashboard-header mb-4">
                    <h1 className="mb-2">Welcome to the Admin Dashboard</h1>
                    <p className="text-muted fs-5">Manage your blogs, authors, and categories efficiently.</p>
                </header>

                <div className="row g-4">
                    <div className="col-12 col-md-4">
                        <Link to="/blogs" className="card h-100 text-decoration-none text-dark shadow-sm hover-shadow">
                            <div className="card-body d-flex align-items-center gap-3">
                                <div className="card-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
                                    <FaBlog size={30} />
                                </div>
                                <div className="card-info">
                                    <h2 className="h5 mb-1">Blogs</h2>
                                    <p className="mb-0 text-secondary">{counts.blogs} Total</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-12 col-md-4">
                        <Link to="/authors" className="card h-100 text-decoration-none text-dark shadow-sm hover-shadow">
                            <div className="card-body d-flex align-items-center gap-2">
                                <div className="card-icon bg-success text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
                                    <FaUser size={30} />
                                </div>
                                <div className="card-info">
                                    <h2 className="h5 mb-1">Authors</h2>
                                    <p className="mb-0 text-secondary">{counts.authors} Total</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-12 col-md-4">
                        <Link to="/categories" className="card h-100 text-decoration-none text-dark shadow-sm hover-shadow">
                            <div className="card-body d-flex align-items-center gap-3">
                                <div className="card-icon bg-warning text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
                                    <FaFolder size={30} />
                                </div>
                                <div className="card-info">
                                    <h2 className="h5 mb-1">Categories</h2>
                                    <p className="mb-0 text-secondary">{counts.categories} Total</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
