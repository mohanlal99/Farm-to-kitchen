import React, { useReducer, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import Model from "../components/ui/Model";

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    case "SUCCESS":
      return { ...state, loading: false, error: null, success: true };
    default:
      return state;
  }
}

const SignIn = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: null,
    success: false,
  });
  const [showModal, setShowModal] = useState(false);

  const { form, handleChange, handleSubmit } = useForm(
    {
      email: "",
      password: "",
    },
    async function onSubmit(form) {
      dispatch({ type: "LOADING" });
      try {
        await signInWithEmailAndPassword(auth, form.email, form.password);
        dispatch({ type: "SUCCESS" });
        setShowModal(true);
        setTimeout(() => {
          navigate("/dashboard"); // update this route as needed
        }, 1500);
      } catch (error) {
        dispatch({ type: "ERROR", payload: error.message });
        console.error(error);
      }
    }
  );

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow-md">
      {showModal && (
        <Model
          message="Login successful!"
          success={state.success}
          onClose={() => setShowModal(false)}
        />
      )}
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            className="w-full p-2 border rounded"
          />
        </div>

        {state.error && (
          <p className="text-sm text-red-500">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={state.loading}
          className="w-full p-2 bg-blue-600 text-white font-semibold rounded disabled:bg-gray-400"
        >
          {state.loading ? "Signing In..." : "Sign In"}
        </button>

        <div className="text-center text-sm mt-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
