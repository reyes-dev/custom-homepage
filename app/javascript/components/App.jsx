import React, { useState, useEffect } from "react";
import NewArea from "./NewArea";
import Area from "./Area";

function App() {
  const [areas, setAreas] = useState([]);

    /* Fetch all the areas currently in the database */
    useEffect(() => {
      fetchAreas();
    }, []);
  
  const fetchAreas = async () => {
    const response = await fetch('/areas');
    const data = await response.json();
    setAreas(data);
  };

  return (
    <div className='bg-sky-100 flex flex-column h-screen w-screen justify-center items-center'>
    <h1 className="font-daruma text-3xl">ホームページ</h1>
      <NewArea />
      {areas.map((area, index) => {
        return <div key={index}>
          <Area title={area.name} id={area.id} />
        </div>
      })}
    </div>
  );
}; 

export default App;