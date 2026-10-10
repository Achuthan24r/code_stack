import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Checkout({ cart, placeOrder }) {
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [success, setSuccess] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const delivery = subtotal > 999 ? 0 : 49;

  const total = subtotal + delivery;

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) return;

    placeOrder(details);
    setSuccess(true);
  };

  if (success) {
    return (
      <main className="store-success-page">

        <div className="success-card-new">

          <div className="success-icon">
            ✓
          </div>

          <span className="section-label">
            ORDER SUCCESSFUL
          </span>

          <h1>Thank You!</h1>

          <p>
            Your order has been placed successfully.
          </p>

          <div className="success-actions">

            <Link
              to="/orders"
              className="primary-button"
            >
              View Orders
            </Link>

            <Link
              to="/shop"
              className="secondary-button"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="store-page">

        <div className="empty-store">

          <h2>Your cart is empty</h2>

          <p>
            Add products before proceeding to checkout.
          </p>

          <Link
            to="/shop"
            className="primary-button"
          >
            Go to Shop
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="store-page">

      <section className="store-page-heading">

        <span className="section-label">
          SECURE CHECKOUT
        </span>

        <h1>Checkout</h1>

        <p>
          Enter your details to complete your order.
        </p>

      </section>

      <section className="checkout-layout-new">

        <form
          className="checkout-form-new"
          onSubmit={handleSubmit}
        >

          <h2>Delivery Details</h2>

          <div className="form-grid-two">

            <label>
              Full Name
              <input
                name="name"
                value={details.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={details.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </label>

            <label>
              Phone Number
              <input
                name="phone"
                value={details.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </label>

            <label>
              PIN Code
              <input
                name="pincode"
                value={details.pincode}
                onChange={handleChange}
                placeholder="Enter PIN code"
                required
              />
            </label>

          </div>

          <label>
            Address
            <textarea
              name="address"
              value={details.address}
              onChange={handleChange}
              placeholder="Enter your complete address"
              required
            />
          </label>

          <label>
            City
            <input
              name="city"
              value={details.city}
              onChange={handleChange}
              placeholder="Enter your city"
              required
            />
          </label>

          <button
            type="submit"
            className="checkout-button"
          >
            Place Order — ₹{total.toLocaleString()}
          </button>

        </form>

        <aside className="checkout-summary-new">

          <h2>Order Summary</h2>

          {cart.map((item) => (

            <div
              className="checkout-item-new"
              key={item.cartId}
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div>
                <h3>{item.name}</h3>

                <span>
                  Qty: {item.quantity}
                </span>
              </div>

              <strong>
                ₹{(
                  item.price * item.quantity
                ).toLocaleString()}
              </strong>

            </div>

          ))}

          <div className="checkout-price-row">
            <span>Subtotal</span>
            <strong>
              ₹{subtotal.toLocaleString()}
            </strong>
          </div>

          <div className="checkout-price-row">
            <span>Delivery</span>
            <strong>
              {delivery === 0
                ? "FREE"
                : `₹${delivery}`}
            </strong>
          </div>

          <hr />

          <div className="checkout-total-row">
            <span>Total</span>
            <strong>
              ₹{total.toLocaleString()}
            </strong>
          </div>

        </aside>

      </section>

    </main>
  );
}

export default Checkout;