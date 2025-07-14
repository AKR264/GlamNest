import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";
import SpaIcon from '@mui/icons-material/Spa'; 
import { AutoAwesome, FilterVintage } from "@mui/icons-material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Outlet, Link, useNavigate } from "react-router-dom";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

 
const pages = [ 
  { title: "Home", path: "/Home" },
  { title: "Category", path: "/Category" },
  { title: "Products", path: "/Products" },
  { title: "About", path: "about" },
  // { title: "Register", path: "/MuiRegister" },
  // { title: "Login", path: "/" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {

  // NAVIGATION
  const navi = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const [snack, setSnack] = React.useState({ open: false, message: "", severity: "success" });
  const showSnackbar = (msg, type = "success") => {
    setSnack({ open: true, message: msg, severity: type });
  };
  
  const handleClose = () => setSnack({ ...snack, open: false });

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettings = (setting) => {
    if(setting === "Logout"){
      const confirm = window.confirm("Are you sure you want to logout ?????");
      if(confirm){
        localStorage.removeItem("loggedInUser");
        // alert("Logged Out Successfully!!");
        showSnackbar("Logged Out successfully!!", "success");
        setTimeout(() => { navi("/") }, 500);
        // navi("/");
      }
    }
    else{
      
    }
  };

  return (
    <AppBar position="static" style={{backgroundColor:"#ad1457"}}> 
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <SpaIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}/> */}
          {/* <FilterVintage sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}/> */}
          <AutoAwesome/>
          {/* <ShoppingCartIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            GLAMNEST
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Link to={page?.path} style={{ textDecoration: "none" }}>
                  <MenuItem key={page?.title} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page?.title}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          
          {/* <AutoAwesome/> */}
          {/* <ShoppingCartIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            GLAMNEST
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link to={page?.path} style={{ textDecoration: "none" }}>
                {" "}
                <Button
                  key={page?.title}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page?.title}
                </Button>
              </Link>
            ))}
          </Box>
          {/* Wishlist & Cart Icons */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mr: 2 }}>
            <IconButton onClick={() => navi('/Wishlist')} sx={{ color: 'white' }}>
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton onClick={() => navi('/Cart')} sx={{ color: 'white' }}>
              <ShoppingCartIcon />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt="AKR" src={wimage} /> */}
                <Avatar>{user?.name?.[0]}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleSettings(setting)}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
