// src/components/Flower.tsx
import React from 'react';
import './Flower.css';

interface FlowerProps {
  src: string;
  top: string;
  left: string;
}

const Flower: React.FC<FlowerProps> = ({ src, top, left }) => {
  return (
    <img src={src} className="flower" style={{ top: top, left: left}} alt="flower" />
  );
};

export default Flower;
