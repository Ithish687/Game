import React from 'react'



const Footer = ({onNewGameClick,onSuggestClick}) => {
  
  return (
    <div className="panel footer">
     <button onClick={onSuggestClick}>Suggest</button>
     <button onClick={onNewGameClick}>New Game</button>  
    </div>
  );
};

export default Footer;