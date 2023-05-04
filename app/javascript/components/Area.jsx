import React, { useState } from "react";
import UpdateArea from "./UpdateArea";
import DeleteArea from "./DeleteArea";
import WebLinks from './WebLinks'
import NewWebLink from "./NewWebLink";

const Area = ({ title, id }) => {
  const [displayUpdate, setDisplayUpdate] = useState(false);

  const toggleDisplayUpdate = () => {
    if (displayUpdate) {
      return setDisplayUpdate(false);
    }
    setDisplayUpdate(true);
  }

  return (
    <div className="border-black h-32 w-32">
      {displayUpdate ? <UpdateArea area_id={id} toggleDisplayUpdate={toggleDisplayUpdate} title={title} /> :
      <h2>
        <button onClick={ toggleDisplayUpdate }>{title}</button>
        </h2>}
      
      <DeleteArea area_id={id} />
      <WebLinks area_id={id} />
      <NewWebLink area_id={id} />
    </div>
  )
}

export default Area;