import React from "react";

const DeleteArea = ({area_id}) => {  
  const onClick = (event) => {
    event.preventDefault();

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
    <div>
      <button onClick={onClick} className="font-jura">[ Remove Area ]</button>
    </div>
  )
}

export default DeleteArea;