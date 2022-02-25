import React, { useState, useEffect } from "react";
import { trackWinner } from "../helpers/helper";
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BaseBoard from "./BaseBoard";

const TicTacToe = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [clear, setClear] = useState(false);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [open, setOpen] = React.useState(false);
  const squareValue = xIsNext ? "X" : "O";

  useEffect(() => {
    localStorage.setItem('winnerX', 0)
    localStorage.setItem('winnerO', 0)
    setClear(false);
  }, [clear])

  useEffect(()=>{
    setWinner(trackWinner(history[stepNumber]))
    //eslint-disable-next-line
  },[stepNumber])

  useEffect(() => {
    let winX = localStorage.getItem('winnerX')
    let winO = localStorage.getItem('winnerO')
    winner === 'X' && localStorage.setItem('winnerX',  parseInt(winX) + 1)
    winner === 'O' && localStorage.setItem('winnerO', parseInt(winO) + 1)
    winner !== null && setOpen(true)
    // eslint-disable-next-line
  }, [winner])

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    if(stepNumber === 8 && winner === null){
      setOpen(true)
    }
    if (winner || squares[i]) return;
    squares[i] = squareValue;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const reset = (step) => {
    setOpen(false);
    setXisNext(true);
    setStepNumber(step);
  };


  return (
    <>
      <Typography variant="h5" className="header">TIC-TAC-TOE</Typography>
      <BaseBoard squares={history[stepNumber]} onClick={handleClick} />
      <div className="info-wrapper">
        <div className="reset">
          <Button variant="outlined" color="success" onClick={() => reset(0)}>Reset</Button>
          <Button variant="outlined" color="success" onClick={() => {setClear(true)}}>
              Reset Scores
          </Button>
        </div>
        <div className="reset">
          <Typography gutterBottom component="div">
            Player (X) Wins: {localStorage.getItem('winnerX')}
          </Typography>
          <Typography gutterBottom component="div">
            Player (O) Wins: {localStorage.getItem('winnerO')}
          </Typography>
        </div>
        <Snackbar
           open={open}
           message={winner === null ? "Match Tied" : ("Winner is " + winner)}
         /> 
      </div>
    </>
  );
};

export default TicTacToe;
