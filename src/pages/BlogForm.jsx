import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BlogForm.css';

const BlogForm = () => {
  const { id } = useParams(); // id if editing
  const navigate = useNavigate();

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    title: '',
    description: '',
    image: '',
    postDate: '',
    author: '',
    tags: '',
    category: '',
  });

  // Load authors and categories for dropdowns
  useEffect(() => {
    const fetchAuthorsAndCategories = async () => {
      try {
        const [authorsRes, categoriesRes] = await Promise.all([
          fetch('/api/authors'),
          fetch('/api/categories'),
        ]);
        const authorsData = await authorsRes.json();
        const categoriesData = await categoriesRes.json();
        setAuthors(authorsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to fetch authors/categories', error);
      }
    };

    fetchAuthorsAndCategories();
  }, []);

  // If editing, load existing blog details
  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) throw new Error('Blog not found');
        const data = await res.json();

        setForm({
          title: data.title || '',
          description: data.description || '',
          image: data.image || '',
          postDate: data.postDate ? data.postDate.split('T')[0] : '',
          author: data.author?.id || data.author || '',
          tags: (data.tags || []).join(', '),
          category: data.category?.id || data.category || '',
        });
      } catch (error) {
        console.error('Failed to load blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  // Handle input changes
  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit form
  const handleSubmit = async e => {e.preventDefault();

    const payload = {
      title: form.title,
      description: form.description,
      image: form.image,
      postDate: form.postDate,
      author: authors.find(a => a.id.toString() === form.author)?.id || form.author,
      tags: form.tags.split(',').map(t => t.trim()).filter(t => t !== ''),
      category: categories.find(c => c.id.toString() === form.category)?.id || form.category,
    };

    try {
      let res;
      if (id) {
        res = await fetch(`/api/blogs/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error('Failed to save blog');

      alert('Blog saved successfully');
      navigate('/blogs');
    } catch (error) {
      alert('Error saving blog: ' + error.message);
    }
  };

  return (
   <div className="blog-form-container">
    <h1>{id ? 'Edit Blog' : 'Add New Blog'}</h1>
    <form onSubmit={handleSubmit}>

        <label>Title:</label><br />
        <input name="title" value={form.title} onChange={handleChange} required /><br /><br />

        <label>Description:</label><br />
        <textarea name="description" value={form.description} onChange={handleChange} required rows={5} /><br /><br />

        <label>Image URL:</label><br />
        <input name="image" value={form.image} onChange={handleChange} /><br /><br />

        <label>Post Date:</label><br />
        <input type="date" name="postDate" value={form.postDate} onChange={handleChange} required /><br /><br />

        <label>Author:</label><br />
        <select name="author" value={form.author} onChange={handleChange} required>
          <option value="">-- Select Author --</option>
          {authors.map(author => (
            <option key={author.id} value={author.id}>
              {author.fullName || author.username}
            </option>
          ))}
        </select><br /><br />

        <label>Tags (comma separated):</label><br />
        <input name="tags" value={form.tags} onChange={handleChange} /><br /><br />

        <label>Category:</label><br />
        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">-- Select Category --</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select><br /><br />

       <div className="form-buttons">
  <button type="submit">Save Blog</button>
  <button type="button" onClick={() => navigate('/blogs')}>
    Cancel
  </button>
</div>

      </form>
    </div>
  );
};

export default BlogForm;
