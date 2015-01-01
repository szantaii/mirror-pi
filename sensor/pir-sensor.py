#!/usr/bin/env python

# Mirror π
# 
# Copyright (c) 2014 Istvan Szantai <szantaii at sidenote dot hu>
# Released under the MIT License (LICENSE).

import Queue
from threading import Thread
import RPi.GPIO as gpio
import time
import os
import sys

class PIRSensor:
	
	# PIR sensor's states
	current_state = 0
	previous_state = 0
	
	def __init__(self, pir_pin, timeout):
		# PIR GPIO pin
		self.pir_pin = pir_pin
		# Timeout between motion detections
		self.timeout = timeout
	
	def setup(self):
		gpio.setmode(gpio.BCM)
		gpio.setup(self.pir_pin, gpio.IN)
		# Wait for the PIR sensor to settle
		# (loop until PIR output is 0)
		while gpio.input(self.pir_pin) == 1:
			self.current_state = 0
	
	def report_motion(self, queue):
		try:
			self.setup()
			
			while True:
				self.current_state = gpio.input(self.pir_pin)
				
				if self.current_state == 1 and self.previous_state == 0:
					# PIR sensor is triggered
					queue.put(True)
					# Record previous state
					self.previous_state = 1
				elif self.current_state == 1 and self.previous_state == 1:
					# Feed the queue since there is still motion
					queue.put(True)
				elif self.current_state == 0 and self.previous_state == 1:
					# PIR sensor has returned to ready state
					self.previous_state = 0
				
				time.sleep(self.timeout)
		except KeyboardInterrupt:
			raise

class DisplayControl:
	
	# Display's status
	display_on = True
	
	def __init__(self, timeout):
		self.timeout = timeout
	
	def turn_off(self):
		# Turn off the display
		if self.display_on:
			os.system("/opt/vc/bin/tvservice -o > /dev/null 2>&1")
			self.display_on = False
	
	def turn_on(self):
		# Turn on the display
		if not self.display_on:
			#os.system("{ /opt/vc/bin/tvservice -p && chvt 9 && chvt 7 ; } > /dev/null 2>&1")
			os.system("/opt/vc/bin/tvservice -p > /dev/null 2>&1")
			self.display_on = True
	
	def read_queue(self, queue):
		try:
			while True:
				try:
					motion = queue.get(True, self.timeout)
					
					if motion:
						self.turn_on()
				except Queue.Empty:
						self.turn_off()
		except KeyboardInterrupt:
			raise

if __name__ == "__main__":
	try:
		pir_sensor = PIRSensor(7, 0.25)
		display_control = DisplayControl(300)
		queue = Queue.Queue()
		
		producer = Thread(target=pir_sensor.report_motion, args=(queue,))
		consumer = Thread(target=display_control.read_queue, args=(queue,))
		
		producer.daemon = True
		consumer.daemon = True
		
		producer.start()
		consumer.start()
		
		while True:
			time.sleep(0.1)
	except KeyboardInterrupt:
		display_control.turn_on()
		# Reset GPIO settings
		gpio.cleanup()
		sys.exit(0)
