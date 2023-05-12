import React from "react";

const DeleteWebLink = ({id, area_id, hidden, theme}) => {  
  const onClick = (event) => {
    event.preventDefault();
    const route = `/areas/${area_id}/web_links/${id}`;
    /* Call to the rails web links delete route with fetch, passing in the selected link's ID */
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(route, {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    });
  };

  return (
    <div className={hidden + ` text-sm`}>
      <button onClick={onClick} className={theme.hover}>[ - ]</button>
    </div>
  )
}

export default DeleteWebLink;
