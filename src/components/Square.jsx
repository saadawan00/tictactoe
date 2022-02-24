import React from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Square = ({ value, onClick }) => {

  return (
    <Button variant="contained" className="btn-square" onClick={onClick}>
      <Typography variant="h2" component="div">
        {value}
      </Typography>
    </Button>
  );
};

export default Square;
