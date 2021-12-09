// Global Var
var urlNGROK = ""

if (process.env["NGROK_AUTH"] != undefined){
  const ngrok = require('ngrok');
  (async function () {
    var berhasil = false;
    var i = 0
    while (!berhasil) {
      console.log(process.env["NGROK_AUTH"])
      console.log("Attempting connect to ngrok:",i)
      i = i + 1;
      const url = await ngrok.connect({
        authtoken: process.env["NGROK_AUTH"],
        addr: "http://127.0.0.1:3000"
      })
      if (typeof (url) == 'string') {
        urlNGROK = url
        berhasil = true
      } else {
        berhasil = false
      }
    }
    console.log("Info: Berhasil menggunakan ngrok")
    console.log("Info: dapat diakses melalui", urlNGROK)
  })();
} else {
  console.log("Warning: Tidak menggunakan ngrok. Jika sistem ini dapat diakses dengan internet, masukkan domain atau ip_machine yang dapat terhubung dengan internet")
}
