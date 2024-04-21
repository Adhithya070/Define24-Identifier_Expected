// Listen for clicks on the "Read Website Text" button
document.getElementById('readButton').addEventListener('click', () => {
                document.querySelector('body').classList.add('body');;
        document.getElementById('descriptionBox').innerText = "LOADING";
     document.getElementById('reliabilityPercentage').innerText="LOADING";
document.getElementById('statusText').innerText= "LOADING";
        document.getElementById('Status').innerHTML= '<i class="fa-solid fa-circle-question"></i>';

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
    if(resp) {
        console.log("RESPPP");
    run(resp);
    }
});

async function run(resp) {
    const response = await resp.msg;
    if(response) {
        try {
        const jsonObject =  JSON.parse(response);

        const finalText = jsonObject.Description;
        const status = jsonObject.Status;
        document.getElementById('reliabilityPercentage').innerText = jsonObject.Reliability;
        document.getElementById('statusText').innerText = status;
        if(status === "Probably True") {
            document.getElementById('Status').innerHTML = '<i class="fa-solid fa-square-check"></i>';
            document.documentElement.style.setProperty('--bg-color', '#0eb87b'); // Green background
            document.documentElement.style.setProperty('--secondary-color', '#0cffa1'); // Black text color
        }
        else if(status === "Probably False") {
            document.getElementById('Status').innerHTML = '<i class="fa-solid fa-square-xmark"></i>';
            document.documentElement.style.setProperty('--bg-color', '#ff611e'); // Red background
            document.documentElement.style.setProperty('--secondary-color', '#cc4d18'); // Black text color
        }
	else {
		document.getElementById('Status').innerHTML = '<i class="fa-solid fa-circle-question"></i>';

    }
        document.getElementById('descriptionBox').innerText = finalText;
    } catch(err) {
            console.log(err);
document.getElementById('descriptionBox').innerText = "Error in json please retry.";


        }
}

}
