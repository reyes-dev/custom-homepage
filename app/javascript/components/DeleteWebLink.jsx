import React from "react";

const DeleteWebLink = ({id}) => {  
  const onClick = (event) => {
    event.preventDefault();
    const route = `/web_links/${id}`;

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
    <div>
      <button onClick={onClick} className="font-jura">[ - ]</button>
    </div>
  )
}

export default DeleteWebLink;