import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin, Phone, Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-about">
          <Link to="/" className="brand footer-brand">
            <span className="brand-mark"><Zap size={20} fill="currentColor" /></span>
            <span>voltify<span className="brand-dot">.</span></span>
          </Link>
          <p>Good tech. Great days. Discover everyday electronics designed to keep you connected and inspired.</p>
          <div className="social-row"><span><Instagram size={17} /></span><span><Mail size={17} /></span></div>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/products">All products</Link>
          <Link to="/products?category=Audio">Audio</Link>
          <Link to="/products?category=Computers">Computers</Link>
          <Link to="/about">Our story</Link>
        </div>
        <div>
          <h4>Help</h4>
          <Link to="/contact">Contact us</Link>
          <Link to="/cart">Shopping cart</Link>
          <span>Shipping information</span>
          <span>Returns policy</span>
        </div>
        <div>
          <h4>Get in touch</h4>
          <p className="footer-contact"><Mail size={16} /> hello@voltify.example</p>
          <p className="footer-contact"><Phone size={16} /> +92 300 1234567</p>
          <p className="footer-contact"><MapPin size={16} /> Pakistan</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Voltify. Student project demo.</span>
        <span>Built with React <span className="heart">♥</span></span>
      </div>
    </footer>
  );
}
