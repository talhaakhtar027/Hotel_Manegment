import React from 'react';
import { Box, Typography } from '@mui/material';

const Breadcrumb = ({ text1, text2 }) => {
  return (
    <Box 
      sx={{
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        textAlign: 'center', 
        pt: 8, 
        pb: 4
      }}
    >
      <Box>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 'light',
            fontSize: '4rem', // Adjust size for MUI
            color: '#F1C40F', // Example color (change it accordingly)
            fontFamily: 'new-font-1', // Assuming you define this font elsewhere
          }}
        >
          {text1}
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'semibold',
            letterSpacing: '0.2rem',
            textTransform: 'uppercase',
            fontSize: '2.5rem', // Adjust size for MUI
            color: 'white',
          }}
        >
          {text2}
        </Typography>
      </Box>
    </Box>
  );
}

export default Breadcrumb;
