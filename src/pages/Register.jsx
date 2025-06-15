import React, { useEffect, useReducer, useState } from "react";
import useToggle from "../hooks/useToggle";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import Model from "../components/ui/Model";
import { doc, setDoc } from "firebase/firestore";

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };
    case "FORM_ERROR":
      return { ...state, error: action.payload , loading:false };
    case "SUCCESS":
      return { ...state, success:true, error: null , loading:false };
    default:
      return state
  }
}

const Register = () => {
  const { toggle, handleToggle } = useToggle(true);
  const [contory, setContory] = useState([]);
   const [showModal, setShowModal] = useState(false)
   const navigate = useNavigate()
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: null,
    success:false
  });
  const { form, handleChange , handleSubmit, resetForm} = useForm(
    {
      fullname: "",
      email:'',
      password:'',
      phone:"",
      contory:''
      ,city:'',
      address:'',
      role:toggle?'farmer':'consumer',
      terms:true
    },
    async function onSubmit(form) {
      
      dispatch({type:'LOADING'})
      try {
        const {email , password} = form
        const useCredential = await createUserWithEmailAndPassword(auth , email , password)
        const user = useCredential.user
        if(user.uid){
          await setDoc(doc(db , "farm-users" , user.uid),form)
          dispatch({type:'SUCCESS'})
          setShowModal(true)
          resetForm()
          setTimeout(()=>{
            navigate('/sign-in')
          },2000)
        }
      } catch (error) {
        dispatch({type:"FORM_ERROR",payload:error.message})
        console.log(error)
      }
    }
  );

  useEffect(()=>{
    resetForm()
  },[toggle])

  async function getContories() {
    fetch("https://restcountries.com/v3.1/all?fields=name")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => country.name.common).sort();
        setContory(countries);
      })
      .catch((error) => console.error("Error fetching country list:", error));
  }
  useEffect(() => {
    getContories();
  }, []);
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {/* Left Side - Farmer Info */}
    {showModal&&<Model message={`${toggle?"Farmer":"Consumer"} Registration successful!`} success={state.success} onClose={()=>setShowModal(false)}/>}
      <div className="flex flex-col items-center md:items-start text-center md:text-left relative h-full -z-10">
        <img
          src="/farmer-image.jpg"
          alt="Farmer"
          className="w-full -z-10 rounded mb-4 object-cover h-full absolute"
        />

        <div className="p-6 flex flex-col justify-around backdrop-blur-[3px] h-full font-bold text-xl text-amber-300 relative z-10">
          <h2 className="font-semibold text-4xl">
            👨‍🌾 Join as a {toggle ? "Farmer" : "Consumer"}
          </h2>
          <p className="text-base ">
            📋 Register your farm to reach local and global buyers.
          </p>
          <p className="text-base ">
            🧑‍💻 Create your profile and manage your produce listings with ease.
          </p>
          <p className="text-base ">
            🔐 Uploading ID is optional but helps build trust with buyers.
          </p>
          <p className="text-base">
            🌱 Empower your community and grow your farm network.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="p-4 border rounded w-full gap-10">
        {/* <h1 className="text-lg font-semibold mb-6">Register Farmer  Consumer</h1> */}
        <div className="w-full flex mb-4">
          <button
            onClick={() => handleToggle()}
            className=" p-3 w-1/2 ml-3 hover:bg-gray-800 bg-gray-900 font-bold leading-tight first-letter:text-amber-700 cursor-pointer  text-white ">
            Register {!toggle ? "Farmer" : "Consumer"}
          </button>
        </div>
        <div className="text-center mb-4">
          <h1 className="text-2xl font-semibold">
            {toggle ? "Register as a Farmer 👨‍🌾" : "Register as a Consumer 🛒"}
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              name="fullname"
              onChange={(e)=>handleChange(e)}
              value={form.fullname}
              placeholder="Enter your full name"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
            required
              type="email"
              name="email"
              onChange={(e)=>handleChange(e)}
              value={form.email}
              placeholder="Enter your email"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
            required
              type="password"
              name="password"
              onChange={(e)=>handleChange(e)}
              value={form.password}
              placeholder="Enter your password"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Phone Number</label>
            <input
              type="number"
              name="phone"
              onChange={(e)=>handleChange(e)}
              value={form.phone}
              placeholder="987654321"
              className="w-full p-2 border rounded"
            />
          </div>

          {!toggle && (
            <>
              <select
                name="country"
                value={form.country}
                onChange={(e)=>handleChange(e)}
                className="w-1/2 border-1 rounded-sm p-2">
                {contory.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </>
          )}

          <div>
            <label className="block text-sm mb-1">City</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={(e)=>handleChange(e)}
              placeholder="City"
              className="w-full p-2 border rounded"
            />
          </div>
          {!toggle && (
            <div>
              <label className="block text-sm mb-1">Delivery Address</label>
              <textarea
                type="text"
                onChange={(e)=>handleChange(e)}
                value={form.address}
                name="address"
                placeholder="Delivery Address"
                className="w-full p-2 border rounded"></textarea>
            </div>
          )}
          <div className=" ">
            <label className=" text-sm mb-1 flex gap-2 w-fit">
              <input
                type="checkbox"
                name="terms"
                onChange={(e)=>handleChange(e)}
                value={form.terms}
                checked
                placeholder="City"
                className=" p-2 border rounded"
              />
              Terms & Conditions / Privacy Policy{" "}
            </label>
          </div>
          {state.error&&<p className="text-sm text-red-500">{state.error}</p>}
          <button
          disabled={state.loading}
            type="submit"
            className="w-full disabled:bg-gray-500 cursor-pointer p-2 border rounded text-sm font-medium">
            {
              state.loading?"Submiting...":"Submit"
            }
          </button>
          <div>
            Already have an account!{" "}
            <Link className="text-blue-500" to={"/sign-in"}>
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
 