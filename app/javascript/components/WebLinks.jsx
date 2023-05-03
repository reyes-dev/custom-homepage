import React, { useState, useEffect } from "react";
import UpdateWebLink from "./UpdateWebLink";
import DeleteWebLink from "./DeleteWebLink";
/* Initialize websocket */
const ws = new WebSocket('ws://localhost:3000/cable');

const WebLinks = () => {
  const [webLinks, setWebLinks] = useState([]);
  const [guid, setGuid] = useState('');
  /* Fetch all the links currently in the database */
  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    const response = await fetch('/web_links');
    const data = await response.json();
    setWebLinks(data);
  };
  /* Open a websocket server to update the page if link records are altered */
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
  /* Update the page */
  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    if (data.type === 'ping') return;
    if (data.type === 'welcome') return;
    if (data.type === 'confirm_subscription') return;

    const link = data.message;
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
    return <div key={index}>
      <a href={'https://' + link.web_url} target='_blank' className="font-['Jura'] ">{link.name}</a>
      <UpdateWebLink id={link.id} />
      <DeleteWebLink id={link.id} />
    </div>
  });

  return (
    <div>
      <p>Guid: {guid}</p>
      {allWebLinks}
    </div>
  );
};

export default WebLinks;