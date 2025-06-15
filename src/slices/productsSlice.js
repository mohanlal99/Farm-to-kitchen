import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = import.meta.env.VITE_DATABASE_URL;

const productData = createAsyncThunk("products/productData", async () => {
  try {
    const response = await fetch(`${url}farm-products.json`);
    const result = await response.json();
    const data = Object.entries(result).map(([id, item]) => ({ id, ...item }));
    // console.log(data);
    data.reverse()
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${url}farm-products/${productId}.json`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete product");
      return productId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${url}farm-products/${id}.json`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to edit product");
      return { id, data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    filtered: [],
    userProduct: [],
    productById: {},
    error: null,
    loading: false,
  },
  reducers: {
    filterByCategory: (state, action) => {
      const category = action.payload;
      state.filtered = state.data.filter((item) => item.category === category);
    },
    sortByPrice: (state, action) => {
      const order = action.payload; // 'asc' or 'desc'
      state.filtered = [
        ...(state.filtered.length ? state.filtered : state.data),
      ].sort((a, b) => {
        return order === "asc"
          ? a.price - b.price
          : order == "desc"
          ? b.price - a.price
          : order == "name"
          ? a.product_name.localeCompare(b.product_name)
          : a.category.localeCompare(b.category);
      });
    },
    searchByCategoryOrName(state, action) {
      if (!action.payload) return;
      // console.log(action.payload)
      state.filtered = state.data.filter((item) => {
        if (
          item.product_name.toLowerCase().includes(action.payload) ||
          item.category.toLowerCase().includes(action.payload)
        ) {
          return item;
        }
      });
    },
    productFilterByUser: (state, action) => {
      state.userProduct = state.data.filter((item) => {
        // console.log(action.payload , item)
        return item.uid === action.payload;
      });
      // console.log(action)
      // state.userProduct = state.data
    },
    singlePproductById(state, action) {
     state.productById = state.data.find(item => item.id === action.payload) || {};
    },
    clearFilters: (state) => {
      state.filtered = [];
      state.productById = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productData.pending, (state) => {
        state.loading = true;
      })
      .addCase(productData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(productData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = { id: action.payload.id, ...action.payload.data };
        }
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  filterByCategory,
  sortByPrice,
  productFilterByUser,
  searchByCategoryOrName,
  singlePproductById,

  clearFilters,
} = productSlice.actions;
export default productSlice.reducer;
export { productData, deleteProduct, editProduct };
