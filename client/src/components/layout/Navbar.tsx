import { Link } from "react-router-dom";
import Button from "../common/Button";

function Navbar() {
  return (
    <nav className=" sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          TeamFlow
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-12">
          <ul className="flex items-center gap-8">
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

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Link to="/login">Login</Link>

            <Link to="/register">
              <Button text="Get Started" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;