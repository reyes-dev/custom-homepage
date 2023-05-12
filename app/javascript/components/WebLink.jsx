import React, { useState, useEffect } from "react";
import UpdateWebLink from "./UpdateWebLink";
import DeleteWebLink from "./DeleteWebLink";

const WebLink = ({ link, area_id, hidden, theme }) => {
  /* For conditionally rendering the update web link form */
  const [displayUpdate, setDisplayUpdate] = useState(false);
 /* Whenever hidden is changed (edit mode is toggled), render or hide the update web link component */
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
          <a href={link.web_url} target='_blank' className={theme.hover}>{link.name}</a>
          <button onClick={toggleDisplay} className={hidden + theme.hover +  ` text-sm`}>Edit</button>
          <DeleteWebLink id={link.id} area_id={area_id} hidden={hidden} theme={theme} />
        </div>
      ) }
    </div>
  )
}

export default WebLink;
