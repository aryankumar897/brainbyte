

// Import necessary functions from Redux Toolkit for creating slices and async thunks
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Import toast notifications for user feedback, like success or error messages
import { toast } from 'react-toastify';

// Async thunk to fetch all items from the API (e.g., categories and subcategories)
export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  // Make an API request to fetch the items from the backend
  const response = await fetch(`${process.env.API}/admin/catewithsubcate`);
  // Convert the response data into JSON format and return it to be used in the Redux state
  return await response.json();
});

// Async thunk to save (either create or update) an item
export const saveItem = createAsyncThunk('items/saveItem', async (item, { getState }) => {
  // Retrieve the current state of the items, including the item that is being edited
  const { editingItem } = getState().items;
  
  // If there is an existing item being edited, we need to update it
  if (editingItem) {
    // Make an API request to update the existing item on the backend
    const response = await fetch(`${process.env.API}/admin/catewithsubcate/${editingItem._id}`, {
      method: 'PUT', // PUT request to update the item
      headers: { 'Content-Type': 'application/json' }, // Specify the content type is JSON
      body: JSON.stringify(item), // Convert the item object to a JSON string and send it as the request body
    });

    // Parse the response data into JSON format
    const data = await response.json();

    // If the response is successful, show a success message
    if (response.ok) {
      toast.success("Updated successfully");
    } else {
      // If there is an error, show an error message
      toast.error(data?.err);
    }
  } else {
    // If no item is being edited, treat it as a new item to be created
    console.log("item", item); // Debugging log to inspect the item being saved

    // Make a POST request to add the new item to the backend
    const response = await fetch(`${process.env.API}/admin/catewithsubcate`, {
      method: 'POST', // POST request to create a new item
      headers: { 'Content-Type': 'application/json' }, // Specify the content type is JSON
      body: JSON.stringify(item), // Convert the item object to a JSON string and send it as the request body
    });

    // Parse the response data into JSON format
    const data = await response.json();

    // If the response is successful, show a success message
    if (response.ok) {
      toast.success("Created successfully");
    } else {
      // If there is an error, show an error message
      toast.error(data?.err);
    }
  }
  
  // Return the item (either updated or newly created) to be stored in Redux state
  return item;
});

// Async thunk to delete an item by ID
export const deleteItem = createAsyncThunk('items/deleteItem', async (id) => {
  // Send a DELETE request to remove the item from the backend
  const response = await fetch(`${process.env.API}/admin/catewithsubcate/${id}`, { method: 'DELETE' });

  // Parse the response data into JSON format
  const data = await response.json();

  // If the response is successful, show a success message
  if (response.ok) {
    toast.success("Deleted successfully");
  } else {
    // If there is an error, show an error message
    toast.error(data?.err);
  }

  // Return the ID of the deleted item so it can be removed from Redux state
  return id;
});

// Create a Redux slice to manage the state for items (categories and subcategories)
const itemsSlice = createSlice({
  name: 'items', // The name of the slice
  initialState: {
    items: [],         // An array to hold the items (categories, subcategories)
    loading: false,    // Boolean to indicate whether data is being fetched
    error: null,       // To store any error message if something goes wrong
    editingItem: null, // Store the item being edited (or null if no item is being edited)
  },
  reducers: {
    // Action to set the item being edited
    setEditingItem: (state, action) => {
      console.log("action.payload,", action); // Debugging log to inspect the payload of the action
      state.editingItem = action.payload; // Set the item being edited to the payload value
    },
    // Action to reset the editing item (clear the form)
    resetEditingItem: (state) => {
      state.editingItem = null; // Reset the editing item to null when the form is cleared
    },
  },
  extraReducers: (builder) => {
    // Handle the fulfilled state of the fetchItems async thunk
    builder
      .addCase(fetchItems.fulfilled, (state, action) => {
        // When the fetch is successful, store the fetched items in the Redux state
        state.items = action.payload;
      })
      // Handle the fulfilled state of the saveItem async thunk (both create and update actions)
      .addCase(saveItem.fulfilled, (state, action) => {
        // When the save is successful, reset the editingItem to null (clear the form)
        state.editingItem = null;
      })
      // Handle the fulfilled state of the deleteItem async thunk
      .addCase(deleteItem.fulfilled, (state, action) => {
        // Remove the deleted item from the items array by filtering out the deleted item based on its ID
        state.items = state.items.filter((item) => item.id !== action.payload); // Remove item with ID matching the payload
      });
  },
});

// Export the action creators (setEditingItem and resetEditingItem) for use in components
export const { setEditingItem, resetEditingItem } = itemsSlice.actions;

// Export the reducer to be used in the Redux store
export default itemsSlice.reducer;































































// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';


// export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
//   const response = await fetch(`${process.env.API}/admin/catewithsubcate`);
//   return await response.json();
// });

// export const saveItem = createAsyncThunk('items/saveItem', async (item, { getState }) => {
//   const { editingItem } = getState().items;
//   if (editingItem) {
//     // Update existing item

//   const  response=    await fetch(`${process.env.API}/admin/catewithsubcate/${editingItem._id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(item),
//     });
//  const  data=await response.json();
//  if(response.ok){
//      toast.success("updated successfully")
   
//  }else{
//    toast.error(data?.err)
  
//  }

//   } else {
//     // Add new item

//     console.log("item",item)
//   const response=  await fetch(`${process.env.API}/admin/catewithsubcate`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(item),
//     });

//     const data = await response.json();
//     if (response.ok) {
//       toast.success("created successfully")

//     } else {
//       toast.error(data?.err)

//     }
//   }
//   return item;
// });

// export const deleteItem = createAsyncThunk('items/deleteItem', async (id) => {
 
 
//   const response=await fetch(`${process.env.API}/admin/catewithsubcate/${id}`, { method: 'DELETE' });
 
//   const data = await response.json();
//   if (response.ok) {
//     toast.success("deleted succeefully")

//   } else {
//     toast.error(data?.err)

//   }



//   return id;
// });

// // Slice


// const itemsSlice = createSlice({
//   name: 'items',
//   initialState: {
 
//     items: [],
//     loading: false,
//     error: null,
//     editingItem: null,
//   },
//   reducers: {
//     setEditingItem: (state, action) => {
//       console.log("action.payload,",action)
//       state.editingItem = action.payload;
//     },
//     resetEditingItem: (state) => {
//       state.editingItem = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchItems.fulfilled, (state, action) => {
//         state.items = action.payload;
//       })
//       .addCase(saveItem.fulfilled, (state, action) => {
//         state.editingItem = null;
//       })
//       .addCase(deleteItem.fulfilled, (state, action) => {
//         state.items = state.items.filter((item) => item.id !== action.payload);
//       });
//   },
// });

// export const { setEditingItem, resetEditingItem } = itemsSlice.actions;

// export default itemsSlice.reducer;
