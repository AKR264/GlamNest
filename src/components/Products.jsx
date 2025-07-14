import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardActions, CardContent, CardMedia, Typography, Grid, Box } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


function Products() {
  const { categoryName } = useParams();
  const [productData, setProductData] = useState([]);
  const nav = useNavigate();
  const didRun = useRef(false);

  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });
  const showSnackbar = (msg, type = "success") => {
    setSnack({ open: true, message: msg, severity: type });
  };
  
  const handleClose = () => setSnack({ ...snack, open: false });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/category/${categoryName}`)
      .then((res) => setProductData(res.data.products))
      .catch((err) => console.log(err));
  }, [categoryName]);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;
    const logUser = localStorage.getItem("loggedInUser");
    if (!logUser) {
      alert("Please Login");
      nav("/");
    }
  }, [nav]);

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
      <Typography variant="h4" sx={{ textAlign: 'center', color: '#ad1457', mb: 4, fontWeight: 600, fontFamily: 'Playfair Display' }}>
        {categoryName.toUpperCase()}
      </Typography>
      <Button
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        onClick={() => nav("/Home")}
        sx={{ mb: 3, color: '#fffafc', backgroundColor: '#ad1457', borderColor: '#fffafc', fontFamily: 'Lucida Fax', mr: '20px', '&:hover': {
            color: '#ad1457',
            backgroundColor: '#fffafc',
            borderColor: '#ad1457'}
        }}
      >
        Back to Home
      </Button> 
      <Button
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        onClick={() => nav("/Category")}
        sx={{ mb: 3, color: '#fffafc', backgroundColor: '#ad1457', borderColor: '#fffafc', fontFamily: 'Lucida Fax', '&:hover': {
            color: '#ad1457',
            backgroundColor: '#fffafc',
            borderColor: '#ad1457'}
        }}
      >
        Back to Categories
      </Button>

      <Grid container spacing={4} justifyContent="center">
        {productData.map((product) => (
          <Grid item key={product.id}>
            <Card sx={{ width: 280, borderRadius: 3, boxShadow: 4 }}>
              <CardMedia
                component="img"
                height="200"
                image={product.thumbnail}
                alt={product.title}
                onClick={() => navigate(`/product/${product.id}`)} sx={{ cursor: 'pointer' }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, fontFamily: 'Lucida Fax' }}>
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description.slice(0, 70)}...
                </Typography>
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
                <Typography variant="subtitle1" color="primary">
                  ₹{product.price}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {product.brand}
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

export default Products;
