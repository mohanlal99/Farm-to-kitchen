import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { pathname } = useLocation();
  const { user, logout, role } = useContext(AuthContext); // 'farmer' or 'consumer'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/sign-in');
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    ...(user && role === 'farmer'
      ? [
          { name: 'Products', path: '/products' },
          { name: 'Add products', path: '/add-product' },
        ]
      : []),

    ...(user && role === 'consumer'
      ? [
          { name: 'Farmers Market', path: '/market' },
          { name: 'My Orders', path: '/orders' },
          { name: 'Cart', path: '/cart' }
        ]
      : []),

    ...(user
      ? [
          {
            name: 'Profile',
            path: '/profile',
            subItems: [
              { name: 'Settings', path: '/settings' },
              { name: 'Logout', action: handleLogout }
            ]
          }
        ]
      : [
          { name: 'Sign In', path: '/sign-in' },
          { name: 'Register', path: '/register' }
        ])
  ];

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-primary-green)] text-[var(--color-white)] px-4 md:px-10 py-4 shadow flex justify-between items-center">
  <Link to="/" className="text-xl font-bold text-[var(--color-primary-blue)]">🌾 F & K</Link>

  {/* Desktop Nav */}
  <ul className="hidden md:flex items-center gap-6 font-semibold">
    {navItems.map((item, i) => (
      <li key={i} className="relative group">
        {item.path ? (
          <Link
            to={item.path}
            className={`hover:text-[var(--color-gray-light)] ${
              pathname === item.path ? 'text-[var(--color-primary-blue)]' : 'text-[var(--color-white)]'
            }`}
          >
            {item.name}
          </Link>
        ) : (
          <span className="cursor-pointer">{item.name}</span>
        )}

        {/* Profile Dropdown */}
        {item.subItems && (
          <div className="absolute top-4 right-0 mt-2 hidden group-hover:flex flex-col bg-[var(--color-white)] shadow-md rounded-md p-2 min-w-[150px] z-40">
            {item.subItems.map((sub, subIndex) =>
              sub.path ? (
                <Link
                  key={subIndex}
                  to={sub.path}
                  className="text-[var(--color-gray-dark)] hover:text-[var(--color-primary-blue)] py-1"
                >
                  {sub.name}
                </Link>
              ) : (
                <button
                  key={subIndex}
                  onClick={sub.action}
                  className="text-left text-[var(--color-gray-dark)] hover:text-[var(--color-primary-blue)] py-1"
                >
                  {sub.name}
                </button>
              )
            )}
          </div>
        )}
      </li>
    ))}
  </ul>

  {/* Mobile Toggle */}
  <button
    className="md:hidden text-[var(--color-white)] text-xl"
    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
  >
    ☰
  </button>

  {/* Mobile Menu */}
  {isMobileMenuOpen && (
    <ul className="absolute top-[60px] left-0  w-full bg-[var(--color-white)] shadow-md md:hidden flex flex-col p-4 gap-3 z-50">
      {navItems.map((item, i) => (
        <div key={i}>
          {item.path ? (
            <Link
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-[var(--color-gray-dark)] hover:text-[var(--color-primary-blue)]"
            >
              {item.name}
            </Link>
          ) : (
            <span className="block">{item.name}</span>
          )}
          {item.subItems &&
            item.subItems.map((sub, subIndex) =>
              sub.path ? (
                <Link
                  key={subIndex}
                  to={sub.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="ml-4 block text-sm text-[var(--color-gray-dark)] hover:text-[var(--color-primary-blue)]"
                >
                  {sub.name}
                </Link>
              ) : (
                <button
                  key={subIndex}
                  onClick={() => {
                    sub.action();
                    setIsMobileMenuOpen(false);
                  }}
                  className="ml-4 block text-sm text-left text-[var(--color-gray-dark)] hover:text-[var(--color-primary-blue)]"
                >
                  {sub.name}
                </button>
              )
            )}
        </div>
      ))}
    </ul>
  )}
    </header>

  );
};

export default Navbar;
