import React, { useState } from "react";
import WebLinks from "./WebLinks";
import NewWebLink from "./NewWebLink";

function App() {
  const [count, setCount] = useState(0)
  return (<div>
    <h1>Homepage</h1>
    <WebLinks />
    <NewWebLink />
  </div>);
}

export default App;