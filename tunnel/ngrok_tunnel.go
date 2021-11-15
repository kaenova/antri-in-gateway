package tunnel

import (
	"fmt"
	"os/exec"
)

func Init() {

	go runPythonNGROKWraper()

}

func runPythonNGROKWraper() {
	output, err := exec.Command("/bin/sh", "./run_tunnel.sh").Output()
	if err != nil {
		fmt.Println(err.Error())
	}
	fmt.Println(output)
}
