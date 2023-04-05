import React from 'react'

import "../Game.css"

const Gamecircle = ({id,children,className,onCircleClicked}) => {
  return (
    <div className={`gamecircle ${className}`}  onClick={() => onCircleClicked(id)}>
      {children}
    </div>
    
  )
}

export default Gamecircle;