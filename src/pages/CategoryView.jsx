import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CategoryView.css';

const CategoryView = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetchCategory();
  }, );

  const fetchCategory = async () => {
    try {
      const res = await fetch(`/api/categories/${id}`);
      const data = await res.json();
      setCategory(data);
    } catch (err) {
      console.error('Failed to fetch category', err);
    }
  };

  if (!category) return <p>Loading...</p>;

  return (
    <div className="category-view">
      <h1>Category Details</h1>
      <img
        src={category.image}
        alt={category.title}
        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
      />
      <h2>{category.title}</h2>
      <p>{category.shortDescription}</p>
      <Link to="/categories">Back to List</Link>
    </div>
  );
};

export default CategoryView;
