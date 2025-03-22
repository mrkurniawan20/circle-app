// import React from 'react';
interface CircleProps {
  textSize: string;
}

function CircleText({ textSize }: CircleProps) {
  return <h2 className={`${textSize} font-semibold text-green-500 pb-2`}>circle</h2>;
}

export default CircleText;
