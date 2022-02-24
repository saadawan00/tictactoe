import React from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Square = () => {

  return (
    <Button variant="contained" className="btn-square" >
      <Typography variant="h2" component="div">
        X
      </Typography>
    </Button>
  );
};

export default Square;
