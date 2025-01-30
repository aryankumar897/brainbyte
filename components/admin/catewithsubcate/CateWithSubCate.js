import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import {
  fetchItems,
  saveItem,
  deleteItem,
  setEditingItem,
  resetEditingItem,
} from '@/slice/catewithsubcateSlice';
import { fetchCategories } from '@/slice/categorySlice';
import { fetchSubCategories } from '@/slice/subcategorySlice';

const ItemManager = () => {
  const dispatch = useDispatch();

  const { items, editingItem, loading } = useSelector((state) => state.items);
  const { list: categories } = useSelector((state) => state.categories);
  const { list: subcategories } = useSelector((state) => state.subcategories);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [filteredItems, setFilteredItems] = useState(items); // State for filtered items

  // Fetch categories and items on mount
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubCategories()); 
    dispatch(fetchItems());
  }, [dispatch]);

  // Reset form when not editing
  useEffect(() => {
    if (editingItem) {
      setSelectedCategory(editingItem.categoryId._id);
      setSelectedSubcategory(editingItem.subcategoryId._id);
      setTitle(editingItem.title);
      setSubtitle(editingItem.subtitle);
    } else {
      resetForm();
    }
  }, [editingItem]);

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(''); // Reset subcategory
    // Fetch relevant subcategories
  };

  // Handle subcategory change
  const handleSubcategoryChange = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
  };

  // Handle save or update item
  const handleSaveItem = () => {
    const item = {
      categoryId: selectedCategory,
      subcategoryId: selectedSubcategory,
      title,
      subtitle,
    };

    dispatch(saveItem(item)).then(() => {
      dispatch(fetchItems());
      resetForm();
    });
  };

  // Handle delete item
  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id)).then(() => dispatch(fetchItems()));
  };

  // Reset form fields
  const resetForm = () => {
    setSelectedCategory('');
    setSelectedSubcategory('');
    setTitle('');
    setSubtitle('');
    dispatch(resetEditingItem());
  };


  useEffect(() => {
    if (searchQuery) {
      const filtered = items.filter((item) =>
        `${item.title} ${item.subtitle} ${item.categoryId.name} ${item.subcategoryId.name}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items);
    }
  }, [searchQuery, items]);

  return (
    <Box p={3} maxWidth="900px" mx="auto">
      <Typography variant="h4" gutterBottom>
       Search Category,Subcategory,Title
      </Typography>
      <TextField
        label="Search by Title, Subtitle, Category, Subcategory"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputLabelProps={{
          style: { color: '#8A12FC' },
        }}
        sx={{
          mb:3,
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

      <Typography variant="h4" gutterBottom>
        Home Category Manager
      </Typography>

      {/* Form */}
      <Box display="flex" flexDirection="column" gap={2} mb={3}>
      
      
        <FormControl
          fullWidth
          sx={{
            '& .MuiInputLabel-root': {
              color: '#8A12FC', // Label color
            },
            '&:hover .MuiInputLabel-root': {
              color: '#8A12FC', // Label hover color
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#8A12FC', // Label color when focused
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#8A12FC', // Default border color
              },
              '&:hover fieldset': {
                borderColor: '#8A12FC', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#8A12FC', // Border color when focused
              },
            },
            '& .MuiSvgIcon-root': {
              color: '#8A12FC', // Icon color
            },
            '&:hover .MuiSvgIcon-root': {
              color: '#8A12FC', // Icon hover color
            },
            '&.Mui-focused .MuiSvgIcon-root': {
              color: '#8A12FC', // Icon color when focused
            },
          }}
        >
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
         
            sx={{
              color: '#fff', // Selected text color
            
            }}
            MenuProps={{
              PaperProps: {
                sx: {

                  bgcolor: '#F4F4F4', // Dropdown background
                  '& .MuiMenuItem-root': {
                    '&:hover': {
                      color: "white",
                      bgcolor: '#8A12FC', // Hover background for dropdown items
                    },
                  },
                },
              },
            }}
         
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>


        <FormControl
          fullWidth
          sx={{
            '& .MuiInputLabel-root': {
              color: selectedCategory ? '#8A12FC' : '#B0B0B0', // Label color, dimmed if disabled
            },
            '&:hover .MuiInputLabel-root': {
              color: selectedCategory ? '#8A12FC' : '#B0B0B0', // Hover label color
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: selectedCategory ? '#8A12FC' : '#B0B0B0', // Focused label color
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: selectedCategory ? '#8A12FC' : '#B0B0B0', // Default border color
              },
              '&:hover fieldset': {
                borderColor: selectedCategory ? '#8A12FC' : '#B0B0B0', // Hover border color
              },
              '&.Mui-focused fieldset': {
                borderColor: selectedCategory ? '#8A12FC' : '#B0B0B0', // Focused border color
              },
            },
            '& .MuiSvgIcon-root': {
              color: selectedCategory ? '#8A12FC' : '#B0B0B0', // Icon color
            },
            '&:hover .MuiSvgIcon-root': {
              color: selectedCategory ? '#8A12FC' : '#B0B0B0', // Icon hover color
            },
            '&.Mui-focused .MuiSvgIcon-root': {
              color: selectedCategory ? '#8A12FC' : '#B0B0B0', // Icon focus color
            },
          }}
        >
          <InputLabel>Subcategory</InputLabel>
          <Select
            value={selectedSubcategory}
            onChange={(e) => handleSubcategoryChange(e.target.value)}
            disabled={!selectedCategory} // Disable if no category is selected
         
            sx={{
              color: '#fff', // Selected text color

            }}
         
            MenuProps={{
              PaperProps: {
                sx: {

                  bgcolor: '#F4F4F4', // Dropdown background
                  '& .MuiMenuItem-root': {
                    '&:hover': {
                      color:"white",
                      bgcolor: '#8A12FC', // Hover background for dropdown items
                    },
                  },
                },
              },
            }}
          >
            {subcategories.map((subcategory) => (
              <MenuItem
                key={subcategory._id}
                value={subcategory._id}
                sx={{
                  color: '#4A4A4A', // Item text color
                  '&:hover': {
                    color: '#fff', // Text color on hover
                  },
                }}
              >
                {subcategory.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth

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
        <TextField
          label="Subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          fullWidth
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
          color="primary"
          onClick={handleSaveItem}
          disabled={!selectedCategory || !selectedSubcategory 
          
         // || !title.trim() 
         
           }
      
      
          sx={{
            backgroundColor: "#8A12FC",
            input: { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#8A12FC',
              },
              '&:hover fieldset': {
                borderColor: '#8A12FC',
                backgroundColor: "#8A12FC",
              },
              '&.Mui-focused fieldset': {
                borderColor: '#8A12FC',
              },
            },
          }}

        >
          {editingItem ? 'Update Item' : 'Add Item'}
        </Button>
      </Box>

      {/* Item List */}
      <List>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
            items && filteredItems.map((item) => (
              <ListItem
                key={item._id}
                divider
                sx={{
                  borderColor: '#8A12FC',
                 
                  padding: 1, // Add spacing
                  // Subtle shadow for card effect
                  '&:hover': {
                    backgroundColor: '#8A12FC', // Slightly brighter background on hover
                  },
                  transition: 'all 0.3s ease', // Smooth hover transition
                }}
              >
                <ListItemText
                  primary={item.title}
                  secondary={
                    <>
                      <span style={{ display: 'block', marginBottom: '8px', fontSize: '1rem', color: '#CCCCCC' }}>
                        <strong>Category:</strong> {item.categoryId.name}
                      </span>
                      <span style={{ fontSize: '1rem', color: '#CCCCCC' }}>
                        <strong>Subcategory:</strong> {item.subcategoryId.name}
                      </span>
                    </>
                  }
                  primaryTypographyProps={{
                    variant: 'h6', // Modern typography for title
                    color: 'white', // White text for title
                  }}
                />
                <IconButton
                  edge="end"
                  sx={{
                    color: 'green', // Green color for edit icon
                    '&:hover': {
                      backgroundColor: 'rgba(0, 255, 0, 0.1)', // Add hover background
                    },
                  }}
                  onClick={() => dispatch(setEditingItem(item))}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  edge="end"
                  sx={{
                    color: 'red', // Red color for delete icon
                    '&:hover': {
                      backgroundColor: 'rgba(255, 0, 0, 0.1)', // Add hover background
                    },
                  }}
                  onClick={() => handleDeleteItem(item._id)}
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

export default ItemManager;
