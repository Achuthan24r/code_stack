import { Link } from "react-router-dom";

function ProductCard({
  product,
  addToCart,
  wishlist,
  toggleWishlist,
}) {
  const isWishlisted = wishlist?.some(
    (item) => item.id === product.id
  );

  return (
    <article className="store-product-card">

      <div className="store-product-image">

        <img
          src={product.image}
          alt={product.name}
        />

        <button
          className={`store-wishlist ${
            isWishlisted ? "active" : ""
          }`}
          onClick={() => toggleWishlist(product)}
        >
          {isWishlisted ? "♥" : "♡"}
        </button>

      </div>

      <div className="store-product-body">

        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-rating">
          ★ {product.rating}
        </div>

        <div className="product-bottom">

          <strong>
            ₹{product.price.toLocaleString()}
          </strong>

          <Link
            to={`/customize?product=${product.id}`}
            className="customize-link"
          >
            Customize
          </Link>

        </div>

        <div className="store-card-actions">

          <button
            className="add-cart-button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

        </div>

      </div>
    </article>
  );
}

export default ProductCard;