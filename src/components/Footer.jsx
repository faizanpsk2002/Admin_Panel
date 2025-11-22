import './Footer.css';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-3 mt-auto">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <p className="mb-2 mb-md-0">
          © {new Date().getFullYear()} My Admin Panel. All rights reserved.
        </p>

        <nav className="d-flex gap-3">
          <a href="/privacy" className="text-white text-decoration-none">Privacy Policy</a>
          <a href="/terms" className="text-white text-decoration-none">Terms of Service</a>
          <a href="/support" className="text-white text-decoration-none">Support</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

