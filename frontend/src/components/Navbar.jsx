import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">Kidney Compass</Link>

      <div className="nav-links">
        <Link to="/topics">Learning Library</Link>
        <Link to="/questions">My Questions</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup" className="nav-button">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;