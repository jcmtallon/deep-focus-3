/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import { Logo } from '../../components'
import "./App.css";
import styled from 'styled-components'


const Title = styled.h1`
  color: blue;
`

function App() {
  return (
    <div className="App">
      <Title>Deep Focus</Title>
        <Logo />
        <input type="text" placeholder="site" />
        <button>Add URL</button>
        <button>Reset list</button>
        <ul></ul>
    </div>
  );
}

export default App;
