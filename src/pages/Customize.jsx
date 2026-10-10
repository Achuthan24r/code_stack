import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function Customize({
  getProduct,
  addToCart,
  wishlist,
  toggleWishlist,
}) {
  const [searchParams] = useSearchParams();

  const productId = searchParams.get("product");

  const product = getProduct(
    productId || 1
  );

  const [color, setColor] = useState(
    product.colors?.[0] || ""
  );

  const [material, setMaterial] = useState(
    product.materials?.[0] || ""
  );

  const [decoration, setDecoration] = useState(
    product.decorations?.[0] || ""
  );

  const [customText, setCustomText] = useState("");

  const customizedProduct = useMemo(
    () => ({
      ...product,

      cartId: `custom-${product.id}-${Date.now()}`,

      customization: {
        color,
        material,
        decoration,
        customText,
      },
    }),
    [
      product,
      color,
      material,
      decoration,
      customText,
    ]
  );

  const customizationCost =
    (color ? 50 : 0) +
    (material ? 100 : 0) +
    (decoration ? 75 : 0) +
    (customText ? 100 : 0);

  const finalPrice =
    product.price + customizationCost;

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  const handleAddToCart = () => {
    addToCart(product, {
      color,
      material,
      decoration,
      customText,
      cartId: `custom-${product.id}-${color}-${material}-${decoration}-${customText}`,
    });
  };

  if (!product) {
    return (
      <main className="store-page">
        <div className="empty-store">
          <h2>Product not found</h2>

          <Link
            to="/shop"
            className="primary-button"
          >
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="store-page">

      <section className="store-page-heading">

        <span className="section-label">
          PERSONALIZE
        </span>

        <h1>Customize Your Design</h1>

        <p>
          Make your favourite accessory uniquely yours.
        </p>

      </section>

      <section className="customize-layout-new">

        <div className="customize-preview-new">

          <div className="customize-image-wrap">

            <img
              src={product.image}
              alt={product.name}
            />

          </div>

          <span className="product-category">
            {product.category}
          </span>

          <h2>{product.name}</h2>

          <p>{product.description}</p>

        </div>

        <div className="customize-panel-new">

          <div className="customize-option">

            <h3>Choose Color</h3>

            <div className="choice-grid">

              {product.colors?.map((item) => (

                <button
                  key={item}
                  className={
                    color === item
                      ? "choice-button active"
                      : "choice-button"
                  }
                  onClick={() => setColor(item)}
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

          <div className="customize-option">

            <h3>Choose Material</h3>

            <div className="choice-grid">

              {product.materials?.map((item) => (

                <button
                  key={item}
                  className={
                    material === item
                      ? "choice-button active"
                      : "choice-button"
                  }
                  onClick={() => setMaterial(item)}
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

          <div className="customize-option">

            <h3>Decoration</h3>

            <div className="choice-grid">

              {product.decorations?.map((item) => (

                <button
                  key={item}
                  className={
                    decoration === item
                      ? "choice-button active"
                      : "choice-button"
                  }
                  onClick={() =>
                    setDecoration(item)
                  }
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

          <div className="customize-option">

            <h3>Personal Text</h3>

            <input
              className="custom-text-input"
              type="text"
              maxLength="20"
              value={customText}
              onChange={(e) =>
                setCustomText(e.target.value)
              }
              placeholder="Enter initials or short text"
            />

          </div>

          <div className="custom-price-new">

            <span>Customized Price</span>

            <strong>
              ₹{finalPrice.toLocaleString()}
            </strong>

          </div>

          <div className="customize-actions-new">

            <button
              className="add-cart-button"
              onClick={handleAddToCart}
            >
              Add Customized Item
            </button>

            <button
              className={
                isWishlisted
                  ? "wishlist-action active"
                  : "wishlist-action"
              }
              onClick={() =>
                toggleWishlist(product)
              }
            >
              {isWishlisted
                ? "♥ Saved"
                : "♡ Save to Wishlist"}
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Customize;