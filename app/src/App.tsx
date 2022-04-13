import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [text, setText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input id="salutbg" type="text" value={text} onChange={handleChange} />
        <br></br>
        <br></br>
        <text id="inputvaluetext">{ text }</text>
        <br></br>
        <br></br>
      </header>
    </div>
  );
}

export default App;
