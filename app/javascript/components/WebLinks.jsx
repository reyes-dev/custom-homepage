import React, { useState, useEffect } from "react";
import WebLink from "./WebLink";
/* Component that handles rendering all the web links of a given area */
const WebLinks = ({ area_id, hidden, theme }) => {
  const [webLinks, setWebLinks] = useState([]);
  const [guid, setGuid] = useState('');
  const [ws, setWs] = useState('');
  /* Initialize a WebSocket, this will happen for each individual Area */
  useEffect(() => { setWs(new WebSocket('ws://localhost:3000/cable')); }, [])
  /* Fetch all the links currently in the database */
  useEffect(() => {
    fetchLinks();
  }, []);
  /* Grabs links from Rails route for web links and filters them appropriate to the area they belong to */
  const fetchLinks = async () => {
    const response = await fetch(`/areas/${area_id}/web_links`);
    const data = await response.json();
    setWebLinks(data.filter((obj) => obj.area_id === area_id));
  };
  /* A method called when a websocket server is connected to, and sets the Guid for an individual area, then subscribes to the WebLinksChannel with Guid */
  ws.onopen = () => {
    console.log('Connected to websocket server.');
    setGuid(Math.random().toString(36).substring(2, 15));

    ws.send(
      JSON.stringify({
        command: 'subscribe',
        identifier: JSON.stringify({
          id: guid,
          channel: 'WebLinksChannel',
        }),
      })
    );
  };
  /* Update the Area state with the altered web link data */
  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    if (data.type === 'ping') return;
    if (data.type === 'welcome') return;
    if (data.type === 'confirm_subscription') return;
    if (data.message.broadcasted_web_link.area_id != area_id) return;

    const link = data.message;
      /* When a Rails action is called, an object is broadcasted which holds an action attribute, 
      corresponding to the set of actions in the switch statement for creating, updating and deleting a web link in state */
    switch (link.action) {
      case 'create':
        console.log('Create case.')
        link_obj = link.broadcasted_web_link
        setWebLinks([...webLinks, link_obj]);
        break;
      case 'update':
        console.log('Update case.')
        link_obj = link.broadcasted_web_link
        setWebLinks(webLinks => webLinks.map((obj) => (obj.id === link_obj.id ? link_obj : obj)));
        break;
      case 'destroy':
        console.log('Destroy case.')
        link_obj = link.broadcasted_web_link
        setWebLinks(webLinks => webLinks.filter((obj) => (obj.id != link_obj.id)));
        break;
    }
  };

  const allWebLinks = webLinks.map((link, index) => {
    return <WebLink link={link} key={index} area_id={area_id} hidden={hidden} theme={theme} />
  });

  return (
    <div>
      {allWebLinks}
    </div>
  );
};

export default WebLinks;
