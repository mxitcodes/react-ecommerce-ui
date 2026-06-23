import { useState } from "react";
import {
  FiMail,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
} from "react-icons/fi";
import "./Footer.css";

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    "Get to Know Us": ["About Us", "Careers", "Press Releases", "ShopKart Cares"],
    "Connect with Us": ["Facebook", "Twitter", "Instagram"],
    "Make Money with Us": [
      "Sell on ShopKart",
      "Sell under ShopKart Accelerator",
      "Become an Affiliate",
      "Advertise Your Products",
    ],
    "Let Us Help You": [
      "COVID-19 and ShopKart",
      "Your Account",
      "Returns Centre",
      "100% Purchase Protection",
      "Help",
    ],
  };

  return (
    <footer className="footer" id="footer">
      {/* Back to Top */}
      <button
        className="footer__back-top"
        id="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to top ↑
      </button>

      {/* Newsletter */}
      <div className="footer__newsletter">
        <div className="footer__newsletter-inner">
          <div className="footer__newsletter-text">
            <h3>Subscribe to our Newsletter</h3>
            <p>Get the latest updates, deals, and exclusive offers straight to your inbox.</p>
          </div>
          <form className="footer__newsletter-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={subscribed ? "subscribed" : ""}>
              {subscribed ? "Subscribed! 🎉" : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      {/* Links Grid */}
      <div className="footer__main">
        <div className="footer__grid">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="footer__col">
              <h3 className="footer__col-title">{title}</h3>
              <ul className="footer__list">
                {links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="footer__link">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <div className="footer__brand">
            <h2 className="footer__logo">
              Shop<span className="footer__logo-accent">Kart</span>
              <span className="footer__logo-dot">.in</span>
            </h2>
            <p className="footer__tagline">
              Your one-stop destination for everything.
            </p>
          </div>

          <div className="footer__social">
            <a href="#" className="footer__social-link" id="social-facebook" aria-label="Facebook">
              <FiFacebook size={18} />
            </a>
            <a href="#" className="footer__social-link" id="social-twitter" aria-label="Twitter">
              <FiTwitter size={18} />
            </a>
            <a href="#" className="footer__social-link" id="social-instagram" aria-label="Instagram">
              <FiInstagram size={18} />
            </a>
            <a href="#" className="footer__social-link" id="social-youtube" aria-label="YouTube">
              <FiYoutube size={18} />
            </a>
            <a href="#" className="footer__social-link" id="social-email" aria-label="Email">
              <FiMail size={18} />
            </a>
          </div>

          <p className="footer__copyright">
            © 2026 ShopKart.in. All rights reserved. &nbsp;|&nbsp;
            <a href="#" className="footer__copyright-link">Conditions of Use</a> &nbsp;|&nbsp;
            <a href="#" className="footer__copyright-link">Privacy Notice</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
