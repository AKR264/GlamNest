import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions
} from '@mui/material';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';


const allowedCategories = [
  "womens-dresses",
  "womens-shoes",
  "womens-watches",
  "womens-bags",
  "womens-jewellery",
  "tops",
  "fragrances",
  "beauty"
];

export default function AllProducts() {
  const [products, setProducts] = useState([]);

  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });
    const showSnackbar = (msg, type = "success") => {
      setSnack({ open: true, message: msg, severity: type });
    };
    
  const handleClose = () => setSnack({ ...snack, open: false });
  
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=200')
      .then((res) => {
        const filtered = res.data.products.filter((p) =>
          allowedCategories.includes(p.category)
        );
        setProducts(filtered);
      })
      .catch((err) => console.error(err));
  }, []);
  
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddToWishlist = (item) => {
  const list = JSON.parse(localStorage.getItem("wishlist")) || [];
  const alreadyExists = list.some(product => product.id === item.id);
  if (alreadyExists) {
    // alert("Item already in wishlist!");
    showSnackbar("Item already in wishlist!", "error");
    return;
  }
  const updated = [...list, item];
  localStorage.setItem("wishlist", JSON.stringify(updated));
  // alert("Added to Wishlist!");
  showSnackbar("Added to Wishlist!", "success");
};

const handleAddToCart = (item) => {
  // const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    alert("Please login to add to cart.");
    return;
  }
  const key = `cart_${user.email}`;
  let cart = JSON.parse(localStorage.getItem(key)) || [];
  const exists = cart.find(p => p.id === item.id);

  if (exists) {
    // alert("Item already in cart!");
    showSnackbar("Item already in cart!", "error");
    return;
  }

  cart.push({ ...item, quantity: 1 }); // important!
  localStorage.setItem(key, JSON.stringify(cart));
  // alert("Added to Cart!");
  showSnackbar("Added to Cart!", "success");
};


  return (
    <Box sx={{ padding: 5, backgroundColor: '#fffafc', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" sx={{ mb: 4, color: '#ad1457',fontWeight: 600, fontFamily: 'Playfair Display' }}>
        All Fashion & Beauty Products
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <TextField
          label="Search products"
          variant="outlined"
          sx={{ width: 300, fontFamily: 'Lucida Fax',
            '& label.Mui-focused': { color: '#ad1457'}, // label when focused
            '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#ad1457' }} // on focus
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      {products.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        ).length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: 'center', color: 'gray', mt: 5, fontFamily: 'Lucida Fax' }}>
            No products found for "{searchTerm}"
          </Typography>
        ) : (
      <Grid container spacing={4} justifyContent="center">
        {/* {products.map((product) => ( */}
        {products
          .filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((product) => (
          <Grid item key={product.id}>
            <Card sx={{ width: 260, borderRadius: 3, boxShadow: 4 }}>
              <CardMedia
                component="img"
                height="200"
                image={product.thumbnail}
                alt={product.title}
                onClick={() => navigate(`/product/${product.id}`)} sx={{ cursor: 'pointer' }}
              />
              <CardContent>
                <Typography variant="h6" sx={{fontFamily: 'Lucida Fax'}}>{product.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {(product.category || "unknown").replace("-", " ")}
                </Typography>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <Typography variant="subtitle1" color="primary">
                  ₹{product.price}
                </Typography>
              </CardActions>
              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 1 }}>
                <IconButton
                  onClick={() => handleAddToWishlist(product)}
                  sx={{ color: '#e91e63' }}
                >
                  <FavoriteBorderIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleAddToCart(product)}
                  sx={{ color: '#3f51b5' }}
                >
                  <ShoppingCartIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      )}
      <Snackbar
            open={snack.open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <MuiAlert onClose={handleClose} severity={snack.severity} sx={{ width: '100%' }}>
              {snack.message}
            </MuiAlert>
          </Snackbar>
    </Box>
  );
}
