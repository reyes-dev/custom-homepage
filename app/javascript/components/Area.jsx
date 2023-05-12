import React, { useState } from "react";
import UpdateArea from "./UpdateArea";
import DeleteArea from "./DeleteArea";
import WebLinks from './WebLinks'
import NewWebLink from "./NewWebLink";

const Area = ({ title, id, hidden, theme }) => {
  /* displayUpdate is simply the boolean which determines whether to conditionally render
  the UpdateArea component or render the title itself */
  const [displayUpdate, setDisplayUpdate] = useState(false);

  const toggleDisplayUpdate = () => {
    if (displayUpdate) {
      return setDisplayUpdate(false);
    }
    setDisplayUpdate(true);
  }

  return (
    <div className="w-1/5 p-8">
      <div className="flex gap-2 items-center">
      {displayUpdate ? <UpdateArea area_id={id} toggleDisplayUpdate={toggleDisplayUpdate} title={title} /> :
      <h2>
        <button onClick={ toggleDisplayUpdate } className={"text-3xl " + theme.area_title}>{title}</button>
      </h2>}
      <DeleteArea area_id={id} hidden={hidden} theme={theme} />
      </div>
      <WebLinks area_id={id} hidden={hidden} theme={theme} />
      <NewWebLink area_id={id} hidden={hidden} theme={theme} />
    </div>
  )
}

export default Area;
