import { useState } from "react";
import Square from "../Square/Square";
import "./Board.css";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState('');

  let status;

  if (winner != '') {
      status = "Winner: " + winner;
  } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
  }
  

  const handleSquare = (i: number) => {

    //disable the board if winner is found
    if (winner) {
      return;
    }

    //check if the square is already filled or applies 
    const squaresCopy = squares.slice();
    if (squaresCopy[i] != null) {
      console.log("Square already filled");
      return;
    }
    squaresCopy[i] = xIsNext ? "X" : "O";
    setSquares(squaresCopy);
    if (calculateWinner(squaresCopy)) {
      setWinner(xIsNext ? "X" : "O");
      return;
    }
    setXIsNext(!xIsNext);
  }
  
  const calculateWinner = (squares: Array<number>) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
      
    }
    
    return null;
  }

  const boards = () => {
    const board = squares.map(function (square: string, i) {
      return <Square key={i} value={square} onClick={() => handleSquare(i)} />;
    });
    return <div className="board">{board}</div>;
  };
  
  return (
    <div>
      <div className="status">{status}</div>
      {boards()}
    </div>
  );
}
