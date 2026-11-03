import { useEffect, useMemo, useState } from "react";
import { Routes, Route, useLocation, useNavigate, Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Headphones, Laptop, ShieldCheck, Truck, RotateCcw, Search, ShoppingBag, Plus, Minus, Trash2, Star, Zap, Mail, MessageCircle, Send, CircleCheck, PackageCheck } from "lucide-react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProductCard from "./components/ProductCard.jsx";
import { products, categories } from "./data/products.js";
import { formatPrice } from "./utils.js";

function useScrollTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
}

function Home({ onAdd, searchValue }) {
  const featured = products.slice(0, 4);
  const popular = products.slice(4, 8);
  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-dot" /> THE FUTURE, IN YOUR HANDS</span>
            <h1>Make room for<br /><span>better tech.</span></h1>
            <p>Thoughtfully picked gadgets for your everyday life. Find your next favourite thing at Voltify.</p>
            <div className="hero-buttons">
              <Link className="button button-primary" to="/products">Explore products <ArrowRight size={18} /></Link>
              <Link className="text-link" to="/about">Our story <ArrowUpRight size={16} /></Link>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack"><span>👩🏻</span><span>👨🏽</span><span>🧑🏼</span><span>👨🏻</span></div>
              <div><div className="rating hero-rating"><Star size={14} fill="currentColor" /> <b>4.9/5</b></div><small>Loved by tech fans</small></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
            <div className="hero-device device-phone"><span>◉</span><div className="device-screen">V</div></div>
            <div className="hero-device device-headphones">🎧</div>
            <div className="hero-device device-watch">⌚</div>
            <div className="floating-note note-top"><span className="note-icon">✦</span><div><b>New arrivals</b><small>Fresh tech is here</small></div></div>
            <div className="floating-note note-bottom"><div className="note-stars">★★★★★</div><b>Quality you can trust</b></div>
            <div className="hero-spark spark-one">✦</div><div className="hero-spark spark-two">✧</div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-grid">
          <div><Truck /><span><b>Delivery made easy</b><small>Convenient doorstep delivery</small></span></div>
          <div><ShieldCheck /><span><b>Quality first</b><small>Carefully selected gadgets</small></span></div>
          <div><RotateCcw /><span><b>Easy returns</b><small>Simple, stress-free support</small></span></div>
          <div><Headphones /><span><b>Here to help</b><small>Friendly customer care</small></span></div>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading"><div><span className="eyebrow">SHOP BY CATEGORY</span><h2>Find your kind of tech.</h2><p>Little upgrades can make a big difference.</p></div><Link className="text-link" to="/products">All categories <ArrowRight size={16} /></Link></div>
        <div className="category-grid">
          {categories.filter(c => c.name !== "All Products").slice(0, 6).map((category, index) => (
            <Link key={category.name} to={`/products?category=${encodeURIComponent(category.name)}`} className={`category-tile category-${index}`}>
              <span className="category-emoji">{category.emoji}</span><span className="category-title">{category.name}</span><span className="category-arrow"><ArrowUpRight size={17} /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section section-tinted">
        <div className="container">
          <div className="section-heading"><div><span className="eyebrow">HANDPICKED FOR YOU</span><h2>Customer favourites.</h2><p>Popular picks that bring a little more joy to every day.</p></div><Link className="text-link" to="/products">Shop all products <ArrowRight size={16} /></Link></div>
          <div className="product-grid">{featured.map(product => <ProductCard key={product.id} product={product} onAdd={onAdd} />)}</div>
        </div>
      </section>

      <section className="promo-section container">
        <div className="promo-copy"><span className="eyebrow">YOUR SETUP, LEVELLED UP</span><h2>Big ideas start<br />with the right gear.</h2><p>From focused workdays to well-earned downtime, find the tools that fit your world.</p><Link className="button button-light" to="/products">Find your upgrade <ArrowRight size={18} /></Link></div>
        <div className="promo-art"><div className="promo-laptop">💻</div><div className="promo-earbuds">🎧</div><div className="promo-glow" /></div>
      </section>

      <section className="section container">
        <div className="section-heading"><div><span className="eyebrow">MORE TO LOVE</span><h2>Good things, great tech.</h2></div><Link className="text-link" to="/products">Browse the collection <ArrowRight size={16} /></Link></div>
        <div className="product-grid">{popular.map(product => <ProductCard key={product.id} product={product} onAdd={onAdd} />)}</div>
      </section>

      <Newsletter />
    </>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  function submit(e) { e.preventDefault(); if (email.includes("@")) setDone(true); }
  return <section className="newsletter-section"><div className="container newsletter-inner"><div><span className="eyebrow">A LITTLE TECH IN YOUR INBOX</span><h2>Stay in the loop.</h2><p>Get updates on new arrivals, useful tips, and the occasional good deal.</p></div>{done ? <div className="success-inline"><CircleCheck /> You're on the list (demo)!</div> : <form className="newsletter-form" onSubmit={submit}><Mail size={18} /><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" required /><button className="button button-primary" type="submit">Sign me up <ArrowRight size={16} /></button></form>}</div></section>;
}

function ProductsPage({ onAdd }) {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const [query, setQuery] = useState(params.get("search") || "");
  const [category, setCategory] = useState(params.get("category") || "All Products");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    setQuery(p.get("search") || "");
    setCategory(p.get("category") || "All Products");
  }, [location.search]);

  const filtered = useMemo(() => {
    let list = products.filter(p =>
      (category === "All Products" || p.category === category) &&
      `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(query.toLowerCase())
    );
    if (sort === "price-low") list = [...list].sort((a,b) => a.price - b.price);
    if (sort === "price-high") list = [...list].sort((a,b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a,b) => b.rating - a.rating);
    return list;
  }, [category, query, sort]);

  function chooseCategory(value) {
    setCategory(value);
    const p = new URLSearchParams(location.search);
    if (value === "All Products") p.delete("category"); else p.set("category", value);
    navigate(`/products${p.toString() ? `?${p.toString()}` : ""}`, { replace: true });
  }

  return <main className="page-main container">
    <div className="breadcrumb"><Link to="/">Home</Link><ChevronRight size={14} /><span>Shop</span></div>
    <div className="page-title-row"><div><span className="eyebrow">THE VOLTIFY COLLECTION</span><h1>Shop all products<span className="brand-dot">.</span></h1><p>Everyday essentials. Unexpected favourites.</p></div><div className="catalog-count">{filtered.length} products</div></div>
    <div className="catalog-layout">
      <aside className="filter-sidebar">
        <h3>Categories</h3>
        <div className="filter-options">{categories.map(c => <button key={c.name} className={category === c.name ? "filter-option active" : "filter-option"} onClick={() => chooseCategory(c.name)}><span>{c.emoji} &nbsp; {c.name}</span><ChevronRight size={15} /></button>)}</div>
        <div className="sidebar-note"><Zap size={18} /><b>Good tech, no guesswork.</b><p>Browse our demo collection of everyday electronics.</p></div>
      </aside>
      <div className="catalog-content">
        <div className="catalog-toolbar"><label className="catalog-search"><Search size={17} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products..." /></label><select aria-label="Sort products" value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option></select></div>
        {filtered.length ? <div className="product-grid catalog-products">{filtered.map(product => <ProductCard key={product.id} product={product} onAdd={onAdd} />)}</div> : <div className="empty-state"><span>🔎</span><h3>No products found</h3><p>Try a different search or category.</p><button className="button button-primary" onClick={() => {setQuery(""); chooseCategory("All Products");}}>Clear filters</button></div>}
      </div>
    </div>
  </main>;
}

function ProductDetails({ onAdd }) {
  const { pathname } = useLocation();
  const id = Number(pathname.split("/").pop());
  const product = products.find(p => p.id === id);
  const [qty, setQty] = useState(1);
  if (!product) return <main className="container page-main"><div className="empty-state"><span>🧭</span><h2>Product not found</h2><Link className="button button-primary" to="/products">Back to shop</Link></div></main>;
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
  return <main className="container page-main">
    <div className="breadcrumb"><Link to="/">Home</Link><ChevronRight size={14} /><Link to="/products">Shop</Link><ChevronRight size={14} /><span>{product.name}</span></div>
    <div className="detail-layout">
      <div className={`detail-art product-art ${product.color}`}><span className="detail-emoji">{product.emoji}</span><span className="detail-art-caption">VOLTIFY SELECT</span></div>
      <div className="detail-info"><span className="eyebrow">{product.category.toUpperCase()}</span><h1>{product.name}</h1><div className="rating detail-rating"><Star size={16} fill="currentColor" /><b>{product.rating}</b><span>({product.reviews} reviews)</span></div><div className="detail-price"><strong>{formatPrice(product.price)}</strong><del>{formatPrice(product.oldPrice)}</del><span className="discount-pill">SAVE {Math.round((1-product.price/product.oldPrice)*100)}%</span></div><p className="detail-description">{product.description}</p><div className="detail-perks"><span><Check size={16} /> Quality checked</span><span><Check size={16} /> Easy returns</span><span><Check size={16} /> Secure demo checkout</span></div><div className="quantity-row"><span>Quantity</span><div className="quantity-control"><button onClick={() => setQty(Math.max(1, qty-1))} aria-label="Decrease quantity"><Minus size={15}/></button><b>{qty}</b><button onClick={() => setQty(Math.min(10, qty+1))} aria-label="Increase quantity"><Plus size={15}/></button></div></div><button className="button button-primary button-wide" onClick={() => onAdd(product, qty)}><ShoppingBag size={18} /> Add to cart — {formatPrice(product.price*qty)}</button><div className="detail-meta"><span><PackageCheck size={17}/> Demo delivery estimate: 3–5 days</span><span><ShieldCheck size={17}/> Student project demo item</span></div></div>
    </div>
    {related.length > 0 && <section className="section related-section"><div className="section-heading"><div><span className="eyebrow">YOU MAY ALSO LIKE</span><h2>More from {product.category}.</h2></div><Link className="text-link" to={`/products?category=${encodeURIComponent(product.category)}`}>View category <ArrowRight size={16}/></Link></div><div className="product-grid">{related.map(p => <ProductCard key={p.id} product={p} onAdd={onAdd}/>)}</div></section>}
  </main>;
}

function CartPage({ cart, updateQty, removeItem }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal === 0 || subtotal >= 50000 ? 0 : 500;
  return <main className="container page-main">
    <div className="breadcrumb"><Link to="/">Home</Link><ChevronRight size={14}/><span>Shopping cart</span></div>
    <div className="page-title-row"><div><span className="eyebrow">YOUR PICKS, ALL IN ONE PLACE</span><h1>Your shopping cart<span className="brand-dot">.</span></h1><p>{cart.reduce((sum, item) => sum + item.qty, 0)} item(s) in your bag</p></div><Link to="/products" className="text-link">Continue shopping <ArrowRight size={16}/></Link></div>
    {!cart.length ? <div className="empty-state cart-empty"><div className="empty-bag"><ShoppingBag size={32}/></div><h2>Your cart is taking a little break.</h2><p>Looks like you haven't added anything yet. Let's find something good.</p><Link className="button button-primary" to="/products">Explore products <ArrowRight size={17}/></Link></div> :
    <div className="cart-layout"><div className="cart-items">{cart.map(item => <article className="cart-item" key={item.id}><Link to={`/products/${item.id}`} className={`cart-item-art product-art ${item.color}`}>{item.emoji}</Link><div className="cart-item-info"><span className="product-category">{item.category}</span><Link to={`/products/${item.id}`} className="product-name">{item.name}</Link><strong>{formatPrice(item.price)}</strong><button className="remove-button" onClick={() => removeItem(item.id)}><Trash2 size={14}/> Remove</button></div><div className="cart-item-end"><div className="quantity-control"><button onClick={() => updateQty(item.id, item.qty-1)} aria-label="Decrease quantity"><Minus size={14}/></button><b>{item.qty}</b><button onClick={() => updateQty(item.id, item.qty+1)} aria-label="Increase quantity"><Plus size={14}/></button></div><strong>{formatPrice(item.price*item.qty)}</strong></div></article>)}</div>
      <aside className="order-summary"><h3>Order summary</h3><div className="summary-line"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div><div className="summary-line"><span>Delivery</span><span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span></div>{subtotal > 0 && subtotal < 50000 && <p className="shipping-hint">Add {formatPrice(50000-subtotal)} more for free delivery.</p>}<div className="summary-line summary-total"><b>Total</b><strong>{formatPrice(subtotal+shipping)}</strong></div><Link className="button button-primary button-wide" to="/checkout">Continue to checkout <ArrowRight size={17}/></Link><p className="demo-disclaimer"><ShieldCheck size={15}/> Demo checkout only. No payment will be taken.</p></aside>
    </div>}
  </main>;
}

function CheckoutPage({ cart, clearCart }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "Karachi", payment: "cod" });
  const total = cart.reduce((sum, item) => sum + item.price*item.qty, 0);
  function update(e) { setForm({ ...form, [e.target.name]: e.target.value }); }
  function submit(e) { e.preventDefault(); setSubmitted(true); clearCart(); }
  if (submitted) return <main className="container page-main"><div className="success-page"><div className="success-icon"><Check size={36}/></div><span className="eyebrow">ORDER DEMO COMPLETE</span><h1>Thanks, {form.name.split(" ")[0]}!</h1><p>Your sample order has been placed successfully in this demo. No real payment or delivery has been arranged.</p><div className="demo-order-number">DEMO-{Math.floor(100000+Math.random()*900000)}</div><Link to="/products" className="button button-primary">Continue shopping <ArrowRight size={17}/></Link></div></main>;
  if (!cart.length) return <main className="container page-main"><div className="empty-state"><span>🛍️</span><h2>Your cart is empty</h2><p>Add some products before checking out.</p><Link to="/products" className="button button-primary">Shop products</Link></div></main>;
  return <main className="container page-main"><div className="breadcrumb"><Link to="/">Home</Link><ChevronRight size={14}/><Link to="/cart">Cart</Link><ChevronRight size={14}/><span>Checkout</span></div><div className="page-title-row"><div><span className="eyebrow">ALMOST YOURS</span><h1>Checkout<span className="brand-dot">.</span></h1><p>Enter sample details to complete the demo order.</p></div></div>
    <div className="checkout-layout"><form className="checkout-form panel" onSubmit={submit}><h2>Delivery information</h2><div className="form-grid"><label>Full name<input name="name" value={form.name} onChange={update} required placeholder="e.g. Muhammad Abdullah"/></label><label>Email address<input name="email" type="email" value={form.email} onChange={update} required placeholder="you@example.com"/></label><label>Phone number<input name="phone" type="tel" value={form.phone} onChange={update} required placeholder="+92 300 1234567"/></label><label>City<select name="city" value={form.city} onChange={update}><option>Karachi</option><option>Lahore</option><option>Islamabad</option><option>Multan</option><option>Burewala</option><option>Other</option></select></label><label className="full-field">Delivery address<textarea name="address" value={form.address} onChange={update} required rows="3" placeholder="House, street, area..."/></label></div><h2 className="payment-title">Payment method</h2><label className="payment-choice"><input type="radio" name="payment" value="cod" checked={form.payment==="cod"} onChange={update}/><span><b>Cash on delivery (demo)</b><small>Choose this sample payment option.</small></span></label><label className="payment-choice"><input type="radio" name="payment" value="online" checked={form.payment==="online"} onChange={update}/><span><b>Online payment (demo)</b><small>No card details are requested or processed.</small></span></label><button type="submit" className="button button-primary button-wide">Place demo order <ArrowRight size={17}/></button><p className="demo-disclaimer">This is a class project. Do not enter real payment information.</p></form>
      <aside className="order-summary checkout-summary"><h3>Your order</h3>{cart.map(item => <div className="checkout-product" key={item.id}><span className={`checkout-product-emoji ${item.color}`}>{item.emoji}</span><span className="checkout-product-name">{item.name}<small>Qty: {item.qty}</small></span><b>{formatPrice(item.price*item.qty)}</b></div>)}<div className="summary-line"><span>Subtotal</span><span>{formatPrice(total)}</span></div><div className="summary-line"><span>Delivery</span><span>{total>=50000?"FREE":formatPrice(500)}</span></div><div className="summary-line summary-total"><b>Total</b><strong>{formatPrice(total+(total>=50000?0:500))}</strong></div></aside>
    </div>
  </main>;
}

function AboutPage() {
  return <main className="container page-main"><div className="breadcrumb"><Link to="/">Home</Link><ChevronRight size={14}/><span>About us</span></div><section className="about-hero"><span className="eyebrow">A LITTLE ABOUT VOLTIFY</span><h1>Tech should make<br/><span>life feel easier.</span></h1><p>We're a fictional electronics shop concept built around one simple idea: finding useful, exciting technology should feel easy, welcoming, and fun.</p><Link className="button button-primary" to="/products">Explore our collection <ArrowRight size={17}/></Link><div className="about-emoji">📱　🎧　💻　⌚</div></section><section className="values-grid"><div className="value-card"><span>✦</span><h3>Curated, not complicated</h3><p>A sample collection of everyday tech, presented with clear product details.</p></div><div className="value-card"><span>♡</span><h3>Made for real life</h3><p>From study desks to weekend playlists, imagine technology that fits your routine.</p></div><div className="value-card"><span>⚡</span><h3>Always moving forward</h3><p>This demo uses React to show how a modern online store can work without a backend.</p></div></section><div className="project-note"><Zap size={22}/><div><b>About this student project</b><p>Voltify is a frontend-only demonstration. Product listings are sample data and orders are not sent to a real shop.</p></div></div></main>;
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "Product question", message: "" });
  function submit(e) { e.preventDefault(); setSent(true); }
  return <main className="container page-main"><div className="breadcrumb"><Link to="/">Home</Link><ChevronRight size={14}/><span>Contact</span></div><div className="contact-heading"><span className="eyebrow">WE'RE HAPPY TO HELP</span><h1>Let's talk tech<span className="brand-dot">.</span></h1><p>Questions, feedback, or just want to say hello? Send a demo message below.</p></div><div className="contact-layout"><div className="contact-info"><div className="contact-info-card"><span className="contact-icon"><Mail/></span><h3>Email us</h3><p>hello@voltify.example</p><small>Example contact for this student project</small></div><div className="contact-info-card"><span className="contact-icon"><MessageCircle/></span><h3>Customer support</h3><p>Here to help with your questions.</p><small>Demo support information</small></div><div className="contact-info-card contact-highlight"><Zap size={24}/><h3>Good tech starts with a conversation.</h3><p>We'd love to hear what you'd like to see in the store.</p></div></div><form className="contact-form panel" onSubmit={e=>{e.preventDefault();setSent(true);}}>{sent ? <div className="form-success"><CircleCheck size={42}/><h2>Message ready!</h2><p>This demo form works on the page, but it does not send information to a server.</p><button type="button" className="button button-outline" onClick={()=>{setSent(false);setForm({name:"",email:"",subject:"Product question",message:""});}}>Write another message</button></div> : <><h2>Send us a message</h2><label>Your name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required placeholder="Your name"/></label><label>Email address<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required placeholder="you@example.com"/></label><label>What's this about?<select value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}><option>Product question</option><option>Order support</option><option>Feedback</option><option>Other</option></select></label><label>Message<textarea rows="5" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} required placeholder="Tell us how we can help..."/></label><button className="button button-primary button-wide" type="submit">Send demo message <Send size={16}/></button></>}</form></div></main>;
}

export default function App() {
  useScrollTop();
  const [searchValue, setSearchValue] = useState("");
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("voltify-cart") || "[]"); } catch { return []; }
  });
  const [toast, setToast] = useState("");
  useEffect(() => { localStorage.setItem("voltify-cart", JSON.stringify(cart)); }, [cart]);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  function addToCart(product, quantity=1) {
    setCart(current => {
      const found = current.find(item => item.id === product.id);
      if (found) return current.map(item => item.id === product.id ? {...item, qty: Math.min(10, item.qty+quantity)} : item);
      return [...current, {...product, qty: Math.min(10, quantity)}];
    });
    setToast(`${product.name} added to cart`);
    window.clearTimeout(window.__voltifyToastTimer);
    window.__voltifyToastTimer = window.setTimeout(() => setToast(""), 2600);
  }
  function updateQty(id, qty) {
    if (qty <= 0) { setCart(current => current.filter(item => item.id !== id)); return; }
    setCart(current => current.map(item => item.id === id ? {...item, qty: Math.min(10, qty)} : item));
  }
  function removeItem(id) { setCart(current => current.filter(item => item.id !== id)); }
  function clearCart() { setCart([]); }

  return <><Navbar cartCount={cartCount} searchValue={searchValue} setSearchValue={setSearchValue}/><Routes>
    <Route path="/" element={<Home onAdd={addToCart} searchValue={searchValue}/>}/>
    <Route path="/products" element={<ProductsPage onAdd={addToCart}/>}/>
    <Route path="/products/:id" element={<ProductDetails onAdd={addToCart}/>}/>
    <Route path="/cart" element={<CartPage cart={cart} updateQty={updateQty} removeItem={removeItem}/>}/>
    <Route path="/checkout" element={<CheckoutPage cart={cart} clearCart={clearCart}/>}/>
    <Route path="/about" element={<AboutPage/>}/>
    <Route path="/contact" element={<ContactPage/>}/>
    <Route path="*" element={<main className="container page-main"><div className="empty-state"><span>🧭</span><h2>Page not found</h2><Link className="button button-primary" to="/">Back to home</Link></div></main>}/>
  </Routes><Footer/>{toast && <div className="toast"><span className="toast-check"><Check size={16}/></span>{toast}<Link to="/cart">View cart</Link></div>}</>;
}
