import { useState } from "react";
import { useNavigate } from "react-router";
import { Zap, Github } from "lucide-react";
import { motion } from "motion/react";
import api from "../../configs/api";

export function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const endpoint = isLogin ? "/auth/login" : "/auth/register";
    const payload = isLogin
      ? { email, password }
      : { name, email, password };

    const res = await api.post(endpoint, payload);
    const { token, user } = res.data.data;

    localStorage.setItem("token", token);
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userId", user.id);

    navigate("/app");
  } catch (err: any) {
    alert(err.response?.data?.message || "Something went wrong");
  }
};

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Animated Background */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#EEF0FF] to-[#F8F9FC] items-center justify-center p-12 relative overflow-hidden">
        {/* Floating Code Snippets */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-20 bg-white p-4 rounded-xl shadow-lg"
          >
            <pre className="text-xs text-[#6C63FF] font-mono">
              {`const sync = () => {\n  collaborate();\n}`}
            </pre>
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-32 right-32 bg-white p-4 rounded-xl shadow-lg"
          >
            <pre className="text-xs text-[#00C896] font-mono">
              {`function code() {\n  return "together";\n}`}
            </pre>
          </motion.div>

          <motion.div
            animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/2 right-20 bg-white p-4 rounded-xl shadow-lg"
          >
            <pre className="text-xs text-[#6B7280] font-mono">
              {`let team = ["👨‍💻", "👩‍💻"];\ncollaborate(team);`}
            </pre>
          </motion.div>
        </div>

        {/* Center Content */}
        <div className="relative z-10 text-center max-w-md">
          <h1 className="text-4xl font-bold text-[#0F1117] mb-4">
            Code Together, <br />Ship Faster
          </h1>
          <p className="text-lg text-[#6B7280]">
            Real-time collaboration platform for developers who build amazing things together.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-[#6C63FF] rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" fill="white" />
            </div>
            <span className="text-2xl font-bold text-[#0F1117]">CodeSync</span>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-[#F8F9FC] p-1 rounded-lg mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                isLogin
                  ? "bg-white text-[#0F1117] shadow-sm"
                  : "text-[#6B7280] hover:text-[#0F1117]"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                !isLogin
                  ? "bg-white text-[#0F1117] shadow-sm"
                  : "text-[#6B7280] hover:text-[#0F1117]"
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-[#0F1117] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-[#E4E7EF] rounded-lg text-[#0F1117] placeholder:text-[#6B7280] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/20 transition-all"
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#0F1117] mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#E4E7EF] rounded-lg text-[#0F1117] placeholder:text-[#6B7280] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/20 transition-all"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F1117] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#E4E7EF] rounded-lg text-[#0F1117] placeholder:text-[#6B7280] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/20 transition-all"
                placeholder="Enter your password"
                required
              />
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-[#6C63FF] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#6C63FF] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#6C63FF]/25 hover:-translate-y-0.5 transition-all"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E4E7EF]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-[#6B7280]">or</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-3 bg-white border border-[#E4E7EF] text-[#0F1117] rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#F8F9FC] transition-all"
            >
              <Github className="w-5 h-5" />
              Continue with GitHub
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-[#6B7280]">
            <span>By continuing, you agree to our </span>
            <button className="text-[#6C63FF] hover:underline">Terms</button>
            <span> & </span>
            <button className="text-[#6C63FF] hover:underline">Privacy Policy</button>
          </div>
        </div>
      </div>
    </div>
  );
}