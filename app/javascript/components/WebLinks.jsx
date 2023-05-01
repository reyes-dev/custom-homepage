import React, { useState, useEffect } from "react";
import UpdateWebLink from "./UpdateWebLink";
import DeleteWebLink from "./DeleteWebLink";

const WebLinks = () => {
  const [webLinks, setWebLinks] = useState([]);

  useEffect(() => {
    fetch('/web_links').then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.')
    }).then((response) => {
      setWebLinks(response);
    })
  }, [])

  const allWebLinks = webLinks.map((link, index) => {
      return <div key={index}>
        <a href={'https://' + link.web_url} target='_blank' className="font-['Jura'] ">{link.name}</a>
        <UpdateWebLink id={link.id} />
        <DeleteWebLink id={link.id} />
      </div>
    });

  return (
    <div>
      {allWebLinks}
    </div>
  );
}

export default WebLinks;