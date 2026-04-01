import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const Login = () => {
  return (
    <div className="flex mx-auto justify-center items-center ">
      <div className="relative z-10 w-full max-w-md p-8 mx-4 bg-surface-elevated/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-primary mb-2 tracking-tight">
            Welcome
          </h2>
          <p className="text-text-main/60 font-medium">
            Log in to your account to continue
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            {/* Email Input */}
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-main/40 group-focus-within:text-primary transition-colors"
                size={20}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-4 bg-bg/50 border border-white/10 rounded-2xl text-text-main placeholder:text-text-main/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-main/40 group-focus-within:text-primary transition-colors"
                size={20}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-4 bg-bg/50 border border-white/10 rounded-2xl text-text-main placeholder:text-text-main/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-primary hover:underline font-medium"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button className="group relative w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary/90 text-white font-bold rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/25">
            <LogIn size={20} />
            Sign In
            <ArrowRight
              className="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all"
              size={18}
            />
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-text-main/60">
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="text-primary font-bold hover:underline"
          >
            Join now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
