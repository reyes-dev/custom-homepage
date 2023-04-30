import React, { useState } from "react";
import WebLinks from "./WebLinks";

function App() {
  const [count, setCount] = useState(0)
  return (<div>
    <h1>Homepage</h1>
    <WebLinks />
  </div>);
}

export default App;