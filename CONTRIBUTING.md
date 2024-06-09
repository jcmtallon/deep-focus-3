### Debugging offsite pages
- chrome://inspect/#other

### Inspecting chrome extension's local storage values.
- Go to chrome://extensions/
- Open background page inspector. 
- In the console, write `chrome.storage.local.get(function(result){console.log(result)})`
