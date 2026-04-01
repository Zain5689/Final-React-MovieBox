import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-5 transition-colors duration-300 border-t border-surface-elevated">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm font-medium text-text-main/50">
          <span>© {currentYear} ITI Project</span>

          <span className="hidden sm:block text-surface-elevated">|</span>

          <span className="flex items-center gap-1.5">
            Made with
            <Heart
              size={14}
              className="text-primary fill-primary animate-pulse"
            />
            by{" "}
            <span className="text-text-main font-semibold">Zainab Hilal</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
