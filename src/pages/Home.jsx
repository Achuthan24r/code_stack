import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">ACCESSORIES • PERSONALIZED • YOU</p>

          <h1>
            Create accessories
            <br />
            that feel <span>uniquely yours.</span>
          </h1>

          <p>
            Discover elegant accessories and customize your favourite
            designs with colours, charms, styles and personal details.
          </p>

          <div className="hero-buttons">
            <Link to="/shop" className="primary-button">
              Explore Collection
            </Link>

            <Link to="/customize" className="secondary-button">
              Create Your Design
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div>
          <h3>01</h3>
          <h2>Choose</h2>
          <p>Select your favourite accessory.</p>
        </div>

        <div>
          <h3>02</h3>
          <h2>Customize</h2>
          <p>Make it match your personal style.</p>
        </div>

        <div>
          <h3>03</h3>
          <h2>Order</h2>
          <p>Place your customized order.</p>
        </div>
      </section>
    </main>
  );
}

export default Home;