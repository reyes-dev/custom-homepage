import React from "react";
import WebLinks from "./WebLinks";
import NewWebLink from "./NewWebLink";

function App() {
  return (<div className='bg-sky-100 flex flex-column h-screen w-screen justify-center items-center'>
    <h1 className="font-daruma text-3xl">ホームページ</h1>
    <WebLinks />
    <NewWebLink />
  </div>);
}

export default App;