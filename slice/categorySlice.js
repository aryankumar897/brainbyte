
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
// Importing createSlice and createAsyncThunk from Redux Toolkit
// - createSlice: Helps in creating a slice of Redux state with reducers
// - createAsyncThunk: Allows handling async operations like API calls

// Async thunks for API calls (used for making asynchronous requests)

// Fetch categories from the API
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories', // Unique action type for fetching categories
  async () => {
    const response = await fetch(`${process.env.API}/admin/category`); 
    // Sends a GET request to fetch categories from the backend API
    return response.json(); 
    // Converts response data to JSON format and returns it
  }
);

// Add a new category to the database
export const addCategory = createAsyncThunk(
  'categories/addCategory', // Unique action type for adding a category
  async (newCategory) => {
    const response = await fetch(`${process.env.API}/admin/category`, {
      method: 'POST', // Sends a POST request to add a new category
      headers: { 'Content-Type': 'application/json' }, // Ensures the request body is in JSON format
      body: JSON.stringify({ name: newCategory }), // Sends the new category name as the request body
    });
    return response.json(); 
    // Converts response data to JSON and returns it
  }
);

// Update an existing category by ID
export const updateCategory = createAsyncThunk(
  'categories/updateCategory', // Unique action type for updating a category
  async ({ id, name }) => {
    const response = await fetch(`${process.env.API}/admin/category/${id}`, {
      method: 'PUT', // Sends a PUT request to update an existing category
      headers: { 'Content-Type': 'application/json' }, // Ensures the request body is in JSON format
      body: JSON.stringify({ id, name }), // Sends the updated category name and ID in the request body
    });
    return response.json(); 
    // Converts response data to JSON and returns it
  }
);

// Delete a category by ID
export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory', // Unique action type for deleting a category
  async (id) => {
    await fetch(`${process.env.API}/admin/category/${id}`, { method: 'DELETE' });
    // Sends a DELETE request to remove the category with the given ID
    return id; // Returns the deleted category's ID to update the Redux state
  }
);

// Creating the category slice using createSlice
const categorySlice = createSlice({
  name: 'categories', // Name of the slice, used in Redux actions
  initialState: { // Defining the initial state of the category slice
    list: [], // Stores the list of categories
    loading: false, // Tracks loading state for API calls
    error: null, // Stores error messages if an API call fails
  },
  reducers: {}, // No regular reducers, as async logic is handled separately
  extraReducers: (builder) => { // Handles asynchronous actions using createAsyncThunk
    builder
      // Handling fetchCategories actions
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true; // Set loading to true when fetching starts
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false; // Stop loading when fetch is successful
        state.list = action.payload; // Store fetched categories in state
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false; // Stop loading when fetch fails
        state.error = action.error.message; // Store error message
      })

      // Handling addCategory action
      .addCase(addCategory.fulfilled, (state, action) => {
        state.list.push(action.payload); 
        // Add the newly created category to the list
      })

      // Handling updateCategory action
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.list.findIndex((cat) => cat._id === action.payload._id);
        // Find the index of the category to update
        if (index !== -1) {
          state.list[index] = action.payload; 
          // Update the category in the state
        }
      })

      // Handling deleteCategory action
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.list = state.list.filter((cat) => cat._id !== action.payload);
        // Remove the deleted category from the state
      });
  },
});

export default categorySlice.reducer; 
// Exporting the reducer function to be used in the Redux store













































// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Async thunks for API calls
// export const fetchCategories = createAsyncThunk(
//   'categories/fetchCategories',
//   async () => {
//     const response = await fetch(`${process.env.API}/admin/category`);
//     return response.json();
//   }
// );

// export const addCategory = createAsyncThunk(
//   'categories/addCategory',
//   async (newCategory) => {
//     const response = await fetch(`${process.env.API}/admin/category`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name: newCategory }),
//     });
//     return response.json();
//   }
// );

// export const updateCategory = createAsyncThunk(
//   'categories/updateCategory',
//   async ({ id, name }) => {
//     const response = await fetch(`${process.env.API}/admin/category/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id, name }),
//     });
//     return response.json();
//   }
// );

// export const deleteCategory = createAsyncThunk(
//   'categories/deleteCategory',
//   async (id) => {
//     await fetch(`${process.env.API}/admin/category/${id}`, { method: 'DELETE' });
//     return id;
//   }
// );

// const categorySlice = createSlice({
//   name: 'categories',
//   initialState: {
//     list: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch categories
//       .addCase(fetchCategories.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.loading = false;
//         state.list = action.payload;
//       })
//       .addCase(fetchCategories.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })

//       // Add category
//       .addCase(addCategory.fulfilled, (state, action) => {
//         state.list.push(action.payload);
//       })

//       // Update category
//       .addCase(updateCategory.fulfilled, (state, action) => {
//         const index = state.list.findIndex((cat) => cat._id === action.payload._id);
//         if (index !== -1) {
//           state.list[index] = action.payload;
//         }
//       })

//       // Delete category
//       .addCase(deleteCategory.fulfilled, (state, action) => {
//         state.list = state.list.filter((cat) => cat._id !== action.payload);
//       });
//   },
// });

// export default categorySlice.reducer;
