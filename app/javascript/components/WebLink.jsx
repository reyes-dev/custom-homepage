import React, { useState } from "react";
import UpdateWebLink from "./UpdateWebLink";
import DeleteWebLink from "./DeleteWebLink";

const WebLink = ({ link, area_id }) => {
  const [displayUpdate, setDisplayUpdate] = useState(false);
  const toggleDisplay = () => {
    if (displayUpdate) {
      return setDisplayUpdate(false);
    }
    setDisplayUpdate(true);
  }

  return (
    <div>
      {displayUpdate ? <UpdateWebLink id={link.id} area_id={area_id} toggleDisplay={toggleDisplay} linkName={link.name} url={link.web_url} /> : null }
      <a href={'https://' + link.web_url} target='_blank' className="font-['Jura'] ">{link.name}</a>
      <button onClick={toggleDisplay}>Edit</button>
      <DeleteWebLink id={link.id} area_id={area_id} />
    </div>
  )
}

export default WebLink;