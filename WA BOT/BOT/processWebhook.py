import os

import flask
from flask import send_from_directory, request

app = flask.Flask(__name__)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/favicon.png')


from helperfunction.waSendMessage import sendMessage

@app.route('/whatsapp', methods=['GET', 'POST'])
def whatsapp():

    message = request.form['Body']
    senderId = request.form['From'].split('+')[1]
    print(f'{message}')
    res=f'{message}'

    import google.generativeai as genai
    def handle_response(res) -> str:
        p_message = res.lower()

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

        convo.send_message(
            f"Title:[Shortened title of the news]Reliability:[Estimated credibility percentage](<= 40 words)={p_message}")
        print(convo.last.text)


        print(message.sid)
    return '200'
    recieve()
if __name__ == "__main__":
    app.run(port=5000, debug=True)