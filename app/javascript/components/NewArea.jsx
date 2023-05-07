import React, { useState } from "react";

const NewArea = ({hidden}) => {
  const [name, setName] = useState("");
  const [displayForm, setDisplayForm] = useState(false);

  const toggleDisplay = () => {
    if (displayForm) {
      return setDisplayForm(false);
    }
    setDisplayForm(true);
  }
  /* In the stripHtmlEntities function, you replace the < and > characters with their escaped values. This way, you won’t store raw HTML in your database. */
  const stripHtmlEntities = (str) => {
    return String(str)
      .replace(/\n/g, "<br> <br>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };
  

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

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
      <button onClick={ toggleDisplay }>[ + Area ]</button>
      { displayForm ?
        ( 
        <div>
          <form onSubmit={onSubmit}>
            <input type='text' name='name' id='areaName' required onChange={(event) => onChange(event, setName)}></input>
              <button type='submit'>{`[ => ]`}</button>
          </form>
          </div>
        ) : null}
    </div>
  )
};

export default NewArea;
