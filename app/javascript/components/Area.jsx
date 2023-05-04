import React from "react";
import UpdateArea from "./UpdateArea";
import DeleteArea from "./DeleteArea";
import WebLinks from './WebLinks'
import NewWebLink from "./NewWebLink";

const Area = ({title, id}) => {
  return (
    <div className="border-black h-32 w-32">
      <h2>{title}</h2>
      <UpdateArea area_id={id} />
      <DeleteArea area_id={id} />
      <WebLinks area_id={id} />
      <NewWebLink area_id={id} />
    </div>
  )
}

export default Area;