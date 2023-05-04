import React, { useState } from "react";
import UpdateArea from "./UpdateArea";
import DeleteArea from "./DeleteArea";
import WebLinks from './WebLinks'
import NewWebLink from "./NewWebLink";

const Area = ({ title, id, hidden }) => {
  const [displayUpdate, setDisplayUpdate] = useState(false);

  const toggleDisplayUpdate = () => {
    if (displayUpdate) {
      return setDisplayUpdate(false);
    }
    setDisplayUpdate(true);
  }

  return (
    <div className="bg-zinc-300 w-fit p-8">
      <div className="flex flex-row gap-2">
      {displayUpdate ? <UpdateArea area_id={id} toggleDisplayUpdate={toggleDisplayUpdate} title={title} /> :
      <h2>
        <button onClick={ toggleDisplayUpdate }>{title}</button>
      </h2>}
      <DeleteArea area_id={id} hidden={hidden} />
      </div>
      <WebLinks area_id={id} hidden={hidden} />
      <NewWebLink area_id={id} hidden={hidden} />
    </div>
  )
}

export default Area;