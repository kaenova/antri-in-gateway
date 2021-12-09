// Global Var
var urlNGROK = null
var usingNGROK = false;
var berhasilInitNGROK = false;
var urlCustomDomain = null
var machineIP = null

function InitServer() {
  const express = require('express')
  const app = express()
  const port = 1325
  const { exec } = require("child_process");

  app.get('/', (req, res) => {
    res.send({ ngrok: urlNGROK, Domain: urlCustomDomain, MachineIP: machineIP })
  })

  app.listen(port, () => {
    console.log(`Server QR berjalan pada http://localhost:${port}`)
  })

  // Jalankan nginx
  exec("nginx", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
    }
    if (error || stderr) {
      process.exit();
    }
    console.log(`stdout: ${stdout}`);
  });
}

// Custom Domain
if ((process.env["CUSTOM_DOMAIN"] != undefined) && (process.env["CUSTOM_DOMAIN"] != "")) {
  urlCustomDomain = process.env["CUSTOM_DOMAIN"]
  console.log("Info: Menggunakan Custom Domain dengan alamat", urlCustomDomain)
}

// Machine IP
if ((process.env["MACHINE_IP_ADDRESS"] != undefined) && (process.env["MACHINE_IP_ADDRESS"] != "")) {
  machineIP = process.env["MACHINE_IP_ADDRESS"]
  console.log("Info: Menggunakan IP mesin dengan alamat", machineIP)
}

// NGROK
if ((process.env["NGROK_AUTH"] != undefined) || (process.env["NGROK_AUTH"] != "")) {
  usingNGROK = true
  const ngrok = require('ngrok');
  (async function () {
    var i = 0
    while (!berhasilInitNGROK) {
      console.log(process.env["NGROK_AUTH"])
      console.log("Attempting connect to ngrok:", i)
      i = i + 1;
      const url = await ngrok.connect({
        authtoken: process.env["NGROK_AUTH"],
        addr: "http://127.0.0.1:3000"
      })
      if (typeof (url) == 'string') {
        urlNGROK = url
        berhasilInitNGROK = true
      } else {
        berhas = false
      }
    }
    console.log("Info: Berhasil menggunakan ngrok")
    console.log("Info: dapat diakses melalui", urlNGROK)
    InitServer()
  })();
} else {
  console.log("Warning: Tidak menggunakan ngrok. Jika sistem ini dapat diakses dengan internet, masukkan domain atau ip_machine yang dapat terhubung dengan internet")

  if (urlNGROK == null && urlCustomDomain == null && machineIP == null){
    console.log("Warning: Masukkan NGROK, Domain, dan MachineIP tidak ada. Sistem tidak dapat diakses melalui QR Code.")
  }

  InitServer()
}