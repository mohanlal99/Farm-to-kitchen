import React, { useContext, useEffect } from "react";
import ProductCard from "../components/ui/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { productData, productFilterByUser } from "../slices/productsSlice";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Products = () => {
  const { user } = useContext(AuthContext);
  const { data, userProduct, loading, error } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productData());
  }, []);

  useEffect(() => {
    dispatch(productFilterByUser(user.uid));
  }, [data]);
  const grouped = userProduct.reduce((acc, prod) => {
    (acc[prod.category] = acc[prod.category] || []).push(prod);
    return acc;
  }, {});
  // console.log(user.uid);
  // console.log(loading);
  // console.log(data.length);
  return (
    <div className="p-4 md:p-8">
      {error && <div>{error.message}</div>}
      {loading && <div>Loading...</div>}
      <div>
        <Link
          className="block p-3   bg-blue-500 w-fit text-white font-bold  rounded-md animation duration-200 transform hover:translate-y-0.5"
          to={"/add-product"}>
          Add Product
        </Link>
      </div>
      <div className="mb-4 mt-6 p-4 bg-green-100 rounded-md shadow-sm border border-green-300">
        <h2 className="text-xl font-semibold text-green-800">
          🌿 Welcome Back, {user.fullname}!
        </h2>
        <p className="text-sm text-green-700 mt-2">
          Keep your product listings fresh and up to date! Don’t forget to:
        </p>
        <ul className="list-disc pl-6 mt-2 text-sm text-green-700 space-y-1">
          <li>Add new seasonal produce to attract more buyers.</li>
          <li>Upload clear, high-quality images of your harvest.</li>
          <li>Update availability and harvest dates regularly.</li>
          <li>
            Use tags like <strong>"organic"</strong>,{" "}
            <strong>"pesticide-free"</strong>, or <strong>"local"</strong> to
            improve visibility.
          </li>
          <li>
            Share tips or recipes in your product descriptions to build trust
            and connection.
          </li>
        </ul>
      </div>
      <h2 className="text-2xl font-bold text-green-600  text-center ">Your Harvest Listings</h2>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3 pt-5">
        {userProduct.length === 0 ? (
          <div>No Products Found</div>
        ) : (
          userProduct.map(
            ({
              id,
              price,
              category,
              product_name,
              description,
              availability,
              harvest_date,
              product_images,
              tags,
              uid,
            }) => (
              <ProductCard
                key={id}
                username={user.fullname}
                role={user.role}
                price={price}
                user_id={user.uid}
                category={category}
                product_name={product_name}
                description={description}
                harvest_date={harvest_date}
                tags={tags}
                productId={id}
                uid={uid}
                availability={availability}
                imageUrl={product_images[0]}
              />
            )
          )
        )}
      </div>
    </div>
  );
};

export default Products;
