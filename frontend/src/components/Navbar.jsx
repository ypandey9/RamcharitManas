import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  isLoggedIn,
  isAdmin,
  isEditor,
  logout
} from "../utils/userUtils";

export default function Navbar() {

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {

    logout();

    setMenuOpen(false);

    navigate("/");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (

    <nav className="bg-primary text-white shadow-md">

      <div className="max-w-7xl mx-auto px-4">

        {/* ==========================================
            Main Navbar
        ========================================== */}

        <div className="flex items-center justify-between min-h-16">

          {/* Logo */}

          <Link
            to="/"
            onClick={closeMenu}
            className="
              text-xl
              sm:text-2xl
              font-bold
              tracking-wide
              whitespace-nowrap
            "
          >
            📜 श्रीरामचरितमानस
          </Link>


          {/* ==========================================
              Desktop Navigation
          ========================================== */}

          <div className="hidden md:flex items-center gap-6 lg:gap-8">

            <Link
              to="/search"
              className="hover:opacity-80 transition"
            >
              Search
            </Link>

            <Link
              to="/"
              className="hover:opacity-80 transition"
            >
              Home
            </Link>

            <Link
              to="/bookmarks"
              className="hover:opacity-80 transition"
            >
              Bookmarks
            </Link>


            {isAdmin() && (

              <Link
                to="/admin"
                className="hover:opacity-80 transition"
              >
                Admin
              </Link>

            )}


            {(isAdmin() || isEditor()) && (

              <Link
                to="/admin/verses"
                className="hover:opacity-80 transition"
              >
                Manage Verses
              </Link>

            )}


            {isLoggedIn() && (

              <Link
                to="/dashboard"
                className="hover:opacity-80 transition"
              >
                My Dashboard
              </Link>

            )}


            {!isLoggedIn() && (

              <Link
                to="/admin-login"
                className="hover:opacity-80 transition"
              >
                Login
              </Link>

            )}


            {isLoggedIn() && (

              <button
                onClick={handleLogout}
                className="
                  px-4
                  py-2
                  rounded-lg
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  transition
                "
              >
                Logout
              </button>

            )}

          </div>


          {/* ==========================================
              Mobile Menu Button
          ========================================== */}

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              md:hidden
              text-2xl
              px-2
              py-1
              rounded-lg
              hover:bg-white/10
            "
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>


        {/* ==========================================
            Mobile Navigation
        ========================================== */}

        {menuOpen && (

          <div
            className="
              md:hidden
              border-t
              border-white/20
              py-4
            "
          >

            <div className="flex flex-col gap-2">


              <Link
                to="/search"
                onClick={closeMenu}
                className="
                  px-3
                  py-2
                  rounded-lg
                  hover:bg-white/10
                "
              >
                Search
              </Link>


              <Link
                to="/"
                onClick={closeMenu}
                className="
                  px-3
                  py-2
                  rounded-lg
                  hover:bg-white/10
                "
              >
                Home
              </Link>


              <Link
                to="/bookmarks"
                onClick={closeMenu}
                className="
                  px-3
                  py-2
                  rounded-lg
                  hover:bg-white/10
                "
              >
                Bookmarks
              </Link>


              {isAdmin() && (

                <Link
                  to="/admin"
                  onClick={closeMenu}
                  className="
                    px-3
                    py-2
                    rounded-lg
                    hover:bg-white/10
                  "
                >
                  Admin
                </Link>

              )}


              {(isAdmin() || isEditor()) && (

                <Link
                  to="/admin/verses"
                  onClick={closeMenu}
                  className="
                    px-3
                    py-2
                    rounded-lg
                    hover:bg-white/10
                  "
                >
                  Manage Verses
                </Link>

              )}


              {isLoggedIn() && (

                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="
                    px-3
                    py-2
                    rounded-lg
                    hover:bg-white/10
                  "
                >
                  My Dashboard
                </Link>

              )}


              {!isLoggedIn() && (

                <Link
                  to="/admin-login"
                  onClick={closeMenu}
                  className="
                    px-3
                    py-2
                    rounded-lg
                    hover:bg-white/10
                  "
                >
                  Login
                </Link>

              )}


              {isLoggedIn() && (

                <button
                  onClick={handleLogout}
                  className="
                    mt-2
                    px-4
                    py-2
                    rounded-lg
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    text-left
                  "
                >
                  Logout
                </button>

              )}

            </div>

          </div>

        )}

      </div>

    </nav>

  );
}