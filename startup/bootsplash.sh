#!/bin/bash
### BEGIN INIT INFO
# Provides:          bootsplash
# Required-Start:    mountall
# Required-Stop:     
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Show splash screen at boot time
# Description:       
### END INIT INFO

# Mirror π
# 
# Copyright (c) 2014 Istvan Szantai <szantaii at sidenote dot hu>
# Released under the MIT License (LICENSE).

splash_image_path="/home/pi/mirror-pi/startup/bootsplash.png"

do_start()
{
	/usr/bin/fbi -T 1 --autodown -noverbose "${splash_image_path}"
	exit 0
}

case "$1" in
	start)
		do_start
		;;
	*)
		;;
esac

:
