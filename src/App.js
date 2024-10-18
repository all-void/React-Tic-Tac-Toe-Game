import { useState } from "react";



export default function Game()
{
  
  const [history,setHistory]=useState([Array(9).fill(null)]);
  const [currentMove,setCurrentMove]=useState(0);
  const currentSquares=history[currentMove];
  const xIsNext=(currentMove%2===0);

  function handlePlay(nextSquares){
setHistory([...history.slice(0,currentMove+1),nextSquares]);
setCurrentMove(currentMove+1);
  }
function jumpToMove(nextMove){
setCurrentMove(nextMove);
}
  const moves=history.map((squares,move)=>{
    let description;
    if(move===history.length-1)
      {return(
        <p></p>
      );
      }
    if(move===0)
    {
      description="Restart Game!!!"
    }
    else
    {
      description="Go to Move #"+move
    }
    
    return (
      <li key={move} >
        <button className="movesButton" onClick={()=>jumpToMove(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} currentMove={currentMove}/>
      </div>
      <div className="game-info">
        <ul>
          {moves}
        </ul>
      </div>
    </div>
  );
}




function Square({value,onSquareClick}) {
  
  // if(value!=null)
  //   {return <button className="square">{value}</button>;
  //   } --one way was this to avoid clicking on box again which already clicked 
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

  function Board({xIsNext,squares,onPlay,currentMove}) {
  
  function handleClick(i){
    
    if(squares[i] || calculateWinner(squares))
    {
      return;
    }
    const nextSquares=squares.slice();
    if(xIsNext)
    {
      nextSquares[i]='X';
    }
    else
    {
      nextSquares[i]='O';
    }

    onPlay(nextSquares);
    
  }

  const winner=calculateWinner(squares);
  let status;
  if(winner)
  {
    status="Winner: "+winner;
  }
  else if(currentMove===9)
  {
    status="Match Drawn- Game Over!!!!!";
  }
  else
  {
    status="Turn of: "+(xIsNext?"X":"O");
  }
  return (
    <>
    <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={()=>handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={()=>handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={()=>handleClick(2)}/>
     
      </div>
      
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={()=>handleClick(3)} />
        <Square value={squares[4]} onSquareClick={()=>handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={()=>handleClick(5)} />
      </div>
      
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={()=>handleClick(6)}/>      
        <Square value={squares[7]} onSquareClick={()=>handleClick(7)}/>      
        <Square value={squares[8]} onSquareClick={()=>handleClick(8)}/>      
      </div>

    </>
    
  );  
}


function calculateWinner(squares)
{
  //check if any row-wise  all same--1st row - 0,1,2 ; 2nd row - 3,4,5 ....as col are 3 only 
for(let i=0;i<=6;i+=3)
{
  let temp=[];
  for(let curr=i;curr<(i+3);curr++)
  {
    temp.push(squares[curr]);
  }
  const allequal=temp.every((num)=>num===temp[0]);
  if(allequal && temp[0])
  {
    return temp[0];
  }

}
for(let i=0;i<3;i++)
  {
    let temp=[];
    for(let curr=i;curr<=(i+6);curr+=3)
    {
      temp.push(squares[curr]);
    }
    const allequal=temp.every((num)=>num===temp[0]);
    if(allequal && temp[0])
    {
      return temp[0];
    }
  
  }

//check diagonal s
if(squares[0]===squares[4] && squares[4]===squares[8])
{
  return squares[0];
}
if(squares[2]===squares[4] && squares[4]===squares[6])
{
  return squares[2];
}
return null;
}

