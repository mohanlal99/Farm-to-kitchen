import React from 'react'
import { ShoppingCart, Leaf, MapPin, UserPlus, Tractor } from 'lucide-react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="  min-h-screen py-10 px-4 md:px-20">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-blue-900 mb-4 flex justify-center items-center gap-4">
          <Leaf size={48} className="text-green-600" />
          Farm To Kitchen
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          Connecting farmers and consumers — fresh, local, sustainable.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link to="/market" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow text-lg">
            <ShoppingCart className="inline mr-2" /> Shop Now
          </Link>
          <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow text-lg">
            <UserPlus className="inline mr-2" /> Join as Farmer
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <MapPin size={40} className="mx-auto text-blue-600 mb-4" />
          <h3 className="text-xl font-bold text-blue-800">Local Sourcing</h3>
          <p className="text-gray-600">Buy from farmers near you for faster, fresher delivery.</p>
        </div>
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <Leaf size={40} className="mx-auto text-green-600 mb-4" />
          <h3 className="text-xl font-bold text-green-800">Sustainable Produce</h3>
          <p className="text-gray-600">Support eco-friendly and organic farming practices.</p>
        </div>
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <Tractor size={40} className="mx-auto text-yellow-600 mb-4" />
          <h3 className="text-xl font-bold text-yellow-700">Empower Farmers</h3>
          <p className="text-gray-600">Enable small farmers to grow their businesses online.</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-blue-800">Ready to make a difference?</h2>
        <p className="mt-2 text-gray-700">Whether you're a farmer or a foodie, join our mission.</p>
        <div className="mt-4">
          <Link to="/register" className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 text-lg">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
