import React, { useState, useEffect } from "react";
import NewArea from "./NewArea";
import Area from "./Area";

const ws = new WebSocket('ws://localhost:3000/cable');

function App() {
  const [areas, setAreas] = useState([]);
  const [guid, setGuid] = useState('');
  /* A method called when a websocket server is connected to, and sets the Guid for an individual area, then subscribes to the WebLinksChannel with Guid */
  ws.onopen = () => {
      console.log('Connected to websocket server.');
      setGuid(Math.random().toString(36).substring(2, 15));
  
  ws.send(
      JSON.stringify({
        command: 'subscribe',
        identifier: JSON.stringify({
          id: guid,
          channel: 'AreasChannel',
        }),
      })
    );
  };
    /* Stream Area data */
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === 'ping') return;
      if (data.type === 'welcome') return;
      if (data.type === 'confirm_subscription') return;
  
      const area = data.message;
      switch (area.action) {
        case 'create':
          console.log('Create case.')
          area_obj = area.broadcasted_area
          setAreas([...areas, area_obj]);
          break;
        case 'update':
          console.log('Update case.')
          area_obj = area.broadcasted_area
          setAreas(areas => areas.map((obj) => (obj.id === area_obj.id ? area_obj : obj)));
          break;
        case 'destroy':
          console.log('Destroy case.')
          area_obj = area.broadcasted_area
          setAreas(areas => areas.filter((obj) => (obj.id != area_obj.id)));
          break;
      }
    };

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