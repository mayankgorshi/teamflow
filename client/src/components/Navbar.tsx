import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div>
        <Link to="/">TeamFlow</Link>
      </div>

      <ul>
        <li>
          <Link to="/">Features</Link>
        </li>

        <li>
          <Link to="/">Pricing</Link>
        </li>

        <li>
          <Link to="/">About</Link>
        </li>
      </ul>

      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>

        <Link to="/register">
          <button>Sign Up</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;