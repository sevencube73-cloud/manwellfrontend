import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top Section */}
      <div className="footer-top">
        <div className="footer-section">
          <h4>Customer Care</h4>
          <ul>
            <li><a href="/HelpCenter">Help Center</a></li>
            <li><a href="/returns">Returns & Refunds</a></li>
            <li><a href="/shipping">Shipping Info</a></li>
            <li><a href="/FAQs">FAQs</a></li>
            <li><a href="/Contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>About MANWELL</h4>
          <ul>
            <li><a href="/About-us">About Us</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/Terms">Terms & Conditions</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-section newsletter">
          <h4>Stay Connected</h4>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
          <div className="social-icons">
            <a href="https://facebook.com/muzamilafey" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com/muzamilafey" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com/muzamilafey" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://youtube.com/muzamilafey" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MANWELL STORE. All rights reserved.</p>
        <p className="footer-credit">
          Designed & Developed by{" "}
          <a
            href="https://www.muzamilafey.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mandera Soft
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
