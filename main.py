from pyngrok import ngrok
import os

domain = {}

if os.getenv("NGROK_AUTH") != "":
    print("using ngrok for entry")
    ngrok.set_auth_token(os.getenv("NGROK_AUTH"))
    ngrok_tunnel = ngrok.connect(80)
    domain["ngrok"] = ngrok_tunnel.public_url
    
if os.getenv("CUSTOM_DOMAIN") != "":
    print("using custom domain for entry")
    domain["domain_address"] = os.getenv("CUSTOM_DOMAIN")
    
if os.getenv("MACHINE_IP_ADDRESS") != "":
    print("using machine ip for entry")
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