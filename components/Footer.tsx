import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" py-8">
      <div className="bg-gray-500">Pending work of footer editing</div>
      <div className="container mx-auto px-4">
        {/* Footer Main Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Column 1 - About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-sm mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
            </p>
            <p className="text-sm">© 2024 Job Portal, All Rights Reserved</p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-yellow-500">Home</a></li>
              <li><a href="#" className="text-sm hover:text-yellow-500">About</a></li>
              <li><a href="#" className="text-sm hover:text-yellow-500">Services</a></li>
              <li><a href="#" className="text-sm hover:text-yellow-500">Contact</a></li>
            </ul>
          </div>

          {/* Column 3 - Useful Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-yellow-500">Terms & Conditions</a></li>
              <li><a href="#" className="text-sm hover:text-yellow-500">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-yellow-500">FAQ</a></li>
              <li><a href="#" className="text-sm hover:text-yellow-500">Support</a></li>
            </ul>
          </div>

          {/* Column 4 - Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-sm hover:text-yellow-500">
                <FaFacebookF />
              </a>
              <a href="#" className="text-sm hover:text-yellow-500">
                <FaTwitter />
              </a>
              <a href="#" className="text-sm hover:text-yellow-500">
                <FaInstagram />
              </a>
              <a href="#" className="text-sm hover:text-yellow-500">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 text-center text-sm">
          <p>Made with ❤️ by Paras | All Rights Reserved 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
