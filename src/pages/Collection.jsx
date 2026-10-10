import { Link } from "react-router-dom";

import { products } from "../data/products";

function Collection() {
  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  const categoryProducts = categories.map((category) => ({
    category,
    product: products.find(
      (item) => item.category === category
    ),
  }));

  return (
    <main className="store-page">

      <section className="store-page-heading">

        <span className="section-label">
          EXPLORE
        </span>

        <h1>Our Collection</h1>

        <p>
          Find the perfect accessory collection for your style.
        </p>

      </section>

      <section className="collection-grid-new">

        {categoryProducts.map(
          ({ category, product }) => (
            <Link
              key={category}
              to={`/shop?category=${encodeURIComponent(
                category
              )}`}
              className="collection-tile"
            >

              <div className="collection-tile-image">

                <img
                  src={product.image}
                  alt={category}
                />

              </div>

              <div className="collection-tile-content">

                <span>COLLECTION</span>

                <h2>{category}</h2>

                <p>
                  Explore our {category.toLowerCase()}.
                </p>

                <strong>
                  View Collection →
                </strong>

              </div>

            </Link>
          )
        )}

      </section>

    </main>
  );
}

export default Collection;