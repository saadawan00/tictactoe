import React, { useState, useEffect } from "react";
import { trackWinner } from "../helpers/helper";
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BaseBoard from "./BaseBoard";

const TicTacToe = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [winnerX, setWinnerX] = useState(0);
  const [winnerO, setWinnerO] = useState(0);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [open, setOpen] = React.useState(false);
  const squareValue = xIsNext ? "X" : "O";

  useEffect(()=>{
    setWinner(trackWinner(history[stepNumber]))
  },[stepNumber])

  useEffect(() => {
    winner === 'X' && setWinnerX(winnerX + 1)
    winner === 'O' && setWinnerO(winnerO + 1)
    winner !== null && setOpen(true)
  }, [winner])

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
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
          <Button variant="outlined" color="success" onClick={() => {
            setWinnerO(0); 
            setWinnerX(0)
            }}>
              Reset Scores
          </Button>
        </div>
        <div className="reset">
          <Typography gutterBottom component="div">
            Player (X) Wins: {winnerX}
          </Typography>
          <Typography gutterBottom component="div">
            Player (O) Wins: {winnerO}
          </Typography>
        </div>
        <Snackbar
          open={open}
          message={"Winner is " + winner}
        />
      </div>
    </>
  );
};

export default TicTacToe;
