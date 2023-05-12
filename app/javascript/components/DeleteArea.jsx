import React from "react";

const DeleteArea = ({area_id, hidden, theme}) => {  
  const onClick = (event) => {
    event.preventDefault();
   /* Call to the rails area delete route with fetch, passing in the selected area's ID */
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(`/areas/${area_id}`, {
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
    <div className={hidden}>
      <button onClick={onClick} className={theme.hover}>( - )</button>
    </div>
  )
}

export default DeleteArea;
