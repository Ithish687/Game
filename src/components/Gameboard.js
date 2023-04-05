import React ,{useEffect, useState} from "react";


import "../Game.css";
import Header from "./Header";


import Footer from "./Footer";
import Gamecircle from "./Gamecircle";

import {isDraw,isWinner,getComputerMove}from "../Helper";
import{
    GAME_STATE_PLAYING,
    GAME_STATE_WIN,
    NO_PLAYER,
    PLAYER_1,
    PLAYER_2,
    NO_CIRCLES,
    GAME_STATE_DRAW,
} from "../Constant";





const Gameboard = () =>{
    const[gameBoard,setGameBoard]=useState(Array(NO_CIRCLES).fill(NO_PLAYER));
    const[currentPlayer,setCurrentPlayer]=useState(PLAYER_1);
    const[gameState,setGameState]=useState(GAME_STATE_PLAYING);
    const[winPlayer,setWinPlayer]=useState(NO_PLAYER);

    console.log(gameBoard);

    useEffect(() =>{
        initGame();
    },[]);

    const initGame = () => {
        console.log('init game');
        setGameBoard(Array(16).fill(NO_PLAYER));

        setCurrentPlayer(PLAYER_1);
        setGameState(GAME_STATE_PLAYING);
    }

    const initBoard = () =>
    {
        const circles=[];
        for(let i=0;i<NO_CIRCLES;i++)
        {
        circles.push(renderCircle(i));
        }
    return circles;
    }

    const suggestMove = () => 
    {
    console.log("suggest move");
    circleClicked(getComputerMove(gameBoard));
    }

    const circleClicked = (id) =>{
        console.log("circle clicked: "+ id)
    
    if(gameBoard[id]!==NO_PLAYER)return;

    if(gameState !== GAME_STATE_PLAYING)return;

    setGameBoard(prev => {
        return prev.map((circle,pos) => {
           if(pos === id) return currentPlayer;
           return circle;
        })
    })

    if(isWinner(gameBoard,id,currentPlayer)){
        console.log("Winner");
        setGameState(GAME_STATE_WIN);
        setWinPlayer(currentPlayer);
    }

    if(isDraw(gameBoard,id,currentPlayer)){
        console.log("Game Draw");
        setGameState(GAME_STATE_DRAW);
        setWinPlayer(NO_PLAYER);
    }

    setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);

    console.log(gameBoard);
    console.log(currentPlayer);
    }
    const renderCircle = id => {
        return<Gamecircle key={id} id={id} className={`player_${gameBoard[id]}`} onCircleClicked={circleClicked}/>
    }
    return(
    <>
        <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer}/>
        <div className="gameboard" >
            {initBoard()}
        </div>
        <Footer onNewGameClick={initGame} onSuggestClick={suggestMove} />
   </>
)
}
export default Gameboard;