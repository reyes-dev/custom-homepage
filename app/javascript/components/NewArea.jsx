import React, { useState } from "react";

const NewArea = () => {
  const [name, setName] = useState("");

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
        return response.json();
      }
      throw new Error('Network response was not ok.');
    }).catch((error) => { console.log(error.message); });
  };

  return (
    <div>
      <p>Area Name: </p>
      <form onSubmit={onSubmit}>
        <input type='text' name='name' id='areaName' required onChange={(event) => onChange(event, setName)}></input>
        <button type='submit'>Add Section</button>
      </form>
    </div>
  )
};

export default NewArea;
