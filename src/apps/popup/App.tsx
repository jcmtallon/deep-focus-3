/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import { Logo } from '../../components'
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>DEEP FOCUS</h1>
        <Logo />
        <input type="text" placeholder="site" />
        <button>Add URL</button>
        <button>Reset list</button>
        <ul></ul>
    </div>
  );
}

export default App;
