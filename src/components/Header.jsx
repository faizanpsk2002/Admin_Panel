import React, { useState } from 'react';
import './Header.css';
import { FaBars } from 'react-icons/fa';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const Header = ({ onToggleSidebar }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchTerm}`); // Replace with actual search logic
  };

  return (
    <header className="admin-header d-flex flex-wrap justify-content-between align-items-center p-3 bg-black text-white">
      <div className="admin-header-left d-flex align-items-center gap-2">
        {/* Hamburger only visible on mobile */}
        <div
          className="mobile-hamburger d-md-none"
          onClick={onToggleSidebar}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onToggleSidebar()}
          aria-label="Toggle sidebar"
        >
          <FaBars size={22} />
        </div>
        <h1 className="site-title mb-0">Admin</h1>
      </div>

      {/* Search bar */}
      <form
        className="header-search d-flex align-items-center mx-3 flex-grow-1 flex-md-grow-0"
        onSubmit={handleSearchSubmit}
        style={{ maxWidth: '400px' }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          aria-label="Search"
        />
        <button type="submit" className="btn btn-success ms-2">
          Go
        </button>
      </form>

      <div className="admin-header-right d-flex align-items-center gap-2 mt-2 mt-md-0">
        <button type="button" className="btn btn-outline-primary me-3 d-flex align-items-center gap-2 px-4 py-2 fw-semibold shadow-sm" style={{ borderRadius: '30px', transition: 'all 0.3s ease' }}>
          <FaSignInAlt />
          Login
        </button>

        <button type="button" className="btn btn-danger d-flex align-items-center gap-2 px-4 py-2 fw-semibold shadow-sm" style={{ borderRadius: '30px', transition: 'all 0.3s ease' }}>
          <FaSignOutAlt />
          Logout
        </button>

      </div>
    </header>
  );
};

export default Header;
