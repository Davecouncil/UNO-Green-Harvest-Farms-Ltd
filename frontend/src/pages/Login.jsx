import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser({ email, password });

      if (!data.success) {
        setError(data.message || "Login failed");
        return;
      }

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT — Image panel (hidden on mobile) */}
      <div
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#173d20]/90 via-[#173d20]/40 to-transparent" />

        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <img
            src="/images/logo1.png"
            alt="UNO"
            className="w-14 bg-white rounded-md p-1 mb-8"
          />
          <h2 className="font-dm text-3xl leading-tight mb-3">
            Welcome Back to
            <br />
            Fresh, Honest Farming
          </h2>
          <p className="text-white/80 text-sm max-w-sm">
            Sign in to track your orders, manage your cart, and get the
            freshest produce delivered straight from our fields to your table.
          </p>
        </div>
      </div>

      {/* RIGHT — Form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 bg-white">
        <div className="w-full max-w-sm">

          <img
            src="/images/logo1.png"
            alt="UNO"
            className="w-12 lg:hidden mb-8"
          />

          <p className="uppercase tracking-widest text-xs text-[#4D7C0F] font-semibold mb-2">
            Welcome Back
          </p>

          <h1 className="font-dm text-3xl mb-2">Sign In</h1>
          <p className="text-gray-500 text-sm mb-8">
            Enter your details to access your account.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2D7A0F] focus:ring-1 focus:ring-[#2D7A0F] transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-11 text-sm outline-none focus:border-[#2D7A0F] focus:ring-1 focus:ring-[#2D7A0F] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="rounded border-gray-300" />
                Remember me
              </label>
              <a href="#" className="text-[#2D7A0F] hover:underline font-medium">
                Forgot password?
              </a>
            </div>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-[#2D7A0F] hover:bg-[#25650d] transition text-white rounded-lg py-2.5 text-sm font-semibold disabled:opacity-60 mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>

          <p className="text-sm text-gray-500 text-center mt-8">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#2D7A0F] font-semibold hover:underline">
              Sign Up
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;