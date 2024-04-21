import discord
import response
#import ssl

'''try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:ss'''

async def send_message(message, user_message, is_private):
    try:
        responses = response.handle_response(user_message)
        await message.author.send(responses) if is_private else await message.channel.send(responses)
    except Exception as e:
        print(e)


def run_discord_bot(debug=False):
    intents = discord.Intents.default()
    TOKEN = "MTIzMTQ3NDg0MzMzNDIxMzc3Ng.GuBXUJ.W6Hci1oJe_DY08yyTvZuGXITqepM-VLGKnrd1Q"
    client = discord.Client(intents=intents, debug=debug)  # Pass debug parameter here

    @client.event
    async def on_ready():
        print(f"{client.user} is now running!")

    @client.event
    async def on_message(message):
        if message.author == client.user:
            return
        username = str(message.author)
        user_message = str(message.content)
        channel = str(message.channel)

        if user_message[0] == '?':
            user_message = user_message[1:]
            await send_message(message, user_message, is_private=True)
        else:
            await send_message(message, user_message, is_private=False)

    client.run(TOKEN)

run_discord_bot(debug=True)