import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box, Typography, Button, Card, CardMedia, CircularProgress, Snackbar, Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function ProductDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "info" });

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const showSnackbar = (msg, severity = "info") => {
    setSnack({ open: true, message: msg, severity });
  };

  const handleClose = () => setSnack({ ...snack, open: false });

  const addToCart = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const key = `cart_${user?.email}`;
    let cart = JSON.parse(localStorage.getItem(key)) || [];

    const exists = cart.find(p => p.id === product.id);
    if (exists) {
      showSnackbar("Already in cart", "warning");
      return;
    }

    cart.push({ ...product, quantity: 1 });
    localStorage.setItem(key, JSON.stringify(cart));
    showSnackbar("Added to cart", "success");
  };

  const addToWishlist = () => {
    const list = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = list.find(p => p.id === product.id);
    if (exists) {
      showSnackbar("Already in wishlist", "warning");
      return;
    }

    list.push(product);
    localStorage.setItem("wishlist", JSON.stringify(list));
    showSnackbar("Added to wishlist", "success");
  };

  if (!product) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 5, backgroundColor: '#fffafc', minHeight: '100vh' }}>
      <Button
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{
          mb: 3,
          color: '#fffafc',
          backgroundColor: '#ad1457',
          borderColor: '#fffafc',
          fontFamily: 'Lucida Fax',
          '&:hover': {
            color: '#ad1457',
            backgroundColor: '#fffafc',
            borderColor: '#ad1457'
          }
        }}
      >
        Back
      </Button>

      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, p: 4 }}>
        <CardMedia
          component="img"
          image={product.thumbnail}
          alt={product.title}
          sx={{ maxWidth: 400, borderRadius: 3 }}
        />
        <Box>
          <Typography variant="h4" sx={{ mb: 2, color: '#ad1457' }}>{product.title}</Typography>
          <Typography variant="h6" sx={{ mb: 1 }}>₹{product.price}</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>{product.description}</Typography>
          <Typography variant="body2" sx={{ mb: 2, color: 'gray' }}>
            Category: {product.category}
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: 'green' }}>
            Rating: {product.rating} ★
          </Typography>

          <Button
            variant="contained"
            startIcon={<ShoppingCartIcon />}
            sx={{ backgroundColor: '#ad1457', mr: 2, '&:hover': {
                backgroundColor: '#fce4ec',
                borderColor: '#ad1457',
                color: '#ad1457'
              } }}
            onClick={addToCart}
          >
            Add to Cart
          </Button>

          <Button
            variant="outlined"
            startIcon={<FavoriteBorderIcon />}
            sx={{
              color: '#ad1457',
              borderColor: '#ad1457',
              '&:hover': {
                backgroundColor: '#fce4ec',
                borderColor: '#ad1457'
              }
            }}
            onClick={addToWishlist}
          >
            Add to Wishlist
          </Button>
        </Box>
      </Card>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={snack.severity} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}