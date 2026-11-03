import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingBag, X, Zap } from "lucide-react";

export default function Navbar({ cartCount, searchValue, setSearchValue }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function submitSearch(event) {
    event.preventDefault();
    navigate(`/products${searchValue.trim() ? `?search=${encodeURIComponent(searchValue.trim())}` : ""}`);
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="announcement">✨ Tech upgrades, made simple — welcome to Voltify</div>
      <nav className="navbar container">
        <Link to="/" className="brand" aria-label="Voltify home">
          <span className="brand-mark"><Zap size={20} fill="currentColor" /></span>
          <span>voltify<span className="brand-dot">.</span></span>
        </Link>

        <div className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/products" onClick={() => setMenuOpen(false)}>Shop</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
        </div>

        <form className="nav-search" onSubmit={submitSearch}>
          <Search size={17} />
          <input
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search gadgets..."
            aria-label="Search products"
          />
        </form>

        <div className="nav-actions">
          <Link className="cart-link" to="/cart" aria-label={`Shopping cart with ${cartCount} items`}>
            <ShoppingBag size={21} />
            <span>Cart</span>
            <b className="cart-count">{cartCount}</b>
          </Link>
          <button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
