import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CategoryList.css';  // Make sure this import is here

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      setCategories(categories.filter(cat => cat.id !== id));
    } catch (err) {
      console.error('Failed to delete category', err);
    }
  };

  return (
    <div className="category-list">
      <h1>Category Management</h1>
      <Link to="/categories/new" className="btn">Add New Category</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>
                {cat.image && (
                  <img
                    src={cat.image}
                    alt={cat.title}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                )}
              </td>
              <td>{cat.title}</td>
              <td>
                <button onClick={() => navigate(`/categories/view/${cat.id}`)}>View</button>
                <button onClick={() => navigate(`/categories/edit/${cat.id}`)}>Edit</button>
                <button onClick={() => handleDelete(cat.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    
  );
};

export default CategoryList;
