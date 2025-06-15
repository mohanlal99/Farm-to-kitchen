import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="px-6 md:px-20 py-10 ">
      <h1 className="text-4xl font-bold text-green-600  mb-6">About Farm To Kitchen</h1>

      <p className="text-lg mb-6">
        Farm To Kitchen is a platform that bridges the gap between local farmers and consumers.
        Our goal is to make fresh, locally-sourced food more accessible while supporting the hardworking farmers behind it.
      </p>

      <h2 className="text-2xl font-semibold text-green-600 mb-2">🌾 Our Mission</h2>
      <p className="mb-6">
        To create a transparent and fair supply chain by enabling direct trade between growers and buyers.
      </p>

      <h2 className="text-2xl font-semibold text-green-600 mb-2">🚜 Why It Matters</h2>
      <ul className="list-disc list-inside mb-6">
        <li>Empowers small-scale farmers.</li>
        <li>Ensures fresh, seasonal food for consumers.</li>
        <li>Reduces food waste and carbon footprint.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-green-600 mb-2">🥬 How It Works</h2>
      <ol className="list-decimal list-inside mb-6">
        <li>Farmers list their products with details.</li>
        <li>Consumers browse and place orders.</li>
        <li>Products are delivered or picked up locally.</li>
      </ol>

      <h2 className="text-2xl font-semibold  text-green-600 mb-2">🌍 Vision for the Future</h2>
      <p className="mb-10">
        We aim to foster a vibrant local food ecosystem where producers and consumers collaborate toward a healthier planet and community.
      </p>

      <div className="text-center">
        <p className="text-lg mb-4 text-green-600 font-semibold">Ready to support local farming?</p>
        <Link to="/register" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          Join Now
        </Link>
      </div>
    </div>
  );
};

export default About;
