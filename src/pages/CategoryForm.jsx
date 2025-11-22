import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CategoryForm.css';

const CategoryForm = () => {
    const { id } = useParams(); // if id exists => edit mode, else create mode
    const navigate = useNavigate();

    const [form, setForm] = useState({
        image: '',
        title: '',
        shortDescription: '',
    });

    useEffect(() => {
        if (id) {
            fetchCategory();
        }
    }, );

    const fetchCategory = async () => {
        try {
            const res = await fetch(`/api/categories/${id}`);
            const data = await res.json();
            setForm({
                image: data.image,
                title: data.title,
                shortDescription: data.shortDescription,
            });
        } catch (err) {
            console.error('Failed to fetch category', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = id ? 'PUT' : 'POST';
            const url = id ? `/api/categories/${id}` : '/api/categories';

            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            navigate('/categories');
        } catch (err) {
            console.error('Failed to save category', err);
        }
    };

    return (
  <div className="category-form-container">
    <h1>{id ? 'Edit' : 'Add New'} Category</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Enter image URL"
          required
        />
      </div>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter title"
          required
        />
      </div>
      <div>
        <label>Short Description:</label>
        <textarea
          name="shortDescription"
          value={form.shortDescription}
          onChange={handleChange}
          placeholder="Enter short description"
          required
        />
      </div>
      <button type="submit">{id ? 'Update' : 'Create'}</button>
    </form>
  </div>
);
};

export default CategoryForm;
