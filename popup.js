document.getElementById('readButton').addEventListener('click', () => { //button listener and update
	document.querySelector('body').classList.add('body');;
	document.getElementById('reliabilityPercentage').innerText="loading..";
	document.getElementById('statusText').innerText= "loading...";
	document.getElementById('descriptionBox').innerText = "description will be generated soon...";
	document.getElementById('Status').innerHTML= '<i class="fa-solid fa-circle-question"></i>';

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
	chrome.scripting.executeScript({
	  target: { tabId: tabs[0].id },
	  function: () => {
		const websiteText = document.body.innerText;
		chrome.runtime.sendMessage({ text: websiteText }); //message sent to background.js
		console.log(websiteText);
		console.log("popup.js finished");
	  }
	});
  });
});

chrome.runtime.onMessage.addListener(async (resp) => { //recieves json from background.js
	if(resp) {
		run(resp);
	}
});

async function run(resp) {
	const response = await resp.msg; 
	if(response) {
		try { //there may be errors in json file return by gemini
			const jsonObject =  JSON.parse(response);
			const finalText = jsonObject.Description;
			const status = jsonObject.Status;
			document.getElementById('reliabilityPercentage').innerText = jsonObject.Reliability;
			document.getElementById('statusText').innerText = status;
			if(status === "Probably True") {
				document.getElementById('Status').innerHTML = '<i class="fa-solid fa-square-check"></i>';
				document.documentElement.style.setProperty('--bg-color', '#0eb87b');
				document.documentElement.style.setProperty('--secondary-color', '#0cffa1');
			}
			else if(status === "Probably False") {
				document.getElementById('Status').innerHTML = '<i class="fa-solid fa-square-xmark"></i>';
				document.documentElement.style.setProperty('--bg-color', '#ff611e');
				document.documentElement.style.setProperty('--secondary-color', '#cc4d18');
			}
			else {
				document.getElementById('Status').innerHTML = '<i class="fa-solid fa-circle-question"></i>';
			}
			document.getElementById('descriptionBox').innerText = finalText;
	} catch(err) {
			console.log(err);
	document.getElementById('descriptionBox').innerText = "Error in json please retry.";
}}}
