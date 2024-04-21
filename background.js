console.log("background.js started");
import { GoogleGenerativeAI } from "https://cdn.jsdelivr.net/npm/@google/generative-ai/+esm"; //Import-map to access gemini api

chrome.runtime.onMessage.addListener( 
    async(message, sender, sendResponse) => {
        console.log("background.js if reached");
        if (message.text) { //
            console.log("Website text received in background.js:", message.text);
            const genAI = new GoogleGenerativeAI("[API KEY HERE]"); //use gemini api key here available at: https://aistudio.google.com/app/apikey
            const model = genAI.getGenerativeModel({ model: "gemini-pro"});
            const prompt = `const prompt = Ascertain whether the content provided below is factually incorrect or misinformation or probably reliable information. Give the output as a JSON file text without addtional formatting. JSON FORMAT - (Title: [title of the news] Reliability: [percentage of credibility ranging from 0% to 100%] Status: [Probably False,Probably True or Uncertain] Description: [an explaination for giving the status]) CONTENT -(${message.text})`;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text(); //gemini gives output in json format
            console.log(text);
            chrome.runtime.sendMessage({msg: text});
        }
    }
);


