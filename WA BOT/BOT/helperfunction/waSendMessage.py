import os

from twilio.rest import Client

from dotenv import load_dotenv
load_dotenv()
accssd = os.environ.get("ACCOUNT_SID")
authtok = os.environ.get("AUTH_TOKEN")
frm = os.environ.get("FROM")
sendeR = os.environ.get("sendeR")
client = Client(accssd, authtok)

def sendMessage(senderId, message):

    res = client.messages.create(
        body=message,
        from_=frm,
        to=f'whatsapp:+{senderId}'
    )
    return res
def recieve(senderId, message):
    client = Client(accssd, authtok)
    message = client.messages.create(
        from_=frm,
        body="message recieved",
        to=sendeR
    )
