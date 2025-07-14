import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Grid, Card, CardMedia,
  CardContent, CardActions, Button
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  }, []);


  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });
  const showSnackbar = (msg, type = "success") => {
    setSnack({ open: true, message: msg, severity: type });
  };
    
  const handleClose = () => setSnack({ ...snack, open: false });


  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const moveToCart = (item) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const exists = cart.some(p => p.id === item.id);
  if (!exists) {
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    // alert("Moved to Cart!");
    showSnackbar("Moved to Cart!", "success");
  } else {
    // alert("Item already in cart!");
    showSnackbar("Item already in cart!", "error");
  }
};

  return (
    <Box sx={{ p: 5, backgroundColor: '#fff0f5', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" sx={{ mb: 4, color: '#ad1457',fontWeight: 600, fontFamily: 'Playfair Display' }}>
        Your Wishlist
      </Typography>

      {wishlist.length === 0 ? (
        <Typography align="center" color="gray">Your Wishlist is Empty 💔</Typography>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {wishlist.map((product) => (
            <Grid item key={product.id}>
              <Card sx={{ width: 260, borderRadius: 3, boxShadow: 4 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.thumbnail}
                  alt={product.title}
                />
                <CardContent>
                  <Typography variant="h6" sx={{fontFamily: 'Lucida Fax'}}>{product.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.category.replace("-", " ")}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Typography variant="subtitle1" color="primary">
                    ₹{product.price}
                  </Typography>
                  <Button
                       variant="outlined"
                       size="small"
                       color="error"
                       sx={{fontFamily: 'Lucida Fax'}}
                       startIcon={<ShoppingCartIcon />}
                       onClick={() => moveToCart(product)}
                   >
                       Move
                   </Button>

                   <Button
                       variant="outlined"
                       size="small"
                       color="error"
                       sx={{fontFamily: 'Lucida Fax'}}
                       onClick={() => removeFromWishlist(product.id)}
                   >
                       Remove
                   </Button>

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
