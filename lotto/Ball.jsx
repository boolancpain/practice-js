import React, { memo } from 'react';

const Ball = memo(({number}) => {
  let background;
  if(number < 10) {
    background = 'orange';
  } else if(number < 20) {
    background = 'cadetblue';
  } else if(number < 30) {
    background = 'cornflowerblue';
  } else if(number < 40) {
    background = 'khaki';
  } else {
    background = 'deeppink';
  }

  return (
    <div className="number" style={{background}}>{number}</div>
  )
});

export default Ball;