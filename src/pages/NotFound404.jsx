import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-4 overflow-hidden transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto flex max-w-md flex-col items-center text-center"
      >
        <motion.div
          initial={{ scale: 0.8, rotate: -5 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.1,
          }}
          className="relative flex h-28 w-28 items-center justify-center rounded-3xl bg-surface-card border border-surface-elevated mb-8 shadow-lg group hover:shadow-primary/20 transition-all"
        >
          <FileQuestion className="h-14 w-14 text-primary transition-transform group-hover:rotate-12 duration-300" />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-primary shadow-md"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-heading text-8xl font-black tracking-tighter text-text-main drop-shadow-md animate-pulse"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-body mt-2 text-2xl font-bold text-text-main"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-body mt-4 text-text-main opacity-60 font-medium leading-relaxed"
        >
          Oops! The page you’re looking for has vanished into the cinema void.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center"
        >
          <Button
            asChild
            className="bg-primary hover:bg-primary-dark text-white h-12 px-8 rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-95 border-none font-bold"
          >
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </Button>

          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-surface-elevated text-text-main h-12 px-8 rounded-xl hover:bg-surface-card transition-all shadow-sm active:scale-95 bg-transparent"
          >
            <div className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back</span>
            </div>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
