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
