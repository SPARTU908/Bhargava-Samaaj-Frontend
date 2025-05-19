import React, { useState, useEffect } from 'react';
import styles from './ImageSlider.module.css'; 
const ImageSlider = ({ images, interval = 3000 }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const slide = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(slide);
  }, [images.length, interval]);

  return (
    <div className={styles.slider}>
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index}`}
          className={`${styles.slide} ${index === current ? styles.active : ''}`}
        />
      ))}
    </div>
  );
};

export default ImageSlider;




