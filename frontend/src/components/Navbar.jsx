import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  localStorage.removeItem('user');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Kidney Compass
      </Link>

      <div className="nav-links">
        <Link to="/resources">Trusted Resources</Link>

        <Link to="/topics">Learning Library</Link>

        {token && (
          <>
            <Link to="/questions">My Questions</Link>

            <button
              onClick={handleLogout}
              className="nav-button"
            >
              Sign Out
            </button>
          </>
        )}

        {!token && (
          <>
            <Link to="/login">Login</Link>

            <Link to="/signup" className="nav-button">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;