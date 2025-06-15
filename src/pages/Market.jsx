import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import {
  clearFilters,
  productData,
  searchByCategoryOrName,
  sortByPrice,
} from "../slices/productsSlice";
import ProductCard from "../components/ui/ProductCard";
import useDebounce from "../hooks/useDebounce";
import { ArrowDown01Icon, ArrowUp01Icon, Bold, DollarSign, ListFilterPlusIcon, LucideRefreshCcwDot, SortDescIcon, X } from "lucide-react";

const Market = () => {
  const { user } = useContext(AuthContext);
  const { data, filtered, loading, error } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const debounce = useDebounce(search, 1000);
  useEffect(() => {
    dispatch(productData());
  }, []);

  function sortBy(key) {
    dispatch(sortByPrice(key));
  }

  const grouped =
    filtered.length === 0
      ? data.reduce((acc, prod) => {
          (acc[prod.category] = acc[prod.category] || []).push(prod);
          return acc;
        }, {})
      : filtered.reduce((acc, prod) => {
          (acc[prod.category] = acc[prod.category] || []).push(prod);
          return acc;
        }, {});

  useEffect(() => {
    if (debounce === "") dispatch(clearFilters());
    dispatch(searchByCategoryOrName(debounce));
    // console.log("runing")
  }, [debounce]);

  function handleSearch(e) {
    setSearch(e.target.value);
  }
  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold text-green-600 mb-2">
        🛒 Farm Fresh Marketplace
      </h1>
      <p className="text-gray-600 mb-6">
        Discover fresh, local, and organic produce directly from nearby farmers.
        Support local agriculture and enjoy healthy food!
      </p>

      <div className="bg-yellow-100 p-4 rounded-lg mb-6 shadow">
        <h2 className="text-xl font-bold text-yellow-800">
          🌼 Seasonal Favorites
        </h2>
        <p className="text-sm text-yellow-700">
          Peaches, tomatoes, and fresh herbs are at their peak this week! Don’t
          miss out on the best of early summer produce.
        </p>
      </div>
      <div className="sorting flex flex-col sm:flex-row items-end justify-end gap-2 w-full ">
        <button onClick={()=>sortBy("asc")} className="flex w-full  items-center justify-center border-2 rounded-md mb-2 p-2 cursor-pointer duration-300 ease-in-out  hover:bg-green-600 hover:text-white gap-2"><DollarSign size={20}/> Sort by Price <ArrowUp01Icon size={20}/></button>
        <button onClick={()=>sortBy("desc")} className="flex w-full  items-center justify-center border-2 rounded-md mb-2 p-2 cursor-pointer duration-300 ease-in-out  hover:bg-green-600 hover:text-white gap-2"><DollarSign size={20}/> Sort by Price <ArrowDown01Icon size={20}/></button>
        <button onClick={()=>sortBy("name")} className="flex w-full  items-center justify-center border-2 rounded-md mb-2 p-2 cursor-pointer duration-300 ease-in-out  hover:bg-green-600 hover:text-white gap-2"><ListFilterPlusIcon size={20}/> Category</button>
        <button onClick={()=>sortBy()} className="flex w-full  items-center justify-center border-2 rounded-md mb-2 p-2 cursor-pointer duration-300 ease-in-out  hover:bg-green-600 hover:text-white gap-2"><SortDescIcon size={20}/> Name</button>
        <button onClick={()=>dispatch(clearFilters())} className="flex w-full  items-center justify-center border-2 rounded-md mb-2 p-2 cursor-pointer duration-300 ease-in-out  hover:bg-green-600 hover:text-white gap-2"><LucideRefreshCcwDot size={20}/> Clear Filter</button>
      </div>
      <div className="bg-white rounded-xl shadow p-4 ">
        <p className="text-gray-700 font-medium flex items-center justify-center gap-2">
          🔍
          <input
            value={search}
            onChange={handleSearch}
            type="text"
            placeholder="Search... (Name or category) "
            className="w-full outline-none text-xl font-medium "
          />
          <button
            onClick={() => setSearch("")}
            className="bg--500 p-1 px-2 flex items-center gap-1 rounded-md cursor-pointer duration-200 transform ease-in-out hover:scale-3d"
            disabled={!search}>
            {search && (
              <X
                size={20}
                fontWeight={900}
                color="white"
                className="font-extrabold text- bg-red-500 rounded-full"
              />
            )}
          </button>
        </p>
      </div>

      <div className="grid ">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-lg font-bold my-4">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <ProductCard
                  username={item.username}
                  key={item.id}
                  productId={item.id}
                  role={user.role}
                  price={item.price}
                  category={item.category}
                  product_name={item.product_name}
                  description={item.description}
                  harvest_date={item.harvest_date}
                  tags={item.tags}
                  uid={item.uid}
                  availability={item.availability}
                  imageUrl={item.product_images[0]}
                />
              ))}
            </div>
          </div>
        ))}

        {/* <div className="h-48 bg-gray-100 border border-dashed rounded-lg flex items-center justify-center text-gray-400">
          Product Card 1
        </div>
        <div className="h-48 bg-gray-100 border border-dashed rounded-lg flex items-center justify-center text-gray-400">
          Product Card 2
        </div>
        <div className="h-48 bg-gray-100 border border-dashed rounded-lg flex items-center justify-center text-gray-400">
          Product Card 3
        </div>
        <div className="h-48 bg-gray-100 border border-dashed rounded-lg flex items-center justify-center text-gray-400">
          Product Card 4
        </div> */}
      </div>
      <div className="bg-green-50 p-4 mt-5 rounded-lg mb-6 border border-green-200">
        <h3 className="font-semibold text-green-800">🍽 Did You Know?</h3>
        <p className="text-sm text-green-700">
          Buying local reduces your carbon footprint and keeps nutrients in your
          food higher. Store leafy greens in a damp paper towel to keep them
          fresh longer!
        </p>
      </div>
    </div>
  );
};

export default Market;
