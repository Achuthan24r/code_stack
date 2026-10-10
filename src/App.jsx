import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Collection from "./pages/Collection";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Customize from "./pages/Customize";

import { products } from "./data/products";


function App() {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem("orders")) || [];
  });

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const saveWishlist = (newWishlist) => {
    setWishlist(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
  };

  const saveOrders = (newOrders) => {
    setOrders(newOrders);
    localStorage.setItem("orders", JSON.stringify(newOrders));
  };

  const addToCart = (product, customization = {}) => {
    const cartId =
      customization.cartId ||
      `${product.id}-${customization.color || ""}-${customization.material || ""}-${customization.decoration || ""}-${customization.customText || ""}`;

    const existing = cart.find((item) => item.cartId === cartId);

    if (existing) {
      saveCart(
        cart.map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      saveCart([
        ...cart,
        {
          ...product,
          cartId,
          customization,
          quantity: 1,
        },
      ]);
    }
  };

  const removeFromCart = (cartId) => {
    saveCart(cart.filter((item) => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, quantity) => {
    if (quantity < 1) return;

    saveCart(
      cart.map((item) =>
        item.cartId === cartId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    saveCart([]);
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);

    if (exists) {
      saveWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      saveWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (id) => {
    saveWishlist(wishlist.filter((item) => item.id !== id));
  };

  const getProduct = (id) => {
    return products.find((product) => product.id === Number(id));
  };

  const placeOrder = (customerDetails) => {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleString(),
      customer: customerDetails,
      items: cart,
      total,
      status: "Order Confirmed",
    };

    const updatedOrders = [newOrder, ...orders];

    saveOrders(updatedOrders);
    clearCart();

    return newOrder;
  };

  return (
    <div className="app">
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        orderCount={orders.length}
      />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/shop"
          element={
            <Shop
              addToCart={addToCart}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          }
        />

        <Route path="/collection" element={<Collection />} />

        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              removeFromWishlist={removeFromWishlist}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/customize"
          element={
            <Customize
              getProduct={getProduct}
              addToCart={addToCart}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              clearCart={clearCart}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              placeOrder={placeOrder}
            />
          }
        />

        <Route
          path="/orders"
          element={<Orders orders={orders} />}
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;