import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Link, useNavigate } from 'react-router-dom'
import { AutoAwesome } from '@mui/icons-material'

// Snackbar instead of alerts
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


export default function MuiLogin() { 
    const navigate = useNavigate();
    
    // for snackbar
    const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });
    const showSnackbar = (msg, type = "success") => {
      setSnack({ open: true, message: msg, severity: type });
    };

    const handleClose = () => setSnack({ ...snack, open: false });
    const HandleLogin = () => {
        // alert("Logged In successfully!!")
        if (!form.email || !form.password) {
          // alert("Please fill in all fields.");
          showSnackbar("Please fill in all fields.", "error");
          return;
        }
        
        const users = JSON.parse(localStorage.getItem('users'))

        if (!users || users.length === 0) {
          // alert("User not registered. Please register first.");
          showSnackbar("User not registered. Please register first.", "error");
          return;
        }

        console.log(users)
        const matchuser = users.find((checkuser)=> checkuser.email === form.email && checkuser.password === form.password)

        if(matchuser){
          localStorage.setItem('loggedInUser',JSON.stringify(matchuser));
          // alert("Logged In successfully!!");
          // snackbar
          showSnackbar("Logged In successfully!!", "success");
          setTimeout(() => { navigate("/Home") }, 500);
          // navigate("/Home");
        }
        else{
          // alert("Invalid Credentials!!");
          // snackbar
          showSnackbar("Invalid credentials!", "error");
        }
    }
    const [form,setForm] = useState(
        {
          email:"",
          password:"",
        }
      );

      // Step 2
      const handleChange = (e) =>{
        // ...form : this will add all the values
        setForm({...form,[e.target.name]:e.target.value})
        console.log({[e.target.name]:e.target.value})
      }
  return (
    // <div style={{backgroundColor:"red"}}>
    <div style={{ backgroundColor: "#fff0f5", minHeight: "100vh", paddingTop: "50px" }}>
    <div>
    <Box 
      sx={{borderRadius: 4, width: 350, margin: "auto", padding: "40px", mt: "50px", backgroundColor: "white", 
        border: "2px #ad1457", borderRadius: 4, boxShadow: 4, textAlign: "center",}}
      noValidate
      autoComplete="off"
    >
      {/* <Typography variant='h4' style={{color:"grey"}}>Login form</Typography> */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 3 }}>
        <AutoAwesome sx={{ color: '#ad1457', mr: 1 }} />
        <Typography variant='h4' sx={{ color: '#ad1457', fontWeight: 700, fontFamily: 'Playfair Display' }}>
          GLAMNEST
        </Typography>
      </Box>
      <TextField id="email" fullWidth type='email' name='email' label="Email" variant="filled" onChange={handleChange}
      sx={{ mb: "20px",
          '& .MuiFilledInput-root': {
            backgroundColor: '#fffafc',
            '&:after': { borderBottom: '2px solid #ad1457'} // active underline
          },
          '& label.Mui-focused': {
            color: '#ad1457', // label color on focus
          }
      }}/>
      <TextField id="pass" fullWidth type='password' name='password' label="Password" variant="filled" onChange={handleChange}
      sx={{ mb: "20px",
          '& .MuiFilledInput-root': {
            backgroundColor: '#fffafc',
            '&:after': { borderBottom: '2px solid #ad1457'} // active underline
          },
          '& label.Mui-focused': {
            color: '#ad1457', // label color on focus
          }
      }}/>
      <Button variant='contained' type='submit' onClick={HandleLogin}
          sx={{backgroundColor: "#ad1457", mb: 2, "&:hover": { backgroundColor: "#9c1352" }}}
        >Log In</Button>
      <Typography sx={{ mb: 1, color:'#ad1457' }}>Don't have an account?</Typography>
      <Link to={'/MuiRegister'} style={{ textDecoration: 'none' }}>
        <Button variant='contained' type='submit' 
            sx={{backgroundColor: "#ad1457", mb: 2, "&:hover": { backgroundColor: "#9c1352" }}}
          >Register</Button>
      </Link>
    </Box>

    {/* snackbar */}
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
      </div>
  )
}
