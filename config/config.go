package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	NGROK   ngrokConfig
	Service serviceConfig
}

type ngrokConfig struct {
	AuthToken     string
	RemoteAddress string
}

type serviceConfig struct {
	Port string
}

func GetConfig() Config {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error reading .env files, continuing without dotenv")
	} else {
		fmt.Println("ENV Loaded from .env")
	}

	return Config{
		NGROK: ngrokConfig{
			AuthToken:     os.Getenv("NGROK_AUTHTOKEN"),
			RemoteAddress: os.Getenv("REMOTE_ADDR"),
		},
		Service: serviceConfig{
			Port: os.Getenv("PORT"),
		},
	}

}
