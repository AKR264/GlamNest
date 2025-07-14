import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';

function LookDetail() {
  const { lookId } = useParams();
  const nav = useNavigate();

  return (
    <Box sx={{ padding: 5 }}>
      <Typography variant="h4" sx={{ color: '#ad1457', mb: 2 }}>
        Look #{lookId}
      </Typography>

      <Typography sx={{ mb: 4 }}>
        This curated look includes a perfect blend of makeup, outfits, and accessories. Add these items to your cart and own the look!
      </Typography>

      <Button variant="contained" sx={{ backgroundColor: '#ad1457' }} onClick={() => nav('/Products')}>
        Shop Similar Products
      </Button>
    </Box>
  );
}

export default LookDetail;