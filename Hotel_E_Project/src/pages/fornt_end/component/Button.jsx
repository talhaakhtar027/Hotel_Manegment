import React from 'react';
import { Button as MUIButton } from '@mui/material';

const Button = ({ text, className, iconAfter, onClick }) => {
  return (
    <MUIButton
      variant="contained"
      color="primary"
      className={className}
      endIcon={iconAfter}
      onClick={onClick}
      sx={{
        textTransform: 'none',
        borderRadius: '12px',
        padding: '10px 20px',
        fontWeight: 'bold',
       
          backgroundColor: '#e57c00',
          '&:hover': { backgroundColor: '#cc6d00' },
          color: 'black',
       
      }}
    >
      {text}
    </MUIButton>
  );
};

export default Button;
