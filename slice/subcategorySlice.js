import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for API calls
export const fetchSubCategories = createAsyncThunk(
  'categories/fetchSubCategories',
  async () => {
    const response = await fetch(`${process.env.API}/admin/subcategory`);
    const data=await response.json();
    console.log("response",data)
    return data
  }
);

export const addSubCategory = createAsyncThunk(
  'categories/addSubCategory',
  async (newCategory) => {
    const response = await fetch(`${process.env.API}/admin/subcategory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newCategory }),
    });
    return response.json();
  }
);

export const updateSubCategory = createAsyncThunk(
  'categories/updateSubCategory',
  async ({ id, name }) => {
    const response = await fetch(`${process.env.API}/admin/subcategory/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name }),
    });
    return response.json();
  }
);

export const deleteSubCategory = createAsyncThunk(
  'categories/deleteSubCategory',
  async (id) => {
    await fetch(`${process.env.API}/admin/subcategory/${id}`, { method: 'DELETE' });
    return id;
  }
);

const subcategorySlice = createSlice({
  name: 'subcategories',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchSubCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add category
      .addCase(addSubCategory.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // Update category
      .addCase(updateSubCategory.fulfilled, (state, action) => {
        const index = state.list.findIndex((cat) => cat._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      // Delete category
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.list = state.list.filter((cat) => cat._id !== action.payload);
      });
  },
});

export default subcategorySlice.reducer;
