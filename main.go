package main

import (
	"antri-in-gateway/config"
	reverseproxy "antri-in-gateway/reverse_proxy"
	"antri-in-gateway/tunnel"
	"fmt"
)

func main() {
	conf := config.GetConfig()

	e := reverseproxy.Init()
	tunnel.Init()

	e.Logger.Fatal(e.Start(fmt.Sprintf(":%s", conf.Service.Port)))

}
