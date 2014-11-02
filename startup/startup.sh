#!/bin/bash

# Common variables
base_path="$(dirname $0)"
base_path="$(dirname ${base_path})"

# Network specific variables
network_interface="wlan0"
connection_sleep_timeout=5
reconnect_sleep_timeout=60

# Webapp specific variables
browser_path="${base_path}/webapp/webapp.py"
webapp_path="${base_path}/webapp/mirror-pi.html"
webapp_title="Mirror Pi"

# PIR sensor specific variables
sensor_path="${base_path}/sensor/pir_monitor.py"


reconnect_on_connection_lost()
{
	sleep 120
	
	while true
	do
		if ifconfig "$1" | grep -q "inet addr"
		then
			sleep "$2"
		else
			sudo ifup --force "$1"
			sleep "$3"
		fi
	done
}


wait_for_ip()
{
	while ! ifconfig "$1" | grep -q "inet addr"
	do
		sleep "$2"
	done
}

get_network_time()
{
	# Stop the ntp service
	sudo service ntp stop
	
	# Get currect time
	sudo ntpd -gq
	
	# Start the ntp service
	sudo service ntp start
}

start_sensor()
{
	sudo python "$1" > /dev/null 2>&1
}

start_webapp()
{
	python "$1" "$2" "$3" > /dev/null 2>&1
}

reconnect_on_connection_lost "${network_interface}" \
	"${reconnect_sleep_timeout}" "${connection_sleep_timeout}" &

wait_for_ip "${network_interface}" "${connection_sleep_timeout}"

get_network_time

#start_sensor "${sensor_path}" &

start_webapp "${browser_path}" "${webapp_title}" "${webapp_path}" &
