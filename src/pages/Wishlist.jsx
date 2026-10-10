import { Link } from "react-router-dom";

function Wishlist({
  wishlist,
  removeFromWishlist,
  addToCart,
}) {
  return (
    <main className="store-page">

      <section className="store-page-heading">

        <span className="section-label">
          YOUR FAVOURITES
        </span>

        <h1>Wishlist</h1>

        <p>
          Your favourite accessories are saved here.
        </p>

      </section>

      {wishlist.length === 0 ? (

        <div className="empty-store">

          <div className="empty-icon">♡</div>

          <h2>Your wishlist is empty</h2>

          <p>
            Save accessories you love and find them here later.
          </p>

          <Link
            to="/shop"
            className="primary-button"
          >
            Explore Shop
          </Link>

        </div>

      ) : (

        <section className="wishlist-grid-new">

          {wishlist.map((product) => (

            <article
              className="wishlist-product-card"
              key={product.id}
            >

              <div className="wishlist-image-wrap">

                <img
                  src={product.image}
                  alt={product.name}
                />

                <button
                  onClick={() =>
                    removeFromWishlist(product.id)
                  }
                >
                  ♥
                </button>

              </div>

              <div className="wishlist-card-body">

                <span className="product-category">
                  {product.category}
                </span>

                <h3>{product.name}</h3>

                <p>
                  {product.description}
                </p>

                <strong>
                  ₹{product.price.toLocaleString()}
                </strong>

                <div className="wishlist-card-actions">

                  <button
                    className="add-cart-button"
                    onClick={() =>
                      addToCart(product)
                    }
                  >
                    Add to Cart
                  </button>

                  <Link
                    to={`/customize?product=${product.id}`}
                    className="outline-button"
                  >
                    Customize
                  </Link>

                </div>

              </div>

            </article>

          ))}

        </section>

      )}

    </main>
  );
}

export default Wishlist;