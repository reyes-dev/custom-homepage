import React, { useState } from "react";

const UpdateArea = ({ area_id, toggleDisplayUpdate, title }) => {
  /* New name of the area, by default it uses the already given title */
  const [name, setName] = useState(title);
  
  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };
  /* When the form to update the area name is submitted, 
     fetch calls the PUT action to the area update route in rails */
  const onSubmit = (event) => {
    event.preventDefault();

    if (name.length == 0) {
      return;
    }
    const body = {
      name
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(`/areas/${area_id}`, {
      method: 'PUT',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.ok) {
        toggleDisplayUpdate();
        return response.json();
      }
      throw new Error('Network response was not ok.');
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type='text' name='name' id='areaName' required onChange={(event) => onChange(event, setName)} value={name}></input>
        <button type='submit'>{`=>`}</button>
      </form>
    </div>
  )
}

export default UpdateArea;
