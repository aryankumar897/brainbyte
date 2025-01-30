


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Importing necessary functions from Redux Toolkit:
// - createSlice: Helps manage state and reducers
// - createAsyncThunk: Handles asynchronous API requests

// Async thunks for API calls related to subcategories

// Fetch all subcategories from the API
export const fetchSubCategories = createAsyncThunk(
  'categories/fetchSubCategories', // Unique action type for fetching subcategories
  async () => {
    const response = await fetch(`${process.env.API}/admin/subcategory`);
    // Sends a GET request to fetch all subcategories from the API

    const data = await response.json(); 
    // Converts the API response into JSON format

    console.log("response", data); // Logs the response to the console for debugging

    return data; 
    // Returns the fetched subcategories to be used in the Redux state
  }
);

// Add a new subcategory
export const addSubCategory = createAsyncThunk(
  'categories/addSubCategory', // Unique action type for adding a subcategory
  async (newCategory) => {
    const response = await fetch(`${process.env.API}/admin/subcategory`, {
      method: 'POST', // Sends a POST request to add a new subcategory
      headers: { 'Content-Type': 'application/json' }, // Ensures the request body is in JSON format
      body: JSON.stringify({ name: newCategory }), 
      // Sends the new subcategory name as the request body
    });

    return response.json(); 
    // Converts the response data to JSON and returns it
  }
);

// Update an existing subcategory by ID
export const updateSubCategory = createAsyncThunk(
  'categories/updateSubCategory', // Unique action type for updating a subcategory
  async ({ id, name }) => {
    const response = await fetch(`${process.env.API}/admin/subcategory/${id}`, {
      method: 'PUT', // Sends a PUT request to update an existing subcategory
      headers: { 'Content-Type': 'application/json' }, // Ensures the request body is in JSON format
      body: JSON.stringify({ id, name }), 
      // Sends the updated subcategory name and ID in the request body
    });

    return response.json(); 
    // Converts response data to JSON and returns it
  }
);

// Delete a subcategory by ID
export const deleteSubCategory = createAsyncThunk(
  'categories/deleteSubCategory', // Unique action type for deleting a subcategory
  async (id) => {
    await fetch(`${process.env.API}/admin/subcategory/${id}`, { method: 'DELETE' });
    // Sends a DELETE request to remove the subcategory with the given ID

    return id; 
    // Returns the deleted subcategory's ID to update the Redux state
  }
);

// Creating the subcategory slice using createSlice
const subcategorySlice = createSlice({
  name: 'subcategories', // Name of the slice, used in Redux actions
  initialState: { // Defining the initial state for subcategories
    list: [], // Stores the list of subcategories
    loading: false, // Tracks loading state for API calls
    error: null, // Stores error messages if an API call fails
  },
  reducers: {}, // No direct reducers needed as async logic is handled in extraReducers
  extraReducers: (builder) => { // Handling asynchronous actions
    builder
      // Handling fetchSubCategories actions
      .addCase(fetchSubCategories.pending, (state) => {
        state.loading = true; // Set loading to true when fetching starts
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.loading = false; // Stop loading when fetch is successful
        state.list = action.payload; // Store fetched subcategories in state
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.loading = false; // Stop loading when fetch fails
        state.error = action.error.message; // Store error message
      })

      // Handling addSubCategory action
      .addCase(addSubCategory.fulfilled, (state, action) => {
        state.list.push(action.payload); 
        // Add the newly created subcategory to the list
      })

      // Handling updateSubCategory action
      .addCase(updateSubCategory.fulfilled, (state, action) => {
        const index = state.list.findIndex((sub) => sub._id === action.payload._id);
        // Find the index of the subcategory to update

        if (index !== -1) {
          state.list[index] = action.payload; 
          // Update the subcategory in the state
        }
      })

      // Handling deleteSubCategory action
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.list = state.list.filter((sub) => sub._id !== action.payload);
        // Remove the deleted subcategory from the state
      });
  },
});

export default subcategorySlice.reducer; 
// Exporting the reducer function to be used in the Redux store













































// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Async thunks for API calls
// export const fetchSubCategories = createAsyncThunk(
//   'categories/fetchSubCategories',
//   async () => {
//     const response = await fetch(`${process.env.API}/admin/subcategory`);
//     const data=await response.json();
//     console.log("response",data)
//     return data
//   }
// );

// export const addSubCategory = createAsyncThunk(
//   'categories/addSubCategory',
//   async (newCategory) => {
//     const response = await fetch(`${process.env.API}/admin/subcategory`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name: newCategory }),
//     });
//     return response.json();
//   }
// );

// export const updateSubCategory = createAsyncThunk(
//   'categories/updateSubCategory',
//   async ({ id, name }) => {
//     const response = await fetch(`${process.env.API}/admin/subcategory/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id, name }),
//     });
//     return response.json();
//   }
// );

// export const deleteSubCategory = createAsyncThunk(
//   'categories/deleteSubCategory',
//   async (id) => {
//     await fetch(`${process.env.API}/admin/subcategory/${id}`, { method: 'DELETE' });
//     return id;
//   }
// );

// const subcategorySlice = createSlice({
//   name: 'subcategories',
//   initialState: {
//     list: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch categories
//       .addCase(fetchSubCategories.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchSubCategories.fulfilled, (state, action) => {
//         state.loading = false;
//         state.list = action.payload;
//       })
//       .addCase(fetchSubCategories.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })

//       // Add category
//       .addCase(addSubCategory.fulfilled, (state, action) => {
//         state.list.push(action.payload);
//       })

//       // Update category
//       .addCase(updateSubCategory.fulfilled, (state, action) => {
//         const index = state.list.findIndex((cat) => cat._id === action.payload._id);
//         if (index !== -1) {
//           state.list[index] = action.payload;
//         }
//       })

//       // Delete category
//       .addCase(deleteSubCategory.fulfilled, (state, action) => {
//         state.list = state.list.filter((cat) => cat._id !== action.payload);
//       });
//   },
// });

// export default subcategorySlice.reducer;
