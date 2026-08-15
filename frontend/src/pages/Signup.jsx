import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

export default function Signup() {

    const navigate = useNavigate();

    // ==========================================
    // Registration Success Countdown
    // ==========================================

    const [countdown, setCountdown] = useState(20);

    const [registeredUser, setRegisteredUser] = useState(null);


    useEffect(() => {

        if (!registeredUser) {
            return;
        }

        const interval = setInterval(() => {

            setCountdown((prev) => {

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


    // ==========================================
    // Form Data
    // ==========================================

    const [formData, setFormData] = useState({

        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""

    });


    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");


    // ==========================================
    // Handle Input Change
    // ==========================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

        // Clear old error while user is typing

        if (error) {
            setError("");
        }

    };


    // ==========================================
    // Password Validation
    // ==========================================

    const password = formData.password;


    const passwordRequirements = {

        minLength: password.length >= 8,

        lowercase: /[a-z]/.test(password),

        uppercase: /[A-Z]/.test(password),

        number: /\d/.test(password),

        special: /[@$!%*?&]/.test(password)

    };


    const isPasswordStrong =

        passwordRequirements.minLength &&

        passwordRequirements.lowercase &&

        passwordRequirements.uppercase &&

        passwordRequirements.number &&

        passwordRequirements.special;


    const passwordsMatch =

        formData.password === formData.confirmPassword;


    // ==========================================
    // Password Strength
    // ==========================================

    const getPasswordStrength = () => {

        if (!password) {
            return {
                text: "",
                width: "0%"
            };
        }

        const score = Object.values(passwordRequirements)
            .filter(Boolean)
            .length;


        if (score <= 2) {

            return {
                text: "Weak",
                width: "40%"
            };

        }

        if (score <= 4) {

            return {
                text: "Medium",
                width: "70%"
            };

        }

        return {
            text: "Strong",
            width: "100%"
        };

    };


    const passwordStrength = getPasswordStrength();


    // ==========================================
    // Submit
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setMessage("");


        // Password validation

        if (!isPasswordStrong) {

            setError(
                "Please create a strong password that meets all the requirements."
            );

            return;

        }


        // Confirm password validation

        if (!passwordsMatch) {

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


            // Store only username.
            // Do NOT store/display password.

            setRegisteredUser({

                username: formData.username

            });


            setCountdown(20);


        } catch (err) {

            console.error(err);


            if (err.response) {

                setError(

                    err.response.data?.message ||

                    "Registration failed."

                );

            } else {

                setError("Something went wrong.");

            }

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="min-h-screen bg-orange-50 flex items-center justify-center p-6">

            <div className="bg-white shadow-xl rounded-3xl w-full max-w-md p-8">


                {/* ==================================
                    Heading
                ================================== */}

                <h1 className="text-3xl font-bold text-center text-orange-700 mb-2">

                    📖 Create Account

                </h1>


                <p className="text-center text-gray-500 mb-8">

                    Join Ramcharitmanas Reading Journey

                </p>


                {/* ==================================
                    Success Message
                ================================== */}

                {message && (

                    <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">

                        {message}

                    </div>

                )}


                {/* ==================================
                    Registration Success
                ================================== */}

                {registeredUser && (

                    <div className="bg-green-50 border border-green-300 rounded-xl p-5 mb-5">


                        <div className="text-center">

                            <div className="text-6xl mb-4">

                                ✅

                            </div>


                            <h2 className="text-2xl font-bold text-green-700">

                                Registration Successful

                            </h2>

                        </div>


                        <p className="mt-4">

                            Your account has been created successfully.

                        </p>


                        <div className="mt-4">

                            <div className="bg-white rounded-lg p-3 shadow">

                                <p className="text-gray-500 text-sm">

                                    Username

                                </p>

                                <p className="text-lg font-semibold text-orange-700">

                                    {registeredUser.username}

                                </p>

                            </div>

                        </div>


                        <div className="mt-5">

                            <p className="text-orange-700 font-semibold text-center">

                                Redirecting to Home Page in

                                <span className="text-2xl ml-2">

                                    {countdown}

                                </span>

                                seconds...

                            </p>


                            <button

                                onClick={() => navigate("/")}

                                className="
                                    mt-4
                                    w-full
                                    bg-orange-600
                                    hover:bg-orange-700
                                    text-white
                                    py-2
                                    rounded-lg
                                "

                            >

                                Go to Home Now

                            </button>

                        </div>

                    </div>

                )}


                {/* ==================================
                    Error
                ================================== */}

                {error && (

                    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">

                        {error}

                    </div>

                )}


                {/* ==================================
                    Signup Form
                ================================== */}

                {!registeredUser && (

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >


                        {/* Full Name */}

                        <input

                            type="text"

                            name="fullName"

                            placeholder="Full Name"

                            value={formData.fullName}

                            onChange={handleChange}

                            required

                            className="w-full border rounded-lg p-3"

                        />


                        {/* Username */}

                        <input

                            type="text"

                            name="username"

                            placeholder="Username"

                            value={formData.username}

                            onChange={handleChange}

                            required

                            className="w-full border rounded-lg p-3"

                        />


                        {/* Email */}

                        <input

                            type="email"

                            name="email"

                            placeholder="Email"

                            value={formData.email}

                            onChange={handleChange}

                            required

                            className="w-full border rounded-lg p-3"

                        />


                        {/* ==================================
                            Password
                        ================================== */}

                        <div>

                            <input

                                type="password"

                                name="password"

                                placeholder="Password"

                                value={formData.password}

                                onChange={handleChange}

                                required

                                className="w-full border rounded-lg p-3"

                            />


                            {/* Password Strength */}

                            {password && (

                                <div className="mt-2">

                                    <div className="flex justify-between text-sm">

                                        <span className="text-gray-500">

                                            Password Strength

                                        </span>

                                        <span
                                            className={
                                                passwordStrength.text === "Strong"

                                                    ? "text-green-600 font-semibold"

                                                    : passwordStrength.text === "Medium"

                                                    ? "text-yellow-600 font-semibold"

                                                    : "text-red-600 font-semibold"
                                            }
                                        >

                                            {passwordStrength.text}

                                        </span>

                                    </div>


                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">

                                        <div

                                            className={
                                                passwordStrength.text === "Strong"

                                                    ? "bg-green-500 h-2 rounded-full"

                                                    : passwordStrength.text === "Medium"

                                                    ? "bg-yellow-500 h-2 rounded-full"

                                                    : "bg-red-500 h-2 rounded-full"
                                            }

                                            style={{
                                                width: passwordStrength.width
                                            }}

                                        ></div>

                                    </div>

                                </div>

                            )}


                            {/* Password Requirements */}

                            <div className="mt-3 text-sm space-y-1">

                                <p
                                    className={
                                        passwordRequirements.minLength
                                            ? "text-green-600"
                                            : "text-gray-500"
                                    }
                                >

                                    {passwordRequirements.minLength ? "✓" : "○"}

                                    {" "}At least 8 characters

                                </p>


                                <p
                                    className={
                                        passwordRequirements.uppercase
                                            ? "text-green-600"
                                            : "text-gray-500"
                                    }
                                >

                                    {passwordRequirements.uppercase ? "✓" : "○"}

                                    {" "}One uppercase letter

                                </p>


                                <p
                                    className={
                                        passwordRequirements.lowercase
                                            ? "text-green-600"
                                            : "text-gray-500"
                                    }
                                >

                                    {passwordRequirements.lowercase ? "✓" : "○"}

                                    {" "}One lowercase letter

                                </p>


                                <p
                                    className={
                                        passwordRequirements.number
                                            ? "text-green-600"
                                            : "text-gray-500"
                                    }
                                >

                                    {passwordRequirements.number ? "✓" : "○"}

                                    {" "}One number

                                </p>


                                <p
                                    className={
                                        passwordRequirements.special
                                            ? "text-green-600"
                                            : "text-gray-500"
                                    }
                                >

                                    {passwordRequirements.special ? "✓" : "○"}

                                    {" "}One special character (@$!%*?&)

                                </p>

                            </div>

                        </div>


                        {/* Confirm Password */}

                        <div>

                            <input

                                type="password"

                                name="confirmPassword"

                                placeholder="Confirm Password"

                                value={formData.confirmPassword}

                                onChange={handleChange}

                                required

                                className="w-full border rounded-lg p-3"

                            />


                            {formData.confirmPassword && (

                                <p
                                    className={
                                        passwordsMatch
                                            ? "text-green-600 text-sm mt-1"
                                            : "text-red-600 text-sm mt-1"
                                    }
                                >

                                    {passwordsMatch

                                        ? "✓ Passwords match"

                                        : "✗ Passwords do not match"

                                    }

                                </p>

                            )}

                        </div>


                        {/* Submit */}

                        <button

                            type="submit"

                            disabled={

                                loading ||

                                !isPasswordStrong ||

                                !passwordsMatch

                            }

                            className={`
                                w-full
                                py-3
                                rounded-lg
                                font-semibold
                                text-white
                                transition
                                ${
                                    loading ||
                                    !isPasswordStrong ||
                                    !passwordsMatch

                                        ? "bg-gray-400 cursor-not-allowed"

                                        : "bg-orange-600 hover:bg-orange-700"
                                }
                            `}

                        >

                            {loading

                                ? "Creating Account..."

                                : "Create Account"

                            }

                        </button>


                    </form>

                )}


                {/* ==================================
                    Login Link
                ================================== */}

                {!registeredUser && (

                    <div className="text-center mt-6">

                        Already have an account?

                        <Link

                            to="/login"

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