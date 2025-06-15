import { Delete, FileEdit } from "lucide-react";
import useToggle from "../../hooks/useToggle";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearFilters, deleteProduct, singlePproductById } from "../../slices/productsSlice";
import CardModel from "./CardModel";

const ProductCard = ({
  product_name,
  role,
  username,
  description,
  price,
  productId,
  user_id,
  category,
  availability,
  harvest_date,
  tags,
  uid,
  imageUrl = "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/1.png", // placeholder
}) => {
  const { toggle, handleToggle } = useToggle(false);
  const { productById } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  // console.log(productId)
  const getAvailabilityStatus = () => {
    if (availability === "Out of Stock") return "Out of Stock ❌";

    if (!harvest_date) return availability;

    const today = new Date().setHours(0, 0, 0, 0);
    const harvestDate = new Date(harvest_date).setHours(0, 0, 0, 0);

    if (harvestDate < today) return "Expired ❌";
    return `${
      availability === "In Stock" ? "In Stock ✅" : "Out of stock ❌"
    } `;
  };

  function handleAddCart(id) {
    dispatch(singlePproductById(id));
  }
  function handleClose(){
    dispatch(clearFilters())
  }

  return (
    <div
      className="relative flex w-full h-fit md:w-96 max-w-full flex-none scroll-ml-6 flex-col gap-2 rounded-xl bg-white p-4 shadow-md snap-start"
      id={uid}>
      {/* Model add cart */}
      {productById?.uid&&<CardModel product={productById} onclose={handleClose} />}



      {/* Close or Favorite Button */}
      <div className="flex items-center justify-between">
        <div className="bg-gray-100 px-2 rounded-md font-bold capitalize">
          {username}
        </div>
        <button
          type="button"
          onClick={handleToggle}
          className="z-20 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-500"
            width="16"
            height="16"
            viewBox="0 0 24 24">
            <path
              fill={toggle ? "red" : "gray"}
              d="M9.153 5.408C10.42 3.136 11.053 2 12 2s1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182s.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506s-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452s-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882S3.58 8.328 6.04 7.772l.636-.144c.699-.158 1.048-.237 1.329-.45s.46-.536.82-1.182z"
            />
          </svg>
        </button>
      </div>
      <div className="text-gray-600 text-sm font-bold line-clamp-2">
        {description}
      </div>

      {/* Image */}
      <div className="relative flex h-52 w-full items-center justify-center rounded-md bg-gray-100 overflow-hidden">
        <img
          src={imageUrl}
          alt={product_name}
          className="object-contain h-full w-full p-4 transition-transform duration-300 hover:scale-110"
        />
       <div className="absolute right-1 top-1 flex justify-center items-center">
        <button className="bg-green-600 text-white px-1 rounded-full shadow-md transform transition duration-500 hover:scale-105">
          Get Extra 10% Off
        </button>
      </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-1 px-1">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-semibold text-gray-800">
            {product_name}
          </h3>
          <p className="text-md font-medium text-gray-500">
            &#8377;{price} per kg/unit
          </p>
        </div>
        {/* <p className="text-sm line-clamp-2 text-green-600">{description}</p> */}
        <ul className="text-xs grid md:grid-cols-2 gap-2 text-gray-400">
          <li className="line-clamp-1">
            <strong>Category:</strong> {category}
          </li>
          <li className="line-clamp-1">
            <strong>Tags:</strong> {tags}
          </li>
          <li>
            <strong>Freshness:</strong> {harvest_date}
          </li>
          <li>
            <strong>Status:</strong>{" "}
            <span
              className={`font-semibold ${
                getAvailabilityStatus().includes("Expired")
                  ? "text-red-500"
                  : getAvailabilityStatus().includes("Out")
                  ? "text-yellow-500"
                  : "text-green-600"
              }`}>
              {getAvailabilityStatus()}
            </span>
          </li>
        </ul>
        {role === "farmer" && user_id === uid && (
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              to={`/add-product?id=${productId}`}
              className="p-1 flex gap-0 w-full text-center justify-center text-white rounded-md cursor-pointer bg-blue-600  px-2">
              <FileEdit /> Edit
            </Link>
            <button
              onClick={() => {
                if (confirm("Are you sure delete the product")) {
                  dispatch(deleteProduct(productId));
                }
              }}
              className="p-1 flex gap-0 w-full text-center justify-center  text-white rounded-md cursor-pointer bg-red-600  px-2">
              <Delete /> Delete
            </button>
          </div>
        )}
        {role === "consumer" &&
          !getAvailabilityStatus().includes("Expired") && (
            <button
              type="button"
              onClick={() => handleAddCart(productId)}
              className="mt-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition cursor-pointer">
              Add to Cart
            </button>
          )}
      </div>
    </div>
  );
};

export default ProductCard;
