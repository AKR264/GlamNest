// import React, { useEffect, useRef } from 'react';
// import image1 from './Images/Makeup.webp';
// import image2 from './Images/lipstick.avif';
// import image3 from './Images/manushi.avif';
// import image4 from './Images/sunscreen.avif';
// import image5 from './Images/fashion.avif';
// import Card from '@mui/material/Card';
// import CardMedia from '@mui/material/CardMedia';
// import { useNavigate } from 'react-router-dom';
// function Home() {
// // const nav = useNavigate();
// //   useEffect (()=>{
      
// //   const logUser = localStorage.getItem("loggedInUser");
// //   if(!logUser){
// //     alert("Please Login");
// //     nav("/");
// //   }
// //   },[nav])



//   const nav = useNavigate();
//     const didRun = useRef(false);
//     useEffect(() => {
//       if (didRun.current) return;
//       didRun.current = true;
//       const logUser = localStorage.getItem("loggedInUser");
//       if (!logUser) {
//         alert("Please Login");
//         nav("/");
//       }
//   }, [nav]);

//   const products =[
//             {name:"MakeUp", profile:image1},
//             {name:"Dresses", profile:image2},
//             {name:"Grocery", profile:image3},
//             // {name:"Sunscreen", profile:image4},
//             {name:"Fashion", profile:image5},
//         ]
//   return (
//     <div>
//       <h1 align={'center'}>Home</h1>
//       {products.map((prod)=>(
//         <Card sx={{ maxWidth: 345 }} style={{display:"inline-block", marginLeft:"30px"}}>
//           <CardMedia
//             component="img"
//             style={{height:"360px", width:"350px"}}
//             image= {prod.profile}
//             alt={prod.name}
//           />
//         </Card>
//       ))}
//     </div>
//   );
// }

// export default Home;




import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Box,
  CardActionArea,
  IconButton
} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

// Category images
import image1 from './Images/makeup3.webp';
import image2 from './Images/clothing.avif';
import image3 from './Images/perfume2.avif';
import image5 from './Images/accessory2.avif';

// Carousel slides
import slide1 from './Images/slide12.jpg';
import slide2 from './Images/slide211.jpg';
import slide3 from './Images/slide36.avif';
import slide4 from './Images/slide41.avif';

// Shop the Look images
import look1 from './Images/look1.jpg';
import look2 from './Images/look2.avif';
import look3 from './Images/look31.jpg';
import look4 from './Images/look4.jpg';

function Home() {
  const nav = useNavigate();
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;
    const logUser = localStorage.getItem("loggedInUser");
    if (!logUser) {
      alert("Please Login");
      nav("/");
    }
  }, [nav]);

  const slides = [
    { image: slide1, title: "Glow Up with GlamNest", subtitle: "Explore our best-selling beauty picks", target: "beauty" },
    { image: slide2, title: "Dress to Impress", subtitle: "New arrivals curated for your style", target: "tops" },
    { image: slide3, title: "Fragrances You’ll Love", subtitle: "Soft, bold or floral — pick your scent", target: "fragrances" },
    { image: slide4, title: "Accessorize Your Vibe", subtitle: "Statement pieces for every look", target: "womens-jewellery" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Auto-slide every 4 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  const categories = [
    { name: "beauty", label: "Makeup", image: image1 },
    { name: "tops", label: "Tops & Dresses", image: image2 },
    { name: "fragrances", label: "Fragrances", image: image3 },
    { name: "womens-jewellery", label: "Accessories", image: image5 },
  ];

  const handleCardClick = (categoryName) => {
    nav(`/Products/${categoryName}`);
  };

  const looks = [look1, look2, look3, look4];

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  return (
    <div style={{ backgroundColor: '#fff0f5', minHeight: '100vh' }}>
      <Box sx={{ py: 2, backgroundColor: '#fff8f8', textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#880e4f', fontFamily: 'Book Antiqua' }}>
          Welcome{user?.name ? `, ${user.name}` : ""}!
        </Typography>
      </Box>
      {/* === Carousel === */}
      <Box sx={{ width: '100%', height: '450px', position: 'relative', overflow: 'hidden' }}>
        <img
          src={slides[currentSlide].image}
          alt="Slide"
          onClick={() => handleCardClick(slides[currentSlide].target)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.65)', cursor: 'pointer' }}
        />

        <IconButton
          onClick={prevSlide}
          sx={{ position: 'absolute', top: '45%', left: '20px', color: 'white', backgroundColor: 'rgba(0,0,0,0.3)' }}
        >
          <ArrowBackIos />
        </IconButton>
        <IconButton
          onClick={nextSlide}
          sx={{ position: 'absolute', top: '45%', right: '20px', color: 'white', backgroundColor: 'rgba(0,0,0,0.3)' }}
        >
          <ArrowForwardIos />
        </IconButton>

        <Typography
          variant="h3"
          sx={{
            position: 'absolute',
            top: '35%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontWeight: 'bold',
            fontFamily: 'Playfair Display',
            textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          {slides[currentSlide].title}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            position: 'absolute',
            top: '55%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontStyle: 'italic',
            fontWeight: 300,
            textShadow: '1px 1px 5px rgba(0,0,0,0.4)',
          }}
        >
          {slides[currentSlide].subtitle}
        </Typography>
      </Box>

      {/* === Categories === */}
      <Box sx={{ padding: '40px' }}>
        <Typography variant="h4" align="center" sx={{ color: '#880e4f', mb: 4, fontWeight: 600, fontFamily: 'Playfair Display' }}>
          Shop by Category
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {categories.map((item, index) => (
            <Grid item key={index}>
              <Card
                sx={{
                  maxWidth: 300,
                  borderRadius: '20px',
                  boxShadow: 5,
                  '&:hover': {
                    transform: 'scale(1.03)',
                    transition: 'all 0.3s ease-in-out',
                  }
                }}
              >
                <CardActionArea onClick={() => handleCardClick(item.name)}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={item.image}
                    alt={item.label}
                  />
                  <CardContent>
                    <Typography variant="h6" align="center" style={{ fontWeight: 'bold', color: '#ad1457', fontFamily: 'Lucida Fax' }}>
                      {item.label}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* === Shop the Look ===
      <Box sx={{ padding: '40px', backgroundColor: '#fce4ec' }}>
        <Typography variant="h4" align="center" sx={{ color: '#4a148c', mb: 4, fontWeight: 600 }}>
          Shop the Look
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {looks.map((look, i) => (
            <Grid item key={i}>
              <Box
                sx={{
                  position: 'relative',
                  width: 280,
                  height: 360,
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: 4,
                  cursor: 'pointer',
                  '&:hover .overlay': {
                    opacity: 1
                  }
                }}
                onClick={() => nav(`/Look/${i + 1}`)}
              >
                <img
                  src={look}
                  alt={`Look ${i + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '15px'
                  }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: '0.3s ease-in-out'
                  }}
                >
                  <Typography
                    variant="button"
                    sx={{
                      color: 'white',
                      backgroundColor: '#ad1457',
                      padding: '10px 20px',
                      borderRadius: '30px',
                      fontWeight: 'bold'
                    }}
                  >
                    View Look
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box> */}
    </div>
  );
}

export default Home;