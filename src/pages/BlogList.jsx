import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogList.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
        setBlogs(blogs.filter(blog => blog.id !== id));
      } catch (error) {
        console.error('Failed to delete blog:', error);
      }
    }
  };

  return (
  <div className="blog-list-container">
    <h1>Blog Management</h1>
    <button onClick={() => navigate('/blogs/new')}>Add New Blog</button>
    <table className="blog-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>Post Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
  {blogs.length === 0 ? (
    <tr>
      <td colSpan="6">No blogs found.</td>
    </tr>
  ) : (
    blogs.map(blog => (
      <tr key={blog.id}>
        <td data-label="ID">{blog.id}</td>
        <td data-label="Title">{blog.title}</td>
        <td data-label="Author">{blog.author?.fullName || blog.author || 'N/A'}</td>
        <td data-label="Category">{blog.category?.title || blog.category || 'N/A'}</td>
        <td data-label="Post Date">{new Date(blog.postDate).toLocaleDateString()}</td>
        <td data-label="Actions" className="action-buttons">
          <button onClick={() => navigate(`/blogs/view/${blog.id}`)}>View</button>
          <button onClick={() => navigate(`/blogs/edit/${blog.id}`)}>Edit</button>
          <button onClick={() => handleDelete(blog.id)}>Delete</button>
        </td>
      </tr>
    ))
  )}
</tbody>

    </table>
  </div>
);

};

export default BlogList;
