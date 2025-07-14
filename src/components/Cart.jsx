// import React, { useEffect, useState } from 'react';
// import {
//   Box, Typography, Grid, Card, CardMedia,
//   CardContent, CardActions, Button
// } from '@mui/material';

// export default function Cart() {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(stored);
//   }, []);

//   const removeFromCart = (id) => {
//     const updated = cart.filter(item => item.id !== id);
//     setCart(updated);
//     localStorage.setItem("cart", JSON.stringify(updated));
//   };

//   return (
//     <Box sx={{ p: 5, backgroundColor: '#fce4ec', minHeight: '100vh' }}>
//       <Typography variant="h4" align="center" sx={{ mb: 4, color: '#4a148c', fontWeight: 600, fontFamily: 'Playfair Display' }}>
//         Your Shopping Cart
//       </Typography>

//       {cart.length === 0 ? (
//         <Typography align="center" color="gray">Your Cart is Empty 🛒</Typography>
//       ) : (
//         <Grid container spacing={4} justifyContent="center">
//           {cart.map((product) => (
//             <Grid item key={product.id}>
//               <Card sx={{ width: 260, borderRadius: 3, boxShadow: 4 }}>
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   image={product.thumbnail}
//                   alt={product.title}
//                 />
//                 <CardContent>
//                   <Typography variant="h6" sx={{fontFamily: 'Lucida Fax'}}>{product.title}</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {product.category.replace("-", " ")}
//                   </Typography>
//                 </CardContent>
//                 <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
//                   <Typography variant="subtitle1" color="primary">
//                     ₹{product.price}
//                   </Typography>
//                   <Button
//                     variant="outlined"
//                     size="small"
//                     color="error"
//                     sx={{fontFamily: 'Lucida Fax'}}
//                     onClick={() => removeFromCart(product.id)}
//                   >
//                     Remove
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// }




// import React, { useEffect, useState } from 'react';
// import {
//   Box, Typography, Grid, Card, CardMedia,
//   CardContent, CardActions, Button, Snackbar, Alert
// } from '@mui/material';

// export default function Cart() {
//   const [cart, setCart] = useState([]);
//   const [snack, setSnack] = useState({ open: false, message: "", severity: "info" });

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(stored);
//   }, []);

//   const showSnackbar = (msg, type = "info") => {
//     setSnack({ open: true, message: msg, severity: type });
//   };

//   const handleClose = () => setSnack({ ...snack, open: false });

//   const removeFromCart = (id) => {
//     const updated = cart.filter(item => item.id !== id);
//     setCart(updated);
//     localStorage.setItem("cart", JSON.stringify(updated));
//     showSnackbar("Item removed from cart!", "warning");
//   };

//   const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

//   return (
//     <Box sx={{ p: 5, backgroundColor: '#fce4ec', minHeight: '100vh' }}>
//       <Typography variant="h4" align="center" sx={{ mb: 4, color: '#4a148c' }}>
//         Your Shopping Cart
//       </Typography>

//       {cart.length === 0 ? (
//         <Typography align="center" color="gray">Your cart is empty 🛒</Typography>
//       ) : (
//         <>
//           <Grid container spacing={4} justifyContent="center">
//             {cart.map((product) => (
//               <Grid item key={product.id}>
//                 <Card sx={{ width: 260, borderRadius: 3, boxShadow: 4 }}>
//                   <CardMedia
//                     component="img"
//                     height="200"
//                     image={product.thumbnail}
//                     alt={product.title}
//                   />
//                   <CardContent>
//                     <Typography variant="h6">{product.title}</Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {product.category.replace("-", " ")}
//                     </Typography>
//                   </CardContent>
//                   <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
//                     <Typography variant="subtitle1" color="primary">
//                       ₹{product.price}
//                     </Typography>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       color="error"
//                       onClick={() => removeFromCart(product.id)}
//                     >
//                       Remove
//                     </Button>
//                   </CardActions>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>

//           {/* Total price section */}
//           <Box sx={{ mt: 5, textAlign: 'center' }}>
//             <Typography variant="h6" sx={{ color: '#880e4f' }}>
//               Total: ₹{totalPrice}
//             </Typography>
//             <Button
//               variant="contained"
//               sx={{
//                 mt: 2,
//                 backgroundColor: '#ad1457',
//                 "&:hover": { backgroundColor: '#9c1352' }
//               }}
//               onClick={() => showSnackbar("Checkout feature coming soon!", "info")}
//             >
//               Proceed to Checkout
//             </Button>
//           </Box>
//         </>
//       )}

//       {/* Snackbar for actions */}
//       <Snackbar
//         open={snack.open}
//         autoHideDuration={3000}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert onClose={handleClose} severity={snack.severity} sx={{ width: '100%' }}>
//           {snack.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }





import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Grid, Card, CardMedia,
  CardContent, CardActions, Button, IconButton,
  Snackbar, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "info" });

  // useEffect(() => {
  //   const stored = JSON.parse(localStorage.getItem("cart")) || [];
  //   setCart(stored);
  // }, []);

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("loggedInUser"));
  //   const key = `cart_${user?.email}`;
  //   const stored = JSON.parse(localStorage.getItem(key)) || [];
  //   setCart(stored);
  // }, []);

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const key = `cart_${user?.email}`;
  const stored = JSON.parse(localStorage.getItem(key)) || [];
  setCart(stored);
  }, []);

  

  const showSnackbar = (msg, type = "info") => {
    setSnack({ open: true, message: msg, severity: type });
  };

  const handleClose = () => setSnack({ ...snack, open: false });

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const key = `cart_${user?.email}`;
    localStorage.setItem(key, JSON.stringify(updatedCart));
    // localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (id) => {
    const updated = cart.filter(item => item.id !== id);
    updateCart(updated);
    showSnackbar("Item removed from cart!", "warning");
  };

  const increaseQty = (id) => {
    const updated = cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map(item => {
        if (item.id === id) {
          if (item.quantity === 1) {
            showSnackbar("Item removed from cart!", "warning");
            return null; // mark for removal
          } else {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      })
      .filter(Boolean); // removes nulls

    updateCart(updated);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box sx={{ p: 5, backgroundColor: '#fce4ec', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" sx={{ mb: 4, color: '#4a148c' }}>
        Your Shopping Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography align="center" color="gray">Your cart is empty 🛒</Typography>
      ) : (
        <>
          <Grid container spacing={4} justifyContent="center">
            {cart.map((product) => (
              <Grid item key={product.id}>
                <Card sx={{ width: 260, borderRadius: 3, boxShadow: 4 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.thumbnail}
                    alt={product.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{product.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.category.replace("-", " ")}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton size="small" onClick={() => decreaseQty(product.id)}>
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{product.quantity}</Typography>
                      <IconButton size="small" onClick={() => increaseQty(product.id)}>
                        <AddIcon />
                      </IconButton>
                    </Box>

                    <Typography variant="subtitle1" color="primary">
                      ₹{(product.price * product.quantity).toFixed(2)}
                    </Typography>
                  </CardActions>

                  <Box sx={{ textAlign: 'center', pb: 2 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => removeFromCart(product.id)}
                    >
                      Remove
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 5, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#880e4f' }}>
              Total: ₹{totalPrice.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: '#ad1457',
                "&:hover": { backgroundColor: '#9c1352' }
              }}
              onClick={() => showSnackbar("Checkout feature coming soon!", "info")}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}

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