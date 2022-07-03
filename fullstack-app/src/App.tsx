import React, { useEffect, useState } from "react";
import Card from "./Card";
import api from "./services/index";
function App() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    api.get("/figurinha").then(({ data }) => {
      setData(data);
    });
  }, []);
  return (
    <div className="App">
      {data?.map((card) => (
        <Card key={card._id} nome={card.nome} ataque={card.ataque} />
      ))}
    </div>
  );
}

export default App;
