import React, { useState } from "react";

const NewArea = ({hidden, theme}) => {
  /* Name refers to the title of the new area */
  const [name, setName] = useState("");
  /* For conditionally rendering the form which creates a new area */
  const [displayForm, setDisplayForm] = useState(false);

  const toggleDisplay = () => {
    if (displayForm) {
      return setDisplayForm(false);
    }
    setDisplayForm(true);
  }  

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };
  /* When the form to create a new area is submitted, fetch calls POST to the 
    create area route in rails, passing in the form data */
  const onSubmit = async (event) => {
    event.preventDefault();

    if (name.length == 0) {
      return;
    }
    const body = {
      name
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    await fetch('/areas', {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.ok) {
        console.log(response);
        toggleDisplay();
        return response.json();
      }
      throw new Error('Network response was not ok.');
    }).catch((error) => { console.log(error.message); });
  };

  return (
    <div className={hidden + ' flex gap-2 self-center'}>
      <button onClick={ toggleDisplay } className={theme.hover}>[ + Area ]</button>
      { displayForm ?
        ( 
        <div>
          <form onSubmit={onSubmit}>
            <input type='text' name='name' id='areaName' required onChange={(event) => onChange(event, setName)}></input>
              <button type='submit' className={theme.hover}>{`[ => ]`}</button>
          </form>
          </div>
        ) : null}
    </div>
  )
};

export default NewArea;
