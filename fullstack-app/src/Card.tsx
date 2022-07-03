import React from "react";

interface CardProps {
  nome: string;
  ataque: String;
}

const Card: React.FC<CardProps> = ({ nome, ataque }) => {
  return (
    <div>
      <p>{nome}</p>
      <p>{ataque}</p>
    </div>
  );
};

export default Card;
