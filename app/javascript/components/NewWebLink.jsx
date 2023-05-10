import React, { useState, useEffect } from "react";

const NewWebLink = ({area_id, hidden}) => {
  const [name, setName] = useState("");
  const [webUrl, setWebUrl] = useState(""); 
  const [displayForm, setDisplayForm] = useState(false);
  /* Whenever hidden is toggled (edit mode), close up the new link form  */
  useEffect(() => {
    setDisplayForm(false);
  }, [hidden])
  /* Reset the input fields to blank */
  const toggleNameUrl = () => {
    setName('');
    setWebUrl('');
  }
  /* For condtionally rendering the new web link form  */
  const toggleDisplay = () => {
    if (displayForm) {
      return setDisplayForm(false);
    }
    setDisplayForm(true);
  }

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };
  /* When the new web link form is submitted, this asynchronous function is called, 
     POSTing the data to the create web link route in rails  */
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
