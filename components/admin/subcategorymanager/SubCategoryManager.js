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

  InputAdornment,
} from '@mui/material';
import { Delete, Edit, Search } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSubCategories,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from '@/slice/subcategorySlice';

const SubCategoryManager = () => {
  const dispatch = useDispatch();
  const { list: subcategories, loading } = useSelector((state) => state.subcategories);

  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [newSubCategory, setSubNewCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editing, setEditing] = useState({ id: null, name: '' });

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchSubCategories());
  }, [dispatch]);

  useEffect(() => {
    setFilteredSubCategories(subcategories);
  }, [subcategories]);



  const handleSaveCategory = () => {
    if (editing.id) {
      dispatch(updateSubCategory({ id: editing.id, name: editing.name }));
    } else {
      dispatch(addSubCategory(newSubCategory));
    }
    setEditing({ id: null, name: '' });
    setSubNewCategory('');
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteSubCategory(id));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term === '') {
      setFilteredSubCategories(subcategories);
    } else {
      const filtered = subcategories.filter((cat) =>
        cat.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredSubCategories(filtered);
    }
  };

  return (
    <Box p={3} maxWidth="900px" mx="auto"

    >
      <Typography variant="h4" gutterBottom>
        SubCategory Manager
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Search SubCategories"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search
                  style={{ color: '#8A12FC' }}

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
          label={editing.id ? 'Edit SubCategory' : 'Add SubCategory'}
          variant="outlined"
          fullWidth
          value={editing.id ? editing.name : newSubCategory}
          onChange={(e) =>
            editing.id
              ? setEditing({ ...editing, name: e.target.value })
              : setSubNewCategory(e.target.value)
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
          disabled={!newSubCategory.trim() && !editing.name.trim()}



          sx={{
            backgroundColor: "#8A12FC",
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
          filteredSubCategories?.map((subcategory) => (
            <ListItem key={subcategory?._id} divider
              sx={{
                //  
                borderColor: '#8A12FC',
                '&:hover': {

                  backgroundColor: "#8A12FC",
                  // 
                },

              }}

            >
              <ListItemText primary={subcategory?.name} />

              <IconButton
                edge="end"

                onClick={() => setEditing({ id: subcategory?._id, name: subcategory?.name })}
              >
                <Edit
                  style={{ color: 'green' }}
                />
              </IconButton>
              <IconButton
                edge="end"
                color="error"
                onClick={() => handleDeleteCategory(subcategory?._id)}
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

export default SubCategoryManager;
