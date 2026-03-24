import { Link, useLocation } from "react-router-dom";
import { Heart, User, Film, Tv, Users } from "lucide-react";

const Navbar = () => {
  const wishlistCount = 5;
  const location = useLocation();

  const navLinks = [
    { name: "Movies", path: "/", icon: <Film size={18} /> },
    { name: "TV Shows", path: "/tv", icon: <Tv size={18} /> },
    { name: "People", path: "/people", icon: <Users size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
            <Film className="text-amber-400" size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">
            Cine<span className="text-amber-500">Stream</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[15px] font-semibold transition-all relative py-1
                  ${isActive ? "text-slate-900" : "text-slate-400 hover:text-slate-600"}
                `}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-amber-500 rounded-full shadow-[0_2px_8px_rgba(245,158,11,0.3)]" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/wishlist"
            className="relative p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
          >
            <Heart
              size={22}
              className={wishlistCount > 0 ? "fill-rose-500 text-rose-500" : ""}
            />
            {wishlistCount > 0 && (
              <span className="absolute top-1.5 right-1.5 bg-amber-500 text-slate-900 text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                {wishlistCount}
              </span>
            )}
          </Link>

          <div className="h-5 w-[1px] bg-slate-200 mx-1" />

          <Link
            to="/login"
            className="flex items-center gap-2 text-sm font-bold text-slate-700 bg-slate-50 hover:bg-amber-500 hover:text-white px-5 py-2 rounded-lg transition-all active:scale-95 border border-slate-100 hover:border-amber-500"
          >
            <User size={18} />
            <span className="hidden sm:inline">Sign In</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
