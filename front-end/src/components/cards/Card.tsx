import React from "react";

interface CardProps {
  nome: string;
  ataque: String;
}

const Card: React.FC<CardProps> = ({ nome, ataque }) => {
  return (
    <div className="card">
      <div className="card-stars"></div>
      <div className="card-image">
        <img src="#" alt="card-image" />
      </div>
      <div className="card-description">
        <div className="card-name">
          <p>{nome}</p>
        </div>
        <div className="card-sub-description">
          <div className="left-card-description">
            <p>Ataque </p>
          </div>
          <div className="right-card-description">{ataque}</div>
        </div>
        <div className="card-sub-description">
          <div className="left-card-description">
            <p>Vida </p>
          </div>
          <div className="right-card-description">{ataque}</div>
        </div>
        <div className="card-sub-description">
          <div className="left-card-description">
            <p>Descricao </p>
          </div>
          <div className="right-card-description">
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
