import { createGlobalStyle } from 'styled-components'
import { CssNormalize } from './CssNormalize'
import { getTheme } from './theme'

const theme = getTheme()

const GlobalStyles = createGlobalStyle`

  ${CssNormalize}

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video,
  button {
    margin: 0;
    padding: 0;
    border: 0;
    border-collapse: collapse;
    vertical-align: baseline;
  }

  #root {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  html,
  body {
    height: 100%;
  }

  html {
    position: relative;
    overflow-x: hidden; // TODO: kind of a hack. Revisit this.
  }

  body {
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* HTML5 display-role reset for older browsers */
  
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section {
    display: block;
  }
  
  ol,
  ul {
    list-style: none;
  }
  
  blockquote,
  q {
    quotes: none;
  }
  
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }

  /* Don't kill focus outline for keyboard users: http://24ways.org/2009/dont-lose-your-focus */
  a:hover,
  a:active {
    outline: none;
  }

  a,
  a:hover,
  a:focus {
    color: inherit;
    cursor: pointer;
    text-decoration: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  input:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
  }

  button {
    background-color: white;
    cursor: pointer;
    border-radius: 0;
    font-family: inherit;
  }

  // Very drastic measure for hiding all intrusive lastpass icons in the form
  // fields. Find a more elegant, generic and selective solution for achieving the same thing.
  [data-lastpass-icon-root]{
    display: none;
  }

  // Standardizing focus outline styles -------------

  // Ref:
  // https://css-tricks.com/standardizing-focus-styles-with-css-custom-properties/
  // https://www.sarasoueidan.com/blog/focus-indicators/
  
  // Outline global variables.
  &:is(a, button, input, textarea, summary, select) {
    // We ensure outlines of at least 2px that grow proportionally to the size
    // of the wrapped element.
    --outline-size: max(2px, 0.08em);
    --outline-style: solid;
    // TODO: Use color from theme
    --outline-color: blue;
  }

  // Even though we don't want to display any outline when elements are focused 
  // by a mouse click event, we set these rules to make outline styling compatible
  // with older browsers, and for new browsers we disable it with the 
  // :focus:not(:focus-visible) selector used below in this file.
  &:is(a, button, input, textarea, summary, select):focus {
    outline: var(--outline-size) var(--outline-style) var(--outline-color);
    outline-offset: var(--outline-offset, var(--outline-size));
  }

  // Focus visible allow us to apply an outline only when an element is focused
  // via the keyboard tab key and not via a mouse click. 
  &:is(a, button, input, textarea, summary, select):focus-visible {
    outline: var(--outline-size) var(--outline-style) var(--outline-color);
    outline-offset: var(--outline-offset, var(--outline-size));
  }

  // Disables outline applies with above :focus selector, so outlines are only 
  // displayed when elements are accessed via Tab key.
  &:is(a, button, input, textarea, summary, select):focus:not(:focus-visible) {
    outline: none;
  }

  // Standardizing focus outline styles -------------
`

export { GlobalStyles }
