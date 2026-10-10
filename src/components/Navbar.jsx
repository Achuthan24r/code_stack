import { Link, NavLink } from "react-router-dom";

function Navbar({ cartCount, wishlistCount, orderCount }) {
  return (
    <header className="site-navbar">
      <div className="navbar-inner">

        <Link to="/" className="brand">
          <span className="brand-icon">✦</span>

          <span>
            <strong>LuxeCraft</strong>
            <small>ACCESSORIES</small>
          </span>
        </Link>

        <nav className="main-navigation">

          <NavLink to="/" className="nav-link">
            Home
          </NavLink>

          <NavLink to="/shop" className="nav-link">
            Shop
          </NavLink>

          <NavLink to="/collection" className="nav-link">
            Collection
          </NavLink>

          <NavLink to="/customize" className="nav-link">
            Customize
          </NavLink>

        </nav>

        <div className="navbar-actions">

          <Link to="/wishlist" className="nav-action">
            ♡
            {wishlistCount > 0 && (
              <span className="nav-badge">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/orders" className="nav-action">
            ◷
            {orderCount > 0 && (
              <span className="nav-badge">
                {orderCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="nav-action">
            🛒
            {cartCount > 0 && (
              <span className="nav-badge">
                {cartCount}
              </span>
            )}
          </Link>

        </div>

      </div>
    </header>
  );
}

export default Navbar;