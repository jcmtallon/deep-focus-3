# Terminology
|Tech|UI|
|--|--|
|blockedSite|Asteroid|
|control deck|settings|
|cluster|category|

# Working with Chrome Extensions

## Debugging offsite pages in Chrome
- chrome://inspect/#other

## Inspecting chrome extension's local storage values.
- Go to chrome://extensions/
- Open background page inspector. 
- Local storage won't show in the Application tab. Use instead a command like the following one in the Chrome console.

## Working with Background scripts
- In Chrome extensions, reload extension so changes in background are applied. Not necessary for changes in the client sides. 

```js
chrome.storage.local.get(function(result){console.log(result)})
```
