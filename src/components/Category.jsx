// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { Grid, Paper, Typography } from "@mui/material";
// import { Link, useNavigate, useParams } from "react-router-dom";

// export default function Category() {

//   const[data,setData]=useState([]);
    
//   useEffect(()=>{
//     axios .get('https://dummyjson.com/products/categories')
//     .then((res)=>{
//       console.log(res.data);
//       setData(res.data);
//     })
//       .catch((err)=>{
//         console.log(err)
//     })
//   },[])
  
//   // const nav = useNavigate();
//   // useEffect(()=>{
//   //   const logUser = localStorage.getItem("loggedInUser");
//   //   if(!logUser){
//   //     alert("Please Login");
//   //     nav("/");
//   //   }
//   // },[nav])

//   const nav = useNavigate();
//   const didRun = useRef(false);
//   useEffect(() => {
//     if (didRun.current) return;
//     didRun.current = true;
//     const logUser = localStorage.getItem("loggedInUser");
//     if (!logUser) {
//       alert("Please Login");
//       nav("/");
//     }
//   }, [nav]);

//   return (
//     <div style={{ marginTop: 10 }}>
//       <h1 style={{ alignItems: "center", textAlign: "center" }}>Category</h1>
//       <Grid
//         container
//         spacing={1}
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           "& > :not(style)": {
//             padding: 3,
//             width: 128,
//             height: 128,
//           },
//         }}
//       >
//         {data.map((item)=>(
//            <Grid item xs={3}>
//            <Paper
//              elevation={3}
//              style={{
//                height: "100%",
//                padding: 3,
//                display: "flex",
//                alignItems: "center",
//                justifyContent: "center",
//              }}
//            >
//              <Link to={`/Products/${item.slug}`}>
//                <Typography>{item.name}</Typography>
//              </Link>
//            </Paper>
//          </Grid>

//         )
          

//         )}
       
//       </Grid>
//     </div>
//   );
// }



import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardActionArea, Typography, Box } from '@mui/material';

const categories = [
  "womens-dresses", "womens-shoes", "womens-watches",
  "womens-bags", "womens-jewellery", "tops", "fragrances"
];

export default function Category() {
  const nav = useNavigate();

  const handleClick = (cat) => {
    nav(`/Products/${cat}`);
  };

  return (
    <Box sx={{ padding: 5, backgroundColor: '#fff0f5', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" sx={{ mb: 4, color: '#ad1457', fontWeight: 600, fontFamily: 'Playfair Display' }}>
        Explore Categories
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {categories.map((cat, idx) => (
          <Grid item key={idx}>
            <Card sx={{ width: 250, height: 150, boxShadow: 4 }}>
              <CardActionArea
                onClick={() => handleClick(cat)}
                sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Typography variant="h6" sx={{ textTransform: 'capitalize', color: '#880e4f', fontWeight: '600', fontFamily: 'Lucida Fax' }}>
                  {cat.replace("-", " ")}
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}