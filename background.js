console.log("background.js started");
import { GoogleGenerativeAI } from "https://cdn.jsdelivr.net/npm/@google/generative-ai/+esm";

chrome.runtime.onMessage.addListener(
    async(message, sender, sendResponse) => {
        console.log("background.js if reached");
        if (message.text) { // Changed from message.websiteText to message.text
            console.log("Website text received in background.js:", message.text);
            console.log("WORKS2");
            const genAI = new GoogleGenerativeAI("AIzaSyDZ_N6VRLam-WtgidcyssOG0_NzAONS66Q");
            const model = genAI.getGenerativeModel({ model: "gemini-pro"});
            const prompt = `const prompt = Check whether the content provided below is misinformation or not. Give the output in a JSON Format without addtional formatting. JSON FORMAT - (Title: [title of the news] Reliability: [percantage of credibility from 0% to 100%] Status: [False, True or Uncertain] Description: [Include an explaination]) CONTENT -(${message.text})`;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text(); // Await the Promise
            console.log("STUFF: \n");
            console.log(text);
            /*const jsonObject =  JSON.parse(text);
            const finalText = jsonObject.Description;
            console.log("IMP!!:\n"+finalText);*/

            
            /*chrome.tabs.query({active: true, currentWindow: true}, 
                tabs =>  
                    chrome.tabs.sendMessage(tabs[0].id,{msg: finalText})

            );*/
                chrome.runtime.sendMessage({msg: text});
            
        }
    }
);


