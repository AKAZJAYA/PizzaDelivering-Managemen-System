import { useState, useEffect } from 'react';

const ImageSlider = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  const images = [
    '/images/banner1.jpg',
    '/images/banner2.jpg',
    '/images/banner3.jpg',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // Increased duration for better viewing

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-transform duration-1000 ease-in-out ${
            currentImage === index 
              ? 'translate-x-0' 
              : 'translate-x-full'
          }`}
          style={{
            transform: `translateX(${(index - currentImage) * 100}%)`,
          }}
        >
          {/* Add dark overlay */}
          <div className="absolute inset-0 bg-black opacity-70"></div>
          <img
            src={img}
            alt={`Pizza Banner ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;