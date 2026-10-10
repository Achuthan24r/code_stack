import { Link } from "react-router-dom";

function Cart({
  cart,
  removeFromCart,
  updateQuantity,
  clearCart,
}) {
  const subtotal = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const delivery = subtotal > 999 || subtotal === 0 ? 0 : 49;

  const total = subtotal + delivery;

  return (
    <main className="store-page">

      <section className="store-page-heading">

        <span className="section-label">
          SHOPPING BAG
        </span>

        <h1>Your Cart</h1>

        <p>
          Review your selected accessories before checkout.
        </p>

      </section>

      {cart.length === 0 ? (

        <div className="empty-store">

          <div className="empty-icon">🛒</div>

          <h2>Your cart is empty</h2>

          <p>
            Add some beautiful accessories to your cart.
          </p>

          <Link
            to="/shop"
            className="primary-button"
          >
            Continue Shopping
          </Link>

        </div>

      ) : (

        <section className="cart-layout-new">

          <div className="cart-items-new">

            {cart.map((item) => (

              <article
                className="cart-item-new"
                key={item.cartId}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-item-info">

                  <span className="product-category">
                    {item.category}
                  </span>

                  <h3>{item.name}</h3>

                  {item.customization &&
                    Object.keys(item.customization)
                      .length > 0 && (
                      <p className="cart-customization">
                        Customized item
                      </p>
                    )}

                  <strong>
                    ₹{item.price.toLocaleString()}
                  </strong>

                </div>

                <div className="quantity-control-new">

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.cartId,
                        item.quantity - 1
                      )
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.cartId,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>

                </div>

                <button
                  className="remove-cart-button"
                  onClick={() =>
                    removeFromCart(item.cartId)
                  }
                >
                  Remove
                </button>

              </article>

            ))}

            <button
              className="clear-cart-button"
              onClick={clearCart}
            >
              Clear Cart
            </button>

          </div>

          <aside className="cart-summary-new">

            <h2>Order Summary</h2>

            <div>
              <span>Subtotal</span>
              <strong>₹{subtotal.toLocaleString()}</strong>
            </div>

            <div>
              <span>Delivery</span>
              <strong>
                {delivery === 0
                  ? "FREE"
                  : `₹${delivery}`}
              </strong>
            </div>

            <hr />

            <div className="summary-total">
              <span>Total</span>
              <strong>₹{total.toLocaleString()}</strong>
            </div>

            <Link
              to="/checkout"
              className="checkout-button"
            >
              Proceed to Checkout
            </Link>

          </aside>

        </section>

      )}

    </main>
  );
}

export default Cart;