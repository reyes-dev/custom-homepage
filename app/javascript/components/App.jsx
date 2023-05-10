import React, { useState, useEffect } from "react";
import NewArea from "./NewArea";
import Area from "./Area";

const ws = new WebSocket('ws://localhost:3000/cable');

function App() {
  /* All existing areas, parts of the page that hold links, will be stored in the areas state array */
  const [areas, setAreas] = useState([]);
  /* For websockets, we need to set an ID when we request to connect to the ActionCable server  */
  const [guid, setGuid] = useState('');
  /* For hiding "edit mode" features like adding or deleting links & areas */
  const [hidden, setHidden] = useState('hidden');
  /* Toggle between empty string and 'hidden' string for use in CSS className attribute  */
  const toggleHidden = () => {
    if (hidden === 'hidden') return setHidden('');
    setHidden('hidden')
  }
  /* A method called when a websocket server is connected to, and sets the Guid area, 
    then subscribes to the AreasChannel with Guid, which streams all the live area updates we want */
  ws.onopen = () => {
      console.log('Connected to websocket server.');
      /* Randomly generate ID */
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
    /* The message event is fired when data is received through a WebSocket. 
    In this case, the data is an object with an "action" property and with 
    the ID and name of the area which will be used  */
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
          /* Add to areas state array */
          setAreas([...areas, area_obj]); 
          break; 
        case 'update': console.log('Update case.')
          area_obj = area.broadcasted_area
          /* Map over areas stay area, replacing the object with an identical ID  i.e updated data */
          setAreas(areas => areas.map((obj) => (obj.id === area_obj.id ? area_obj : obj)));
          break;
        case 'destroy':
          console.log('Destroy case.')
          area_obj = area.broadcasted_area
          /* Filter out the object with the identical ID, removing it from the state array */
          setAreas(areas => areas.filter((obj) => (obj.id != area_obj.id)));
          break;
      }
    };

    /* Fetch all the areas currently in the database */
    useEffect(() => {
      fetchAreas();
    }, []);
    /* /areas is the rails route to GET created area records */ 
    const fetchAreas = async () => {
      const response = await fetch('/areas');
      const data = await response.json();
      setAreas(data);
    };
  
  const allAreas = areas.map((area, index) => {
      return <Area title={area.name} id={area.id} hidden={hidden} key={index} />
    });
    
  return (
    <div className='font-["Jura"] bg-angel-devil bg-no-repeat bg-cover bg-fixed grid items-center justify-center h-screen text-angel'>
      <div className="z-[1] h-[80vh] w-[80vw] relative bg-inherit rounded-[5px] p-8 overflow-hidden shadow-[0_0_16px_0_rgba(0,0,0,0.2)] before:pointer-events-none before:absolute before:bg-inherit before:top-0 before:left-0 before:right-0 before:bottom-0 before:shadow-[inset_0_0_2000px_rgba(103,0,6,.5)]  before:backdrop-blur-[7px] before:m-[-20px] before:z-[-1]">
        <div className="flex flex-col gap-8 justify-center items-center">
          <h1 className="text-8xl text-okaeri">welcome home</h1>
          <button onClick={toggleHidden} className="">{` (・∀・) `}</button>
          <NewArea hidden={hidden} />
        </div>
        
        <div className="flex flex-wrap justify-start items-start">
            {allAreas}
        </div>
      </div>
    </div>
  );
}; 

export default App;
