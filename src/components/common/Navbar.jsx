import { Link, useLocation } from "react-router-dom";
import { Heart, User, Film, Sun, Moon } from "lucide-react";

const Navbar = ({ isDark, setIsDark }) => {
  const wishlistCount = 5;
  const location = useLocation();

  const navLinks = [
    { name: "Movies", path: "/" },
    { name: "TV Shows", path: "/tv" },
    { name: "People", path: "/people" },
  ];

  return (
    <nav className="h-16 flex items-center justify-between transition-all duration-300">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
          <Film className="text-white" size={20} />
        </div>
        <span className="font-heading text-2xl tracking-wider text-text-main transition-colors">
          CINE<span className="text-primary">STREAM</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`font-body text-[15px] font-semibold transition-all relative py-1
                ${
                  isActive
                    ? "text-primary"
                    : "text-text-main opacity-70 hover:opacity-100 hover:text-primary"
                }
              `}
            >
              {link.name}
              {isActive && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(229,9,20,0.4)]" />
              )}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full bg-surface-card text-text-main border border-surface-elevated hover:border-primary transition-all active:scale-90"
          aria-label="Toggle Theme"
        >
          {isDark ? (
            <Sun size={20} className="text-primary" />
          ) : (
            <Moon size={20} className="text-slate-600" />
          )}
        </button>

        <div className="h-5 w-px bg-surface-elevated mx-1" />

        <Link
          to="/wishlist"
          className="relative p-2 text-text-main opacity-70 hover:opacity-100 hover:text-primary transition-all"
        >
          <Heart
            size={22}
            className={wishlistCount > 0 ? "fill-primary text-primary" : ""}
          />
          {wishlistCount > 0 && (
            <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-bg">
              {wishlistCount}
            </span>
          )}
        </Link>

        <Link
          to="/login"
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-md font-bold text-sm transition-all active:scale-95 shadow-md shadow-primary/20"
        >
          <User size={16} />
          <span className="hidden sm:inline">Sign In</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
