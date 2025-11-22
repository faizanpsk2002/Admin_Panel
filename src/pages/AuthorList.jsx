import { Link } from 'react-router-dom';
import './AuthorList.css';

const AuthorList = () => {
  const authors = [
    { id: 1, username: 'john123', fullName: 'John Doe', email: 'john@example.com' },
    { id: 2, username: 'jane456', fullName: 'Jane Smith', email: 'jane@example.com' },
  ];

  return (
    <div className="author-list">
      <h1>Authors</h1>
      <Link to="/authors/new" className="btn">Add New Author</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map(author => (
            <tr key={author.id}>
              <td data-label="ID">{author.id}</td>
              <td data-label="Username">{author.username}</td>
              <td data-label="Full Name">{author.fullName}</td>
              <td data-label="Email">{author.email}</td>
              <td data-label="Actions" className="actions">
                <Link to={`/authors/view/${author.id}`}><button>View</button></Link>
                <Link to={`/authors/edit/${author.id}`}><button>Edit</button></Link>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuthorList;
