import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Link, useNavigate } from 'react-router-dom'
import { AutoAwesome } from '@mui/icons-material'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


export default function MuiRegister() {

  const navigate = useNavigate();

  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });
    const showSnackbar = (msg, type = "success") => {
      setSnack({ open: true, message: msg, severity: type });
  };
  
  const handleClose = () => setSnack({ ...snack, open: false });
  // Step 3
    const HandleRegister = () => {
      if (!form.name || !form.email || !form.password || !form.phone || !form.address) {
        // alert("Please fill in all fields.");
        showSnackbar("Please fill in all fields.", "error");
        return;
      }  
    const existinguser = JSON.parse(localStorage.getItem('users')) || []
    const emailExists = existinguser.some(existinguser => existinguser.email === form.email);
    if (emailExists) {
      // alert("Email already registered. Please login or use a different email.");
      showSnackbar("Email already registered. Please login or use a different email.", "error");
      return;
    }
    // [...existinguser,form] : this will retain the previous data and add new data
    const newuser = [...existinguser,form];
    localStorage.setItem('users', JSON.stringify(newuser));
    // alert("User Registered!!!!");
    showSnackbar("User Registered!!!!", "success");
    setTimeout(() => { navigate("/") }, 500);
    // navigate("/");
  }
  // Step 1
  const [form,setForm] = useState(
    {
      name:"",
      email:"",
      password:"",
      phone:"",
      address:"",
    }
  );
  // Step 2
  const handleChange = (e) =>{
    // ...form : this will add all the values
    setForm({...form,[e.target.name]:e.target.value})
    console.log({[e.target.name]:e.target.value})
  }
  return (
    <div style={{backgroundColor:"#fff0f5", alignItems:"center"}}> <br />
    <Box
      sx={{borderRadius: 4, width: 350, margin: "auto", padding: "40px", mt: "50px", backgroundColor: "white", 
        border: "2px #ad1457", borderRadius: 4, boxShadow: 4, textAlign: "center",}}
      noValidate
      autoComplete="off"
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 3 }}>
        <AutoAwesome sx={{ color: '#ad1457', mr: 1 }} />
        <Typography variant='h4' sx={{ color: '#ad1457', fontWeight: 700, fontFamily: 'Playfair Display' }}>
          GLAMNEST
        </Typography>
      </Box>
      {/* <Typography variant='h4' style={{color:"grey"}}>User Registration form</Typography> */}
      <TextField id="name" fullWidth type='text' name= 'name' label="User Name" variant="filled" onChange={handleChange} 
      sx={{ mb: "20px",
          '& .MuiFilledInput-root': {
            backgroundColor: '#fffafc',
            '&:after': { borderBottom: '2px solid #ad1457'} // active underline
          },
          '& label.Mui-focused': {
            color: '#ad1457', // label color on focus
          }
      }}/>
      <TextField id="email" fullWidth type='email' name= 'email' label="Email" variant="filled" onChange={handleChange} 
      sx={{ mb: "20px",
          '& .MuiFilledInput-root': {
            backgroundColor: '#fffafc',
            '&:after': { borderBottom: '2px solid #ad1457'} // active underline
          },
          '& label.Mui-focused': {
            color: '#ad1457', // label color on focus
          }
      }}/>
      <TextField id="pass" fullWidth type='password' name= 'password' label="Password" variant="filled" onChange={handleChange} 
      sx={{ mb: "20px",
          '& .MuiFilledInput-root': {
            backgroundColor: '#fffafc',
            '&:after': { borderBottom: '2px solid #ad1457'} // active underline
          },
          '& label.Mui-focused': {
            color: '#ad1457', // label color on focus
          }
      }}/>
      <TextField id="phone" fullWidth type='number' name= 'phone' label="Phone" variant="filled" onChange={handleChange} 
      sx={{ mb: "20px",
          '& .MuiFilledInput-root': {
            backgroundColor: '#fffafc',
            '&:after': { borderBottom: '2px solid #ad1457'} // active underline
          },
          '& label.Mui-focused': {
            color: '#ad1457', // label color on focus
          }
      }}/>
      <TextField id="address" fullWidth type='text' name= 'address' label="Address" variant="filled" multiline rows={3} onChange={handleChange} 
      sx={{ mb: "20px",
          '& .MuiFilledInput-root': {
            backgroundColor: '#fffafc',
            '&:after': { borderBottom: '2px solid #ad1457'} // active underline
          },
          '& label.Mui-focused': {
            color: '#ad1457', // label color on focus
          }
      }}/>
      <Button variant='contained' type='submit' onClick={HandleRegister} 
          sx={{backgroundColor: "#ad1457", mb: 2, "&:hover": { backgroundColor: "#9c1352" }}}
        >Register</Button>
      <Typography sx={{ mb: 1, color:'#ad1457' }}>Already have an account?</Typography>
      <Link to={'/'} style={{ textDecoration: 'none' }}>
        <Button variant='contained' type='submit' 
          sx={{backgroundColor: "#ad1457", mb: 2, "&:hover": { backgroundColor: "#9c1352" }}}
        >Login</Button>
      </Link>
    </Box>
    <br /><br /><br />
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
    </div>
  )
}
