import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function Signup() {

    const navigate = useNavigate();

    const [countdown, setCountdown] = useState(20);

    const [registeredUser, setRegisteredUser] = useState(null);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({

        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""

    });

    useEffect(() => {

        if (!registeredUser) return;

        const interval = setInterval(() => {

            setCountdown(prev => {

                if (prev <= 1) {

                    clearInterval(interval);

                    navigate("/");

                    return 0;

                }

                return prev - 1;

            });

        }, 1000);

        return () => clearInterval(interval);

    }, [registeredUser, navigate]);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setMessage("");

        if (formData.password !== formData.confirmPassword) {

            setError("Passwords do not match.");

            return;

        }

        try {

            setLoading(true);

            const response = await registerUser({

                fullName: formData.fullName,

                username: formData.username,

                email: formData.email,

                password: formData.password

            });

            setMessage(response.message);

            setRegisteredUser({

                username: formData.username,

                password: formData.password

            });

            setCountdown(20);

        }

        catch (err) {

            if (err.response) {

                setError(err.response.data.message);

            } else {

                setError("Something went wrong.");

            }

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-orange-50 flex items-center justify-center p-6">

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">

                <h1 className="text-3xl font-bold text-center text-orange-700">

                    📖 Create Account

                </h1>

                <p className="text-center text-gray-500 mt-2 mb-8">

                    Join Ramcharitmanas Reading Journey

                </p>

                {message && (

                    <div className="bg-green-100 text-green-700 rounded-lg p-3 mb-4 text-center">

                        {message}

                    </div>

                )}

                {error && (

                    <div className="bg-red-100 text-red-700 rounded-lg p-3 mb-4 text-center">

                        {error}

                    </div>

                )}

                {registeredUser ? (

                    <div className="bg-green-50 border border-green-300 rounded-2xl p-6">

                        <div className="text-center">

                            <div className="text-6xl">

                                ✅

                            </div>

                            <h2 className="text-2xl font-bold text-green-700 mt-2">

                                Registration Successful

                            </h2>

                            <p className="text-gray-600 mt-2">

                                Your account has been created successfully.

                            </p>

                        </div>

                        <div className="mt-6 space-y-4">

                            <div className="bg-white rounded-xl shadow p-4">

                                <p className="text-sm text-gray-500">

                                    Username

                                </p>

                                <p className="text-xl font-semibold text-orange-700">

                                    {registeredUser.username}

                                </p>

                            </div>

                            {/* <div className="bg-white rounded-xl shadow p-4">

                                <p className="text-sm text-gray-500">

                                    Password

                                </p>

                                <p className="text-xl font-semibold">

                                    {registeredUser.password}

                                </p>

                            </div> */}

                        </div>

                        <p className="text-sm text-gray-600 mt-5 text-center">

                            Please remember your username and password for future login.

                        </p>

                        <div className="w-full bg-gray-200 rounded-full h-3 mt-6">

                            <div

                                className="bg-orange-500 h-3 rounded-full transition-all duration-1000"

                                style={{

                                    width: `${(countdown / 20) * 100}%`

                                }}

                            ></div>

                        </div>

                        <p className="text-center mt-4 text-orange-700 font-semibold">

                            Redirecting automatically in

                            <span className="text-3xl mx-2 font-bold">

                                {countdown}

                            </span>

                            seconds

                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-6">

                            <button

                                onClick={() => navigate("/admin-login")}

                                className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"

                            >

                                🔐 Login Now

                            </button>

                            <button

                                onClick={() => navigate("/")}

                                className="bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-semibold"

                            >

                                🏠 Home

                            </button>

                        </div>

                    </div>

                ) : (

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <input

                            type="text"

                            name="fullName"

                            placeholder="Full Name"

                            value={formData.fullName}

                            onChange={handleChange}

                            required

                            className="w-full border rounded-lg p-3"

                        />

                        <input

                            type="text"

                            name="username"

                            placeholder="Username"

                            value={formData.username}

                            onChange={handleChange}

                            required

                            className="w-full border rounded-lg p-3"

                        />

                        <input

                            type="email"

                            name="email"

                            placeholder="Email"

                            value={formData.email}

                            onChange={handleChange}

                            required

                            className="w-full border rounded-lg p-3"

                        />

                        <input

                            type="password"

                            name="password"

                            placeholder="Password"

                            value={formData.password}

                            onChange={handleChange}

                            required

                            className="w-full border rounded-lg p-3"

                        />

                        <input

                            type="password"

                            name="confirmPassword"

                            placeholder="Confirm Password"

                            value={formData.confirmPassword}

                            onChange={handleChange}

                            required

                            className="w-full border rounded-lg p-3"

                        />

                        <button

                            disabled={loading}

                            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold"

                        >

                            {loading ? "Creating Account..." : "Create Account"}

                        </button>

                    </form>

                )}

                {!registeredUser && (

                    <div className="text-center mt-6">

                        Already have an account?

                        <Link

                            to="/admin-login"

                            className="text-orange-700 font-semibold ml-2"

                        >

                            Login

                        </Link>

                    </div>

                )}

            </div>

        </div>

    );

}