import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';


export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const response = await fetch(`${process.env.API}/admin/catewithsubcate`);
  return await response.json();
});

export const saveItem = createAsyncThunk('items/saveItem', async (item, { getState }) => {
  const { editingItem } = getState().items;
  if (editingItem) {
    // Update existing item

  const  response=    await fetch(`${process.env.API}/admin/catewithsubcate/${editingItem._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
 const  data=await response.json();
 if(response.ok){
     toast.success("updated successfully")
   
 }else{
   toast.error(data?.err)
  
 }

  } else {
    // Add new item

    console.log("item",item)
  const response=  await fetch(`${process.env.API}/admin/catewithsubcate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });

    const data = await response.json();
    if (response.ok) {
      toast.success("created successfully")

    } else {
      toast.error(data?.err)

    }
  }
  return item;
});

export const deleteItem = createAsyncThunk('items/deleteItem', async (id) => {
 
 
  const response=await fetch(`${process.env.API}/admin/catewithsubcate/${id}`, { method: 'DELETE' });
 
  const data = await response.json();
  if (response.ok) {
    toast.success("deleted succeefully")

  } else {
    toast.error(data?.err)

  }



  return id;
});

// Slice


const itemsSlice = createSlice({
  name: 'items',
  initialState: {
 
    items: [],
    loading: false,
    error: null,
    editingItem: null,
  },
  reducers: {
    setEditingItem: (state, action) => {
      console.log("action.payload,",action)
      state.editingItem = action.payload;
    },
    resetEditingItem: (state) => {
      state.editingItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(saveItem.fulfilled, (state, action) => {
        state.editingItem = null;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const { setEditingItem, resetEditingItem } = itemsSlice.actions;

export default itemsSlice.reducer;
