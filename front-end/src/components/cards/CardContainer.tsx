import React, { useEffect, useState } from "react";
import api from "../../services/index";
import Card from "./Card";
import "./index.sass";
interface CardContainerProps {
  children?: React.ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({ children }) => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    api.get("/figurinha").then(({ data }) => {
      setData(data);
    });
  }, []);
  return (
    <div className="card-container">
      {data?.map((card) => (
        <Card key={card._id} nome={card.nome} ataque={card.ataque} />
      ))}
    </div>
  );
};

export default CardContainer;
