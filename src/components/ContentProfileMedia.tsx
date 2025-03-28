import React from 'react';

function ContentProfileMedia(image: string) {
  return (
    <div>
      <img src={`./src/assets/img/${image}.jpg`} alt="" />
    </div>
  );
}

export default ContentProfileMedia;
