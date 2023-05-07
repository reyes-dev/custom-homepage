import React, { useState } from "react";

const UpdateWebLink = ({ id, area_id, toggleDisplay, linkName, url, hidden }) => {
  const [name, setName] = useState(linkName);
  const [webUrl, setWebUrl] = useState(url);
  
  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const route = `/areas/${area_id}/web_links/${id}`;

    if (name.length == 0 || webUrl.length == 0) {
      return;
    }
    const body = {
      name,
      web_url: webUrl,
      area_id,
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
        toggleDisplay();
        return response.json();
      }
      throw new Error('Network response was not ok.');
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit} className={hidden}>
        <label htmlFor="name">Name: </label>
        <input type='text' name='name' id='webLinkName' required onChange={(event) => onChange(event, setName)} value={name}></input>
        <label htmlFor="url"> URL: </label>
        <input type='text' name='web_url' id='web_url' required onChange={(event) => onChange(event, setWebUrl)} value={webUrl}></input>
        <button type='submit'> {`[=>]`}</button>
      </form>
    </div>
  )
}

export default UpdateWebLink;