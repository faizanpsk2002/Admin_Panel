import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AuthorForm.css';

const AuthorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState({
    photo: '',
    username: '',
    fullName: '',
    bio: '',
    email: ''
  });

  useEffect(() => {
    if(id){
      // Fetch author data by ID from API (example here static)
      setAuthor({
        photo: 'https://via.placeholder.com/150',
        username: 'john123',
        fullName: 'John Doe',
        bio: 'This is John Doe bio',
        email: 'john@example.com'
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(id){
      alert('Author updated successfully!');
    } else {
      alert('Author added successfully!');
    }
    navigate('/authors');
  };

  return (
    <div className="author-form-container">
      <h1>{id ? 'Edit Author' : 'Add New Author'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Photo URL</label>
          <input type="text" name="photo" value={author.photo} onChange={handleChange} />
        </div>
        <div>
          <label>Username</label>
          <input type="text" name="username" value={author.username} onChange={handleChange} />
        </div>
        <div>
          <label>Full Name</label>
          <input type="text" name="fullName" value={author.fullName} onChange={handleChange} />
        </div>
        <div>
          <label>Bio</label>
          <textarea name="bio" value={author.bio} onChange={handleChange}></textarea>
        </div>
        <div>
          <label>Email</label>
          <input type="text" name="email" value={author.email} onChange={handleChange} />
        </div>
        <button type="submit">{id ? 'Update Author' : 'Add Author'}</button>
      </form>
    </div>
  );
};

export default AuthorForm;
