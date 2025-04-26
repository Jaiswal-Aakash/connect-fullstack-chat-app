import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import TermsModal from "../components/TermsModal.jsx";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { useAuthStore } from "../store/useAuthStore.js";
import toast from "react-hot-toast";

const SignupPage = ({ onToggle }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if(success === true) await signup(formData);
  };
  const [showTerms, setShowTerms] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full relative bg-white overflow-hidden">
      <div
        className="absolute top-0 left-[-80px] w-[850px] h-[500px] rounded-full mix-blend-multiply filter blur-2xl opacity-80 -translate-y-2/4"
        style={{ backgroundColor: "rgba(170, 252, 255, 1)" }}
      ></div>

      <div
        className="absolute top-0 right-[-80px] w-[900px] h-[500px] rounded-full mix-blend-multiply filter blur-2xl opacity-80 -translate-y-1/4"
        style={{ backgroundColor: "rgba(159, 188, 255, 1)" }}
      ></div>

      <div className="container mx-auto min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <div className="flex flex-col md:flex-row items-center justify-center text-center space-y-4 md:space-y-0 md:space-x-6 w-full max-w-[40rem] mx-auto z-10 md:h-screen">
            <img
              src="./chatIcon.png"
              className="w-[80px] sm:w-[100px] md:w-[100px] max-w-full m-3 md:m-1"
            />
            <h1 className="text-black text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              <span className="inline-block w-[300px] text-center lg:text-left">
                <Typewriter
                  words={["Fast,", "Reliable,", "Responsive!"]}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={80}
                  deleteSpeed={30}
                  delaySpeed={1000}
                />
              </span>
            </h1>
          </div>

          {/* Right Side - Auth Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl backdrop-blur-sm bg-opacity-80">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Sign Up</h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full px-3 py-2 border text-black bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="name"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full text-black bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="mt-1 block text-black bg-white w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 bg-white appearance-none border border-gray-300 checked:bg-purple-600 checked:border-transparent text-blue-600 focus:ring-blue-500 rounded"
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    I accept the{" "}
                    <button
                      onClick={() => setShowTerms(true)}
                      className="text-blue-600 hover:text-blue-500"
                    >
                      Terms
                    </button>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 flex items-center justify-center border border-transparent rounded-md shadow-sm text-white font-medium 
             bg-gradient-to-r from-blue-500 to-blue-300 transition-all duration-300 
             hover:bg-blue-500 hover:from-blue-500 hover:to-blue-500"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
    </div>
  );
};

export default SignupPage;
