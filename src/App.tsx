/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import Logo from "./Logo";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Some title</h1>
        <input type="text" placeholder="site" />
        <button>Add input</button>
        <button>Reset list</button>
        <ul></ul>
    </div>
  );
}

export default App;
