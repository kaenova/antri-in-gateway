from pyngrok import ngrok
import os
ngrok.set_auth_token(os.getenv("NGROK_AUTH"))
ngrok_tunnel = ngrok.connect(80)
os.system('nginx')
print("nginx has been commanded!")
  
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return ngrok_tunnel.public_url