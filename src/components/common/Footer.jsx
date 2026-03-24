import { Link } from "react-router-dom";
import { Film, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-slate-100 py-6">
      <div className="container mx-auto px-6 flex flex-col items-center gap-6">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
          <span>© {currentYear} ITI Project</span>
          <span className="text-slate-200">|</span>
          <span className="flex items-center gap-1">
            Made with
            <Heart
              size={12}
              className="text-rose-500 fill-rose-500 animate-pulse"
              aria-label="love"
            />
            by the Dev Team
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
