#!/usr/bin/env python

# Mirror π
# 
# Copyright (c) 2014 Istvan Szantai <szantaii at sidenote dot hu>
# Released under the MIT License (LICENSE).

import gtk
import webkit
import os
import sys

class AppWrapper:
	
	fullscreen = False
	
	def __init__(self, title, app_url):
		self.title = title
		self.app_url = app_url
		
		self.create_window()
	
	def create_window(self):
		self.window = gtk.Window()
		self.window.set_title(self.title)
		
		self.window.connect("destroy", lambda w:gtk.main_quit())
		self.window.connect("realize", self.on_realize)
		self.window.connect("key_press_event", self.on_key_press_event)
		
		self.vbox = gtk.VBox()
		self.window.add(self.vbox)
		
		self.scrolled_window = gtk.ScrolledWindow()
		self.vbox.pack_start(self.scrolled_window)
		
		self.webview = webkit.WebView()
		self.scrolled_window.add(self.webview)
		
		self.webview.open(self.app_url)
	
	def toggle_fullscreen(self):
		if not self.fullscreen:
			self.window.fullscreen()
			self.fullscreen = True
		else:
			self.window.unfullscreen()
			self.fullscreen = False
	
	def reload_webview(self):
		self.webview.reload_bypass_cache()
	
	def hide_cursor(self, widget):
		pixmap = gtk.gdk.Pixmap(None, 1, 1, 1)
		color = gtk.gdk.Color()
		cursor = gtk.gdk.Cursor(pixmap, pixmap, color, color, 0, 0)
		widget.window.set_cursor(cursor)
	
	def on_key_press_event(self, widget, event):
		key = gtk.gdk.keyval_name(event.keyval)
		if (event.state & gtk.gdk.CONTROL_MASK and \
			( key == "r" or key == "R" or key == "F5")) or \
			key == "F5":
			
			self.reload_webview()
			
		elif key == "F11":
			self.toggle_fullscreen()
	
	def on_realize(self, widget):
		self.hide_cursor(widget)
	
	def show(self):
		self.toggle_fullscreen()
		self.window.show_all()
		gtk.main()

if __name__ == "__main__":
	if len(sys.argv) < 3:
		print "You must specify a title and a path of your webapp."
		print "e.g. ./" + os.path.basename(__file__) + "\"Mirror Pi\" /path/to/app.html"
		sys.exit(1)
		
	title = sys.argv[1]
	app_url = os.path.abspath(sys.argv[2])
	
	if not os.access(app_url, os.R_OK):
		print "Specified webapp path doesn't exist or not accessible."
		sys.exit(2)
	
	app_wrapper = AppWrapper(title, app_url)
	app_wrapper.show()
