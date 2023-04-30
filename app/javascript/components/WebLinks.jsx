import React, { useState, useEffect } from "react";

const WebLinks = () => {
  const [webLinks, setWebLinks] = useState([]);

  useEffect(() => {
    fetch('/web_links').then((response) => {
      console.log(response)
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.')
    }).then((response) => {
      console.log(response)
      setWebLinks(response);
    })
  }, [])

  const allWebLinks = webLinks.map((link, index) => {
      return <div key={index}>
        <a href={'https://' + link.web_url} target='_blank'>{link.name}</a>
      </div>
    });

  return (
    <div>
      {allWebLinks}
    </div>
  );
}

export default WebLinks;