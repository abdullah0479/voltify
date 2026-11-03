import { Heart, Star, ShoppingBag, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { formatPrice } from "../utils.js";

export default function ProductCard({ product, onAdd }) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="product-card">
      <div className={`product-art ${product.color}`}>
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <button className={`wishlist-button ${liked ? "liked" : ""}`} onClick={() => setLiked(!liked)} aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}>
          <Heart size={18} fill={liked ? "currentColor" : "none"} />
        </button>
        <Link to={`/products/${product.id}`} className="product-emoji" aria-label={`View ${product.name}`}>{product.emoji}</Link>
        <Link to={`/products/${product.id}`} className="quick-view">Quick view <ArrowUpRight size={14} /></Link>
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <Link to={`/products/${product.id}`} className="product-name">{product.name}</Link>
        <div className="rating"><Star size={14} fill="currentColor" /> <b>{product.rating}</b> <span>({product.reviews})</span></div>
        <div className="product-bottom">
          <div className="price-wrap"><strong>{formatPrice(product.price)}</strong><del>{formatPrice(product.oldPrice)}</del></div>
          <button className="add-small" onClick={() => onAdd(product)} aria-label={`Add ${product.name} to cart`}><ShoppingBag size={17} /></button>
        </div>
      </div>
    </article>
  );
}
