import React, { useState, useEffect } from "react";
import UpdateWebLink from "./UpdateWebLink";
import DeleteWebLink from "./DeleteWebLink";

const WebLink = ({ link, area_id, hidden }) => {
  const [displayUpdate, setDisplayUpdate] = useState(false);

  useEffect(() => {
    setDisplayUpdate(false);
  }, [hidden])

  const toggleDisplay = () => {
    if (displayUpdate) {
      return setDisplayUpdate(false);
    }
    setDisplayUpdate(true);
  }

  return (
    <div className="text-2xl">
      {displayUpdate ? <UpdateWebLink id={link.id} area_id={area_id} toggleDisplay={toggleDisplay} linkName={link.name} url={link.web_url} hidden={hidden} /> : (
        <div className="flex gap-2 items-center justify-start">
          <a href={link.web_url} target='_blank'>{link.name}</a>
          <button onClick={toggleDisplay} className={hidden + ` text-sm`}>Edit</button>
          <DeleteWebLink id={link.id} area_id={area_id} hidden={hidden} />
        </div>
      ) }
    </div>
  )
}

export default WebLink;