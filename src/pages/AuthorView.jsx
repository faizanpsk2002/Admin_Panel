import { useParams, Link } from 'react-router-dom';
import './AuthorView.css';

const AuthorView = () => {
  const { id } = useParams();
  const author = {
    id,
    photo: 'https://via.placeholder.com/150',
    username: 'john123',
    fullName: 'John Doe',
    bio: 'This is John Doe bio',
    email: 'john@example.com'
  };

  return (
    <div className="author-view">
      <h1>{author.fullName}</h1>
      <img src={author.photo} alt={author.fullName} />
      <h2>Username: {author.username}</h2>
      <p>{author.bio}</p>
      <p>Email: {author.email}</p>
      <Link to="/authors"><button>Back to List</button></Link>
    </div>
  );
};

export default AuthorView;
