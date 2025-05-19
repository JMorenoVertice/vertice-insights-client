import React from 'react';

interface CardProps {
  title: string;
  description: string;
}

export const Card = ({ title, description }: CardProps) => (
  <div className="card">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);
