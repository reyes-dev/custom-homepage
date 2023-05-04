import React from "react";
import WebLinks from './WebLinks'
import NewWebLink from "./NewWebLink";

const Area = ({title, id}) => {
  return (
    <div className="border-black h-32 w-32">
      <h2>{title}</h2>
      <WebLinks area_id={id} />
      <NewWebLink area_id={id} />
    </div>
  )
}

export default Area;