from pyngrok import ngrok
import os
ngrok.set_auth_token(os.getenv("NGROK_AUTH"))
ngrok_tunnel = ngrok.connect(os.getenv("PORT"))
  
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return ngrok_tunnel.public_url