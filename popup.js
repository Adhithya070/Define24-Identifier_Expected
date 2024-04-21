// Listen for clicks on the "Read Website Text" button
document.getElementById('readButton').addEventListener('click', () => {
        document.getElementById('descriptionBox').innerText = "LOADING";
  // Get the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    // Execute a script in the active tab to read the contents of the body
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: () => {
        // Read the contents of the body and store it in a variable
        const websiteText = document.body.innerText;
        // Send a message to the popup with the website text
        chrome.runtime.sendMessage({ text: websiteText });
        console.log(websiteText);
        console.log("popup.js finished");
      }
    });
  });
});

chrome.runtime.onMessage.addListener(async (resp) => {
    //console.log(resp.msg);
    const response = await resp.msg;
    if(response) {
  document.getElementById('descriptionBox').innerText = response;
    }
});
