import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'; // Example icons
import Logo from '../../../../Logo';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* Logo and Copyright */}
          <div className="md:col-span-1">
            <div className="mb-4 inline-flex items-center">
              <Logo width="100px" />
            </div>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
            </p>
            <div className="mt-4 flex space-x-4 md:justify-center gap-7">
              <Link to="https://github.com" aria-label="Github" className="text-gray-400 hover:text-white">
                <FaGithub size={20} />
              </Link>
              <Link to="https://twitter.com" aria-label="Twitter" className="text-gray-400 hover:text-white">
                <FaTwitter size={20} />
              </Link>
              <Link to="https://linkedin.com" aria-label="LinkedIn" className="text-gray-400 hover:text-white">
                <FaLinkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Footer Links Sections */}
          <div className="grid grid-cols-2 gap-8 md:col-span-2 lg:col-span-3 lg:grid-cols-3">
            <div>
              <h3 className="tracking-wider text-sm font-semibold uppercase text-gray-400">
                Company
              </h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/" className="text-base text-gray-300 hover:text-white">Features</Link></li>
                <li><Link to="/" className="text-base text-gray-300 hover:text-white">Pricing</Link></li>
                <li><Link to="/" className="text-base text-gray-300 hover:text-white">Affiliate Program</Link></li>
                <li><Link to="/" className="text-base text-gray-300 hover:text-white">Press Kit</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="tracking-wider text-sm font-semibold uppercase text-gray-400">
                Support
              </h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/" className="text-base text-gray-300 hover:text-white">Account</Link></li>
                <li><Link to="/" className="text-base text-gray-300 hover:text-white">Help</Link></li>
                <li><Link to="/" className="text-base text-gray-300 hover:text-white">Contact Us</Link></li>
                <li><Link to="/" className="text-base text-gray-300 hover:text-white">Customer Support</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="tracking-wider text-sm font-semibold uppercase text-gray-400">
                Legal
              </h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/" className="text-base text-gray-300 hover:text-white">Terms &amp; Conditions</Link></li>
                <li><Link to="/" className="text-base text-gray-300 hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/" className="text-base text-gray-300 hover:text-white">Licensing</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;