
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const pressedLoginButton = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      return toast.error("Email and Password are Required");
    }

    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // ⭐ SAVE TOKEN
        localStorage.setItem("token", data.token);

        toast.success("Login Successful 🚀");

        // redirect
        navigate("/");
      } else {
        toast.error(data.message || "Login Failed");
      }

    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Server unreachable. Please check your connection.");
    }
  };

  return (
    <div className="max-h-screen">
      <section className="bg-gray-200 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl">

          <div className="md:w-1/2 px-5 pr-10">

            <h2 className="text-2xl font-bold text-[#002D74]">Login</h2>
            <p className="text-sm mt-4 text-[#002D74]">
              If you have an account, please login
            </p>

            <form className="mt-6" onSubmit={pressedLoginButton}>

              {/* Email */}
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  minLength="6"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="text-right mt-2">
                <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700">
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full block bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-blue font-semibold rounded-lg px-4 py-3 mt-6"
              >
                Log In
              </button>

            </form>

            {/* Divider */}
            <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
              <hr />
              <p className="text-center text-sm">OR</p>
              <hr />
            </div>

            {/* Google */}
            <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300">
              <span className="ml-4">Login with Google</span>
            </button>

            {/* Register */}
            <div className="text-sm flex justify-between items-center mt-3">
              <p>If you don't have an account...</p>
              <Link
                to="/register"
                className="px-4 py-2 bg-blue-700 text-white text-sm rounded-lg hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </div>

          </div>

          {/* Image */}
          <div className="w-1/2 md:block hidden">
            <img
              src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa"
              className="rounded-2xl"
              alt="login"
            />
          </div>

        </div>
      </section>
    </div>
  );
}

export default Login;

