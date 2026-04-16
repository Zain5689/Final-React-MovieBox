import { useState } from "react";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useMovieStore } from "../store/useMovieStore";
import toast from "react-hot-toast";
import { loginUser } from "@/api/authService";

const Login = () => {
  const navigate = useNavigate();
  const setUser = useMovieStore((state) => state.setUser);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const user = loginUser(formData.email, formData.password);

      setUser(user);

      toast.success("Welcome back! ❤️");

      navigate("/wishlist", { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex mx-auto justify-center items-center min-h-[80vh]">
      <div className="relative z-10 w-full max-w-md p-8 mx-4 bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-blue-500 mb-2 tracking-tight">
            Welcome
          </h2>
          <p className="text-slate-400 font-medium">
            Log in to your account to continue
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Input */}
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors"
                size={20}
              />
              <input
                required
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors"
                size={20}
              />
              <input
                required
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-blue-500 hover:underline font-medium"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="group relative w-full flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-blue-500/25"
          >
            <LogIn size={20} />
            Sign In
            <ArrowRight
              className="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all"
              size={18}
            />
          </button>
        </form>

        <p className="mt-8 text-center text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 font-bold hover:underline"
          >
            Join now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
