import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BlogView.css';

const BlogView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) throw new Error('Blog not found');
        const data = await res.json();
        setBlog(data);
      } catch (error) {
        alert('Failed to fetch blog: ' + error.message);
        navigate('/blogs');
      }
    };

    fetchBlog();
  }, [id, navigate]);

  if (!blog) return <div>Loading blog details...</div>;

return (
  <div className="blog-view-container">
    <h1>{blog.title}</h1>
    <img src={blog.image} alt={blog.title} />
    <p><strong>Description:</strong> {blog.description}</p>
    <p><strong>Post Date:</strong> {new Date(blog.postDate).toLocaleDateString()}</p>
    <p><strong>Author:</strong> {blog.author?.fullName || blog.author || 'N/A'}</p>
    <p><strong>Category:</strong> {blog.category?.title || blog.category || 'N/A'}</p>
    <p><strong>Tags:</strong> {(blog.tags || []).join(', ')}</p>

    <div className="blog-view-buttons">
      <button onClick={() => navigate('/blogs')}>Back to List</button>
      <button onClick={() => navigate(`/blogs/edit/${id}`)}>Edit</button>
    </div>
  </div>
);

};

export default BlogView;
