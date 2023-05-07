import React, { useState, useEffect } from "react";

const NewWebLink = ({area_id, hidden}) => {
  const [name, setName] = useState("");
  const [displayForm, setDisplayForm] = useState(false);
  const [webUrl, setWebUrl] = useState("");

  useEffect(() => {
    setDisplayForm(false);
  }, [hidden])

  const toggleNameUrl = () => {
    setName('');
    setWebUrl('');
  }

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

    if (name.length == 0 || webUrl.length == 0) {
      return;
    }
    const body = {
      name,
      web_url: webUrl,
      area_id
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    await fetch(`/areas/${area_id}/web_links`, {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.ok) {
        toggleNameUrl();
        return response.json();
      }
      throw new Error('Network response was not ok.');
    }).catch((error) => { console.log(error.message); });
  };

  return (
    <div className={hidden}>
      <button onClick={toggleDisplay}>[ + Link ]</button>
      {displayForm ? (<form onSubmit={onSubmit}>
          <label htmlFor="name">Name:</label>
        <input type='text' name='name' id='webLinkName' required value={name} onChange={(event) => onChange(event, setName)}></input>
          <label htmlFor="url">URL:</label>
        <input type='text' name='web_url' id='web_url' required value={webUrl}  onChange={(event) => onChange(event, setWebUrl)}></input>
        <button type='submit'>Add Link</button>
        </form>) : null  }
    </div>
  )
};

export default NewWebLink;
