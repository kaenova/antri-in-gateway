from pyngrok import ngrok
import os

domain = {}

if os.getenv("NGROK_AUTH") != "":
    ngrok.set_auth_token(os.getenv("NGROK_AUTH"))
    ngrok_tunnel = ngrok.connect(80)
    domain["ngrok"] = os.getenv("NGROK_AUTH")
    
if os.getenv("CUSTOM_DOMAIN") != "":
    domain["domain_address"] = os.getenv("CUSTOM_DOMAIN")
    
if os.getenv("MACHINE_IP_ADDRESS") != "":
    domain["ip_machine"] = os.getenv("MACHINE_IP_ADDRESS")
    
if len(domain) == 0:
    domain = "null"

os.system('nginx')
print("nginx has been commanded!")
  
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return domain