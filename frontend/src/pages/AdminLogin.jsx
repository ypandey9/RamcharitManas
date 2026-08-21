import { useState , useRef } from "react";

import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import { loginAdmin } from "../services/authService";


export default function AdminLogin() {

const navigate = useNavigate();
const [isLogging,setIsLogging] = useState(false);
const isSubmitting = useRef(false);

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e) => {

    e.preventDefault();

    if(isSubmitting.current) {
      return;
    }

    isSubmitting.current = true;
    setIsLogging(true);

    try {

    const data = await loginAdmin(
      formData.username,
      formData.password
    );
localStorage.setItem(
    "token",
    data.token
);

localStorage.setItem(
    "username",
    data.username
);

localStorage.setItem(
    "role",
    data.role
);


    navigate("/admin/verses");

  } catch(error){

    console.error(error);

    setError("Invalid username or password");

  } finally {
    isSubmitting.current = false;
    setIsLogging(false);
  }
   
  };

  return (
    <>
      <Navbar />

      <div className="max-w-md mx-auto p-6">

        <div className="
          bg-white p-8 rounded-2xl
          shadow-lg border border-orange-100
        ">

          <h2 className="
            text-3xl font-bold text-center
            mb-8 text-orange-700
          ">
            User Login
          </h2>

          <form onSubmit={handleSubmit}>

            {/* Username */}
            <div className="mb-6">

              <label className="block font-semibold mb-2">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="
                  w-full border rounded-lg p-3
                "
              />

            </div>

            {/* Password */}
            <div className="mb-6">

              <label className="block font-semibold mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="
                  w-full border rounded-lg p-3
                "
              />

            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 mb-4">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLogging}
              className={`w-full py-3 rounded-full
                bg-orange-500 text-white
                hover:bg-orange-600 transition
              ${
                isLogging
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
              }
              `}
            >
            {isLogging ? "Logging..." : "Login"}
            </button>

          </form>

          <div className="text-center mt-5">

    Don't have an account?

    <Link

        to="/signup"

        className="ml-2 text-orange-700 font-semibold"

    >

        Sign Up

    </Link>

</div>

        </div>

      </div>
    </>
  );
}