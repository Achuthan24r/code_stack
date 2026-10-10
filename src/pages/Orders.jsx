function Orders({ orders }) {
  return (
    <main className="store-page">

      <section className="store-page-heading">

        <span className="section-label">
          YOUR PURCHASES
        </span>

        <h1>My Orders</h1>

        <p>
          Track your previously placed orders.
        </p>

      </section>

      {orders.length === 0 ? (

        <div className="empty-store">

          <div className="empty-icon">◷</div>

          <h2>No orders yet</h2>

          <p>
            Your completed orders will appear here.
          </p>

        </div>

      ) : (

        <section className="orders-list-new">

          {orders.map((order) => (

            <article
              className="order-card-new"
              key={order.id}
            >

              <div className="order-card-header">

                <div>
                  <span>ORDER ID</span>
                  <h2>{order.id}</h2>
                </div>

                <div className="order-status">
                  {order.status}
                </div>

              </div>

              <div className="order-date">
                Placed on {order.date}
              </div>

              <div className="order-items-new">

                {order.items.map((item) => (

                  <div
                    className="order-item-new"
                    key={item.cartId}
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div className="order-item-info">

                      <h3>{item.name}</h3>

                      <p>
                        Quantity: {item.quantity}
                      </p>

                    </div>

                    <strong>
                      ₹{(
                        item.price * item.quantity
                      ).toLocaleString()}
                    </strong>

                  </div>

                ))}

              </div>

              <div className="order-card-footer">

                <span>Total Amount</span>

                <strong>
                  ₹{order.total.toLocaleString()}
                </strong>

              </div>

            </article>

          ))}

        </section>

      )}

    </main>
  );
}

export default Orders;