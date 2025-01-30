import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  InputAdornment,
} from '@mui/material';
import { Delete, Edit, Search } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from '@/slice/categorySlice';

const CategoryManager = () => {
  const dispatch = useDispatch();
  const { list: categories, loading } = useSelector((state) => state.categories);

  const [filteredCategories, setFilteredCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editing, setEditing] = useState({ id: null, name: '' });

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  const handleSaveCategory = () => {
    if (editing.id) {
      dispatch(updateCategory({ id: editing.id, name: editing.name }));
    } else {
      dispatch(addCategory(newCategory));
    }
    setEditing({ id: null, name: '' });
    setNewCategory('');
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term === '') {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter((cat) =>
        cat.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  };

  return (
    <Box p={3} maxWidth="900px" mx="auto"   
      
    >
      <Typography variant="h4" gutterBottom>
        Category Manager
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Search Categories"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search 
                  style= {{ color: '#8A12FC' }}

                />
              </InputAdornment>
            ),
          }}

          InputLabelProps={{
            style: { color: '#8A12FC' },
          }}
         
          sx={{
            input: { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#8A12FC',
              },
              '&:hover fieldset': {
                borderColor: '#8A12FC',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#8A12FC',
              },
            },
          }}
        />
      </Box>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          label={editing.id ? 'Edit Category' : 'Add Category'}
          variant="outlined"
          fullWidth
          value={editing.id ? editing.name : newCategory}
          onChange={(e) =>
            editing.id
              ? setEditing({ ...editing, name: e.target.value })
              : setNewCategory(e.target.value)
          }

          InputLabelProps={{
            style: { color: '#8A12FC' },
          }}

          sx={{
            input: { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#8A12FC',
              },
              '&:hover fieldset': {
                borderColor: '#8A12FC',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#8A12FC',
              },
            },
          }}
        />
        <Button
          variant="contained"
        
          onClick={handleSaveCategory}
          disabled={!newCategory.trim() && !editing.name.trim()}

       

          sx={{
            backgroundColor:"#8A12FC",
            input: { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#8A12FC',
              },
              '&:hover fieldset': {
                borderColor: '#8A12FC',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#8A12FC',
              },
            },
          }}
        >
          {editing.id ? 'Update' : 'Add'}
        </Button>
      </Box>

      <List>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          filteredCategories?.map((category) => (
            <ListItem key={category?._id} divider  
              sx={{
              //  
                borderColor: '#8A12FC',
                  '&:hover': {

                  backgroundColor: "#8A12FC",
                   // 
                  },
                
              }}
            
            >
              <ListItemText primary={category?.name} />
             
                <IconButton
                  edge="end"
                 
                  onClick={() => setEditing({ id: category?._id, name: category?.name })}
                >
                  <Edit
                  style={{ color: 'green' }}
                   />
                </IconButton>
                <IconButton
                  edge="end"
                  color="error"
                  onClick={() => handleDeleteCategory(category?._id)}
                >
                  <Delete />
                </IconButton>
             
            </ListItem>
          ))
        )}
      </List>

    </Box>
  );
};

export default CategoryManager;
