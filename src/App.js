// import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Category from "./components/Category";
import About from "./components/About";
import Products from "./components/Products";
import AllProducts from "./components/AllProducts";
import MuiLogin from "./components/MuiLogin";
import MuiRegister from "./components/MuiRegister";
import { useLocation } from "react-router-dom";
import LookDetail from "./components/LookDetail";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
 
function AppContent(){
  const location = useLocation();
  const hideNavbar = ['/','/MuiRegister'];
  return(
    <>
    {!hideNavbar.includes(location.pathname) && <Navbar/>}
      <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Category" element={<Category />} />
          <Route path="/Products/:categoryName" element={<Products />} />
          <Route path="/Products" element={<AllProducts />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<MuiLogin/>} />
          <Route path="/MuiRegister" element={<MuiRegister/>} />
          <Route path="/Look/:lookId" element={<LookDetail/>} />
          <Route path="/Wishlist" element={<Wishlist/>} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </>
  )
}
function App() {
  return ( 
    <>
      <BrowserRouter>
        <AppContent/>
      </BrowserRouter>
    </>
  );
}

export default App;
