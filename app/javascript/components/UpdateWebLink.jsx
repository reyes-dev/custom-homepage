import React, { useState, useEffect } from "react";

const UpdateWebLink = ({id}) => {
  const [name, setName] = useState("");
  const [webUrl, setWebUrl] = useState("");
  
  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const route = `/web_links/${id}`;

    if (name.length == 0 || webUrl.length == 0) {
      return;
    }
    const body = {
      name,
      web_url: webUrl
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(route, {
      method: 'PUT',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type='text' name='name' id='webLinkName' required onChange={(event) => onChange(event, setName)}></input>
        <input type='text' name='web_url' id='web_url' required onChange={(event) => onChange(event, setWebUrl)}></input>
        <button type='submit'>Update Link</button>
      </form>
    </div>
  )
}

export default UpdateWebLink;