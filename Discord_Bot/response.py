import google.generativeai as genai

def handle_response(message) ->str :
    p_message = message.lower()

    genai.configure(api_key="AIzaSyDZ_N6VRLam-WtgidcyssOG0_NzAONS66Q")

    # Set up the model
    generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 0,
    "max_output_tokens": 8192,
    }

    safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    ]

    model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                                generation_config=generation_config,
                                safety_settings=safety_settings)

    convo = model.start_chat(history=[])

    convo.send_message(f"Check whether the content provided below is misinformation or not. Give the output in this Format without addtional formatting. FORMAT - (Title: [title of the news] Reliability: [percantage of credibility from 0% to 100%] Status: [False, True or Uncertain] Description: [Include an explaination]) CONTENT ={p_message}")
    return convo.last.text
    