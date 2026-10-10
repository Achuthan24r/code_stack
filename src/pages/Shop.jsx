import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

function Shop({
  addToCart,
  wishlist,
  toggleWishlist,
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [searchParams] = useSearchParams();

  const categories = useMemo(
    () => [
      "All",
      ...new Set(products.map((product) => product.category)),
    ],
    []
  );

  useEffect(() => {
    const requestedCategory = searchParams.get("category");

    if (
      requestedCategory &&
      categories.includes(requestedCategory)
    ) {
      setCategory(requestedCategory);
    }
  }, [searchParams, categories]);

  const filteredProducts = products.filter((product) => {

    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.category
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="store-page">

      <section className="store-page-heading">

        <span className="section-label">
          OUR PRODUCTS
        </span>

        <h1>Shop Accessories</h1>

        <p>
          Discover elegant accessories and personalize
          your favourites.
        </p>

      </section>

      <section className="shop-toolbar">

        <div className="shop-search-wrap">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search accessories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="category-buttons">

          {categories.map((item) => (
            <button
              key={item}
              className={
                category === item
                  ? "category-button active"
                  : "category-button"
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}

        </div>

      </section>

      <section className="store-product-grid">

        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          ))
        ) : (
          <div className="empty-store">
            <h2>No products found</h2>
            <p>
              Try another search or category.
            </p>
          </div>
        )}

      </section>

    </main>
  );
}

export default Shop;