import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Container, Divider } from '@mui/material';

export default function About() {
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
  return (
    <Box sx={{ backgroundColor: '#fff0f5', minHeight: '100vh', paddingY: 6 }}>
      <Container maxWidth="md">
        <Typography variant="h3" align="center" sx={{ mb: 4, color: '#ad1457', fontWeight: 'bold', fontFamily: 'Playfair Display' }}>
          About GlamNest
        </Typography>

        <Typography variant="h6" sx={{ mb: 3, color: '#4a148c', fontFamily: 'Lucida Fax' }}>
          Our Story
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          GlamNest is your go-to destination for chic, affordable, and empowering fashion & beauty products. 
          Born from a passion for self-expression and confidence, our platform brings you curated collections 
          that blend trends with timeless elegance.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" sx={{ mb: 3, color: '#4a148c', fontFamily: 'Lucida Fax' }}>
          Why Choose Us
        </Typography>
        <ul style={{ color: '#333', fontSize: '1rem', lineHeight: 1.8 }}>
          <li>Handpicked styles for modern women ✨</li>
          <li>Quality you can trust 💄</li>
          <li>Fast delivery and easy returns 🚚</li>
          <li>24/7 customer support 💌</li>
        </ul>

        <Divider sx={{ my: 4 }} />

        <Typography variant="body2" align="center" sx={{ mt: 6, color: 'gray' }}>
          © 2025 GlamNest. Designed with love for the modern muse.
        </Typography>
      </Container>
    </Box>
  );
}
