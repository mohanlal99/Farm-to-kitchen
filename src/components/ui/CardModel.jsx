import {
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {  X } from "lucide-react";
import { useContext, useState } from "react";
import { db } from "../../utils/firebase";
import { AuthContext } from "../../context/AuthContext";
import { clearFilters } from "../../slices/productsSlice";
import { useDispatch } from "react-redux";

export default function CardModel({ product, onclose }) {
  const [quantity, setQuantity] = useState(1);
  const id = product?.uid || null;
  const { user } = useContext(AuthContext);
  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(1, Number(e.target.value) || 1);
    setQuantity(newQuantity);
  };

  const totalPrice = product.price * quantity;
  const discountPrice =
    totalPrice >= 300 ? (totalPrice * 0.9).toFixed(2) : totalPrice.toFixed(2);
  const dispatch = useDispatch()
  async function addProductInCart() {
    let cartProduct = {
      ...product,
      total_price: totalPrice>=300 ? discountPrice : totalPrice,
      quantity,
    };
    delete cartProduct.description;

    await updateDoc(doc(db, "farm-users", user.uid), {
      cart: arrayUnion(cartProduct),
    });
    // await updateDoc(doc(db, "farm-users", id), {
    //   order: arrayUnion(cartProduct),
    // });
    alert("Updated successfully");
    dispatch(clearFilters())
  }

  return (
    <div className="fixed top-0 left-0 flex bg-[rgba(31,41,55,0.1)] z-50 w-full h-full items-center justify-center">
      <div className="flex flex-col opacity-100 gap-4 relative bg-white rounded-xl shadow-md w-96 lg:min-h-[340px] p-4">
        <div className="relative w-full h-48 mb-4 sm:mb-0">
          <img
            src={product.product_images[0]}
            alt={product.product_name}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>

        <div className="flex flex-col justify-between flex-1 gap-2">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {product.product_name}
            </h2>
            <p className="text-sm text-gray-500">{product.description}</p>
          </div>

          <div className="flex items-center gap-3 text-base">
            {/* Show original price with strikethrough and discounted price */}
            {totalPrice >= 300 ? (
              <span className="flex flex-col">
                <span className="text-sm text-gray-500 line-through">
                  ₹{totalPrice}
                </span>
                <span className="text-lg font-semibold text-gray-800">
                  ₹{discountPrice}
                </span>
                <span className="text-green-600 text-sm font-bold">
                  10% off applied
                </span>
              </span>
            ) : (
              <span className="text-lg font-semibold text-gray-800">
                ₹{totalPrice}
              </span>
            )}
            <div className="flex items-center gap-2 font-bold">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="w-8 h-8 flex items-center justify-center text-sm font-medium rounded-full border border-gray-300 hover:bg-gray-100">
                -
              </button>

              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-12 outline-none font-bold text-xl text-center "
              />

              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="w-8 h-8 flex items-center justify-center text-sm font-medium rounded-full border border-gray-300 hover:bg-gray-100">
                +
              </button>
            </div>
            kg / unit
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={addProductInCart}
              className="border w-full cursor-pointer bg-green-600 border-green-600 text-white-600 px-4 py-2 rounded-full text-sm hover:bg-green-700 text-white duration-300 ease-in transition">
              Add to bag
            </button>
          </div>
        </div>

        <button
          onClick={onclose}
          className="absolute top-2 right-2 bg-amber-50 cursor-pointer p-1 rounded-full text-gray-400 hover:text-red-500">
          <X size={30} />
        </button>
      </div>
    </div>
  );
}
