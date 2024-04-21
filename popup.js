// Listen for clicks on the "Read Website Text" button
document.getElementById('readButton').addEventListener('click', () => {
        document.getElementById('descriptionBox').innerText = "LOADING";
     document.getElementById('reliabilityPercentage').innerText="LOADING";
document.getElementById('statusText').innerText= "LOADING";
        document.getElementById('Status').innerHTML= '<i class="fa-solid fa-circle-question"></i>';

    //document.getElementById('StatusIcon').innerHTML= '<i class="fa-solid fa-circle-question"></i>';
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
        const jsonObject =  JSON.parse(response);
        const finalText = jsonObject.Description;
        const status = jsonObject.Status;
        document.getElementById('reliabilityPercentage').innerText = jsonObject.Reliability;
        document.getElementById('statusText').innerText = status;
        if(status === "True") {
            document.getElementById('Status').innerHTML = '<i class="fa-solid fa-square-check"></i>';
        }
        else if(status === "Uncertain") {
            document.getElementById('Status').innerHTML = '<i class="fa-solid fa-circle-question"></i>';
        }
  document.getElementById('descriptionBox').innerText = finalText;
    }
});
