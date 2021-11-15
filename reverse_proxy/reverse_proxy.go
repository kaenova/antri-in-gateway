package reverseproxy

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httputil"
	"net/url"
	"strings"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func Init() *echo.Echo {
	e := echo.New()
	e.Use(middleware.Recover())
	e.Use(middleware.Logger())

	// create the reverse proxy
	url, _ := url.Parse("http://localhost:1323/")
	proxy := httputil.NewSingleHostReverseProxy(url)

	reverseProxyRoutePrefix := "/api"
	routerGroup := e.Group(reverseProxyRoutePrefix)
	routerGroup.Use(func(handlerFunc echo.HandlerFunc) echo.HandlerFunc {
		return func(context echo.Context) error {

			req := context.Request()
			res := context.Response().Writer

			// Update the headers to allow for SSL redirection
			req.Host = url.Host
			req.URL.Host = url.Host
			req.URL.Scheme = url.Scheme

			//trim reverseProxyRoutePrefix
			path := req.URL.Path
			req.URL.Path = strings.TrimPrefix(path, reverseProxyRoutePrefix)

			// ServeHttp is non blocking and uses a go routine under the hood
			proxy.ServeHTTP(res, req)
			return nil
		}
	})

	e.GET("/ngrok", ngrokHandler)

	return e
}

func ngrokHandler(c echo.Context) error {
	var client = &http.Client{}
	request, err := http.NewRequest("GET", "http://localhost:1325", nil)
	if err != nil {
		panic(err.Error())
	}
	fmt.Println("Requesting")
	resp, err := client.Do(request)
	if err != nil {
		panic(err.Error())
	}
	defer resp.Body.Close()
	if resp.StatusCode == http.StatusOK {
		bodyBytes, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			fmt.Println(err)
		}
		bodyString := string(bodyBytes)
		fmt.Println(bodyString)
		return c.String(http.StatusOK, bodyString)
	}
	return c.String(http.StatusInternalServerError, "NGROK Not Initialize")
}
