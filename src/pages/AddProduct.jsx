import React, { useContext, useEffect, useState } from "react";
import useForm from "../hooks/useForm";
import uploadImageCloudinary from "../utils/cloudinary";
import { submitDataOnFirebase } from "../utils/firebase_database";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editProduct,
  productData,
  singlePproductById,
} from "../slices/productsSlice";

let initialForm = {
  product_images: [],
  product_name: "",
  description: "",
  price: 0,
  harvest_date: "",
  availability: "",
  tags: "Organic, Seasonal",
  category: "",
};

const AddProducts = () => {
  const dispatch = useDispatch();
  const { productById, data } = useSelector((state) => state.products);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");
  const navigate = useNavigate();

  const { form, handleSubmit, handleChange, resetForm } = useForm(
    initialForm,
    async function onSubmit(form) {
      setLoading(true);
      if (!file && !productId) {
        alert("Select Image");
      }
      try {
        let imagesUrl = form.product_images; // default to existing images

        if (file && file.length > 0) {
          imagesUrl = await uploadImageCloudinary(file); // upload new images
        }

        const updateForm = {
          ...form,
          product_images: imagesUrl, // only overwrite if new images exist
          uid: user.uid,
          username:user.fullname
        };
        console.log(updateForm);
        if (productId) {
          dispatch(editProduct({ id: productId, data: updateForm }));
          alert("Product updated successfully!");
          navigate("/products");
        } else {
          const res = await submitDataOnFirebase(updateForm);
          if (res) {
            alert("Data submitted successfully!");
            resetForm();
            setFile(null);
          }
        }
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  );
  const [file, setFile] = useState(null);

  const farmerCategories = [
    "Fruits",
    "Vegetables",
    "Dairy Products",
    "Grains & Cereals",
    "Poultry",
    "Meat & Livestock",
    "Seafood & Fish",
    "Herbs & Spices",
    "Flowers & Plants",
    "Nuts & Seeds",
    "Organic Products",
    "Tubers & Roots",
    "Honey & Bee Products",
    "Beverage Crops (e.g., Tea, Coffee)",
    "Legumes (e.g., Beans, Lentils)",
    "Oil Crops (e.g., Sunflower, Soybean)",
    "Mushrooms",
    "Eggs",
    "Processed Goods (e.g., Cheese, Yogurt, Pickles)",
    "Animal Feed & Fodder",
  ];

  const handleImageChange = (e) => {
    setFile(e.target.files);
  };

  useEffect(() => {
    if (data.length === 0) {
      dispatch(productData());
    }
  }, [dispatch]);

  useEffect(() => {
    if (productId && data.length > 0) {
      dispatch(singlePproductById(productId));
    }
  }, [productId, data, dispatch]);

  //  if there is id so update form with data and put req on firebase
  useEffect(() => {
    if (
      productId &&
      productById &&
      typeof productById === "object" &&
      Object.keys(productById).length > 0
    ) {
      resetForm({
        product_name: productById.product_name || "",
        description: productById.description || "",
        category: productById.category || "",
        price: Number(productById.price) || 0,
        harvest_date: productById.harvest_date || "",
        availability: productById.availability || "",
        tags: productById.tags || "Organic, Seasonal",
        product_images: productById.product_images || [],
      });
    }
  }, [productId, productById]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="font-bold text-3xl">🥕 Fresh From Local Farms 🥕</h1>
      <p className="text-sm text-gray-600">
        Explore a wide range of organic, seasonal, and farm-fresh products grown
        with care by local farmers near you.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex gap-2">
          {form.product_images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="product"
              className="w-20 h-20 object-cover"
            />
          ))}
        </div>
        <div className="flex flex-col mb-4">
          <label
            htmlFor="product_image"
            className="flex items-center font-semibold">
            <span>📷</span> Product Image Upload
          </label>
          <input
            type="file"
            name="product_image"
            accept="image/*"
            multiple
            onChange={(e) => handleImageChange(e)}
            className="border rounded-sm p-1"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label
            htmlFor="product_name"
            className="flex items-center font-semibold">
            <span>📝</span> Product Name
          </label>
          <input
            value={form.product_name}
            onChange={handleChange}
            type="text"
            name="product_name"
            placeholder="Enter product name"
            className="border rounded-sm p-2"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label
            htmlFor="description"
            className="flex items-center font-semibold">
            <span>🧾</span> Product Description
          </label>
          <textarea
            value={form.description}
            onChange={handleChange}
            name="description"
            placeholder="Enter product description"
            className="border rounded-sm p-2"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="price" className="flex items-center font-semibold">
            <span>💰</span> Price (per kg/unit)
          </label>
          <input
            value={form.price}
            onChange={handleChange}
            type="number"
            name="price"
            placeholder="Enter product price"
            className="border rounded-sm p-2"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label
            htmlFor="product_availability"
            className="flex items-center font-semibold">
            <span>📦</span> Availability
          </label>
          <input
            value={form.availability}
            onChange={handleChange}
            type="text"
            name="availability"
            placeholder="In stock / Out of stock / Quantity"
            className="border rounded-sm p-2"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label
            htmlFor="harvest_date"
            className="flex items-center font-semibold">
            <span>🕒</span> Harvest Date or Freshness Duration
          </label>
          <input
            value={form.harvest_date}
            onChange={handleChange}
            type="date"
            name="harvest_date"
            placeholder="e.g., Harvested on 10th June 2025"
            className="border rounded-sm p-2"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label
            htmlFor="product_tags"
            className="flex items-center font-semibold">
            <span>🏷️</span> Product Tags
          </label>
          <input
            value={form.tags}
            onChange={handleChange}
            type="text"
            name="tags"
            placeholder="e.g., Organic, Seasonal"
            className="border rounded-sm p-2"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="category" className="flex items-center font-semibold">
            <span>📍</span> Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border rounded-sm p-2">
            <option value="">Select a category</option>
            {farmerCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
            {loading ? "Submiting..." : "Submit Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
