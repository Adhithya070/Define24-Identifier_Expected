import  { GoogleGenerativeAI } from "https://cdn.jsdelivr.net/npm/@google/generative-ai/+esm"
var URL = "https://english.mathrubhumi.com/news/kerala/priyanka-gandhi-slams-pinarayi-vijayan-after-his-remarks-linking-dlf-and-robert-vadra-1.9498870"

chrome.action.onClicked.addListener(async (tab) => {
    console.log("WORKS2");

    const genAI = new GoogleGenerativeAI("[API_KEY]");

    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

      const prompt = `Determine if the content of the website provided is factually accurate or not. Other articles from Google News Search on the same topic. If no source is found then give Supporting Source value as NULL. Provide the data understood from the website according to the JSON format. URL: ${URL} JSON Format:Title: [title of the news] Reliability: [percantage of credibility from 0% to 100%] Status: [False, True or Uncertain] Description: [Include an explaination] Supporting Sources: [provide urls to 2 sources]`

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(text);
});

