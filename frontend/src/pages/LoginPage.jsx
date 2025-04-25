import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { useAuthStore } from "../store/useAuthStore.js";

const SignupPage = ({ onToggle }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dhv] w-full relative bg-white overflow-hidden">
      <div
        className="absolute top-0 left-[-80px] w-[850px] h-[500px] rounded-full mix-blend-multiply filter blur-2xl opacity-80 -translate-y-2/4"
        style={{ backgroundColor: "rgba(170, 252, 255, 1)" }}
      ></div>

      <div
        className="absolute top-0 right-[-80px] w-[900px] h-[500px] rounded-full mix-blend-multiply filter blur-2xl opacity-80 -translate-y-1/4"
        style={{ backgroundColor: "rgba(159, 188, 255, 1)" }}
      ></div>

      <div className="container mx-auto min-h-screen flex items-center justify-center px-4 py-0">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <div className="flex flex-col md:flex-row items-center justify-center text-center space-y-4 md:space-y-0 md:space-x-6 w-full max-w-[40rem] mx-auto z-10 md:h-screen">
            <img
              src="./chatIcon.png"
              className="w-[80px] sm:w-[100px] md:w-[100px] max-w-full m-3 md:m-1"
            />
            <h1 className="text-black text-3xl sm:text-4xl md:text-4xl font-bold leading-tight">
              <span className="inline-block w-[300px] text-left">
                <Typewriter
                  words={["Unlock Possibilities,", "One Click at a Time!"]}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={30}
                  delaySpeed={1000}
                />
              </span>
            </h1>
          </div>

          {/* Right Side - Auth Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl backdrop-blur-sm bg-opacity-80 overflow-y-auto max-h-[90vh]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Login</h2>

              <div className="space-y-4">
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
                    className="absolute right-3 top-8 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 flex items-center justify-center border border-transparent rounded-md shadow-sm text-white font-medium 
             bg-gradient-to-r from-blue-500 to-blue-300 transition-all duration-300 
             hover:bg-blue-500 hover:from-blue-500 hover:to-blue-500"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Dont have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/signup")}
                    className="text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
