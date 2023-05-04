import React, { useState } from "react";

const NewWebLink = ({area_id}) => {
  const [name, setName] = useState("");
  const [webUrl, setWebUrl] = useState("");
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

    if (name.length == 0 || webUrl.length == 0) {
      return;
    }
    const body = {
      name,
      web_url: webUrl,
      area_id
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    await fetch('/web_links', {
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
      <p>Add Link Information: </p>
      <form onSubmit={onSubmit}>
        <input type='text' name='name' id='webLinkName' required onChange={(event) => onChange(event, setName)}></input>
        <input type='text' name='web_url' id='web_url' required onChange={(event) => onChange(event, setWebUrl)}></input>
        <button type='submit'>Add Link</button>
      </form>
    </div>
  )
};

export default NewWebLink;
