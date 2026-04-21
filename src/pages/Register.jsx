import { useState } from "react";
import { Mail, Lock, User, UserPlus, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { registerUser } from "@/api/authService";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      registerUser(formData.name, formData.email, formData.password);
      toast.success("Account created! Please login ❤️");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex mx-auto justify-center items-center min-h-[80vh]">
      <div className="relative z-10 w-full max-w-md p-8 mx-4 bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-blue-500 mb-2 tracking-tight">
            Create Account
          </h2>
          <p className="text-slate-400 font-medium">
            Join us to start your journey
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative group">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors"
                size={20}
              />
              <input
                required
                type="text"
                placeholder="Full Name"
                className="w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors"
                size={20}
              />
              <input
                required
                type="email"
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors"
                size={20}
              />
              <input
                required
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-blue-500/25"
          >
            <UserPlus size={20} />
            Create Account
            <ArrowRight
              className="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all"
              size={18}
            />
          </button>
        </form>

        <p className="mt-8 text-center text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
