# Mirror π

***

## Contents

* [About](#about)
  * [News](#news)
* [License](#license)
* [Prerequisites](#prerequisites)
  * [Optional prerequisites](#optional-prerequisites)
    * [Hardware setup](#hardware-setup)
* [Acquire Mirror π](acquire-mirror-%CF%80)
* [Boot setup](#boot-setup)
  * [Kernel options](#kernel-options)
  * [Raspberry Pi configuration](#raspberry-pi-configuration)
  * [Splash screen](#splash-screen)
  * [Desktop configuration](#desktop-configuration)
* [Mirror π setup](#mirror-%CF%80-setup)

***

## About

Mirror π is a smart mirror built using a Raspberry Pi, inspired by [Michael Teeuw's Magic Mirror](http://michaelteeuw.nl/tagged/magicmirror).

`TODO` write longer description

### News

News about the Mirror π project will be posted on [sidenote.hu](http://sidenote.hu/) under the tag Mirror π.

`TODO` add precise link

## License

This project, unless noted otherwise, is licensed under the MIT License. For the full license, see [`LICENSE`](LICENSE). Copyright © 2014 Istvan Szantai \<szantaii at sidenote dot hu\>.

jQuery JavaScript Library v2.1.1 Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors, released under the [MIT license](http://jquery.org/license).

[Weather icons](webapp/img) used in this project are adapted work of [Dmitry Baranovskiy](http://thenounproject.com/DmitryBaranovskiy/) from [The Noun Project](http://thenounproject.com/) licensed under the Creative Commons [Attribution 3.0 Unported (CC BY 3.0)](http://creativecommons.org/licenses/by/3.0/) license.

## Prerequisites

Mirror π is built using a Raspberry Model B+, but the following instructions also apply to the Raspberry Pi Model B rev1 and the Raspberry Pi Model B rev2.

The following operating system and configuration is required:

* [Raspbian](http://www.raspbian.org/) updated to the latest version with configured active internet access.
    
    You can achieve this by running an update, and upgrade and a firmware update.
    
    ```
    sudo apt-get update && sudo apt-get dist-upgrade -y && sudo rpi-update
    ```
    
    _Note that after a firmware update the Raspberry Pi needs to rebooted so the changes take in effect._

* Boot to desktop enabled.
    
    Run `sudo raspi-config` from the command line, and select _Enable Boot to Desktop/Scratch_ → _Desktop Log in as user 'pi' at the graphical desktop_.

* Correct timezone set.
    
    Run `sudo raspi-config` from the command line, and select _Internationalisation Options_ → _Change Timezone_, and select your timezone according to your location.

* Enabled SSH server.
    
    Run `sudo raspi-config` from the command line, and select _Advanced Options_ → _SSH_, and enable the SSH server.

* At least 128 MB of GPU RAM.
    
    Run `sudo raspi-config` from the command line, and select _Advanced Options_ → _Memory Split_, and give at least 128 MB of RAM to the GPU.

The following packages are necessary for Mirror π to fully function:

* `git` “Git is a fast, scalable, distributed revision control system with an unusually rich command set that provides both high-level operations and full access to internals.” Mirror π's source code in maintained using Git on GitHub, therefore Git is needed to acquire Mirror π.

* `fbi` “fbi displays the specified file(s) on the linux console using the framebuffer device.” fbi is needed so Mirror π can display a splash screen on boot.

* `python-gtk2` This package contains modules that allow to use GTK+ in Python programs.

* `python-webkit` This package contains modules that allow using the WebKit browser engine in a Python/GTK+ application.

You can install the listed packages by entering the following to the command-line:

```
sudo apt-get install git fbi python-gtk2 python-webkit -y
```

### Optional prerequisites

Mirror π supports the use of an [HC-SR501](https://www.google.com/search?q=%22HC-SR501%22) passive infrared sensor ([PIR sensor](http://en.wikipedia.org/wiki/Passive_infrared_sensor)), which is used for motion detection. If Mirror π does not detect motion for a certain time it turns off the Raspberry Pi's HDMI output, this way sends the display into power sleep mode to save energy when no one is around. Also if the display is turned off to save power and motion is detected the Raspberry Pi's HDMI output is turned back on so all information is displayed again.

_Note that the passive infrared sensor is an optional prerequisite, therefore parts of this document in connection with the usage of the sensor are marked with _`*`_._

The following package is necessary to make the PIR sensor work with the Raspberry Pi.

* `python-rpi.gpio` Python GPIO module for Raspberry Pi.

To install the `python-rpi.gpio` package enter the following command into the command-line:

```
sudo apt-get install python-rpi.gpio -y
```

#### Hardware setup

You can see the GPIO layout for Raspberry Pi Model B rev1, Raspberry Pi Model B rev2 and Raspberry Pi Model B+ in a single ASCII figure below.

```
                       +-----------+
                       |           |
           3V3 (Power) | ( 1) ( 2) | 5V (Power)
                       |           |
rev1: GPIO0 (SDA0 I2C) | ( 3) ( 4) | 5V (Power)
rev2: GPIO2 (SDA1 I2C) |           |
                       |           |
rev1: GPIO1 (SCL0 I2C) | ( 5) ( 6) | Ground
rev2: GPIO3 (SCL1 I2C) |           |
                       |           |
                 GPIO4 | ( 7) ( 8) | GPIO14 (UART0_TXD)
                       |           |
                Ground | ( 8) (10) | GPIO15 (UART0_RXD)
                       |           |
                GPIO17 | (11) (12) | GPIO18 (PCM_CLK)
                       |           |
          rev1: GPIO21 | (13) (14) | Ground
          rev2: GPIO27 |           |
                       |           |
                GPIO22 | (15) (16) | GPIO23
                       |           |
           3V3 (Power) | (17) (18) | GPIO24
                       |           |
    GPIO10 (SPI0_MOSI) | (19) (20) | Ground
                       |           |
     GPIO9 (SPI0_MISO) | (21) (22) | GPIO25
                       |           |
    GPIO11 (SPI0_SCLK) | (23) (24) | GPIO8
                       |           |
                Ground | (25) (26) | GPIO7
                       |           |                     Model B+ only below
 - - - - - - - - - - - +- - - - - -+ - - - - - - - - - - - - - - - - - - - -
                       |           |
 ID_SD (I2C ID EEPROM) | (27) (28) | ID_SC (I2C ID EEPROM)
                       |           |
                 GPIO5 | (29) (30) | Ground
                       |           |
                 GPIO6 | (31) (32) | GPIO12
                       |           |
                GPIO13 | (33) (34) | Ground
                       |           |
                GPIO19 | (35) (36) | GPIO16
                       |           |
                GPIO26 | (37) (38) | GPIO20
                       |           |
                Ground | (39) (40) | GPIO21
                       |           |
                       +-----------+
```

The HC-SR501 sensor is connected to the Raspberry Pi GPIO pins as shown below.

```
+------------+
| PIR SENSOR |
| (HC-SR501) |
|            |
|        +5V | ---------------------------------- Pin 2: 5V (Power)
|            |
|        Out | ------------------- Pin 26: GPIO7
|            |
|     Ground | ---- Pin 6: Ground
+------------+
```

## Acquire Mirror π

To get Mirror π simply run the following command in the command-line:

```
git clone https://github.com/szantaii/mirror-pi.git
```

_Note that the following instructions use the `pi` user's home directory (`/home/pi`) as the base directory for Mirror π. If you choose to clone Mirror π to a different location make sure you enter the proper paths when using the following commands in the next sections. Also the [startup/mirror-pi.desktop](startup/mirror-pi.desktop) file contains Mirror π's absolute path, so if you cloned Mirror π into another location than the `pi` user's home directory you must edit this file also so it would contain the proper path._

## Boot setup

In this section we will go through the boot process setup of Mirror π.

### Kernel options

By applying the following settings boot logs and splash screens will be hidden.

Remove the following option from the exisitng kernel options:

* `console=tty1` By removing this option the output will not be written to `tty1`.

Add the following options to the existing kernel options:

* `loglevel=3` Only kernel messages with severity 3 or smaller will be logged to the console (KERN\_ERR, KERN\_CRIT, KERN\_ALERT, KERN\_EMERG).

* `logo.nologo` Disables display of the built-in Raspberry Pi logo.

* `vt.global_cursor_default=0` 0 will hide cursor, 1 will display it.

* `quiet` Disables most log messages.

You can add and remove the described options manually (advisable to create a backup of the original kernel options file) or use the following command:

```
sudo sed -i.bak 's/console=tty1/loglevel=3 logo.nologo vt.global_cursor_default=0 quiet/' /boot/cmdline.txt
```

### Raspberry Pi configuration

`TODO` detailed description

It is advisable to create a backup of the original Raspberry Pi specific options file.

```
sudo cp /boot/config.txt /boot/config.txt.bak
```

* `hdmi_force_hotplug=1` Use HDMI mode even if no HDMI monitor is detected.

* `config_hdmi_boost=4` Configure the signal strength of the HDMI interface. (Default is 0. Try 4 if you have interference issues with hdmi. 7 is the maximum.)

* `display_rotate=3` Rotates the display 270 degrees clockwise on the screen.

* `disable_splash=1` If set to 1, disables the rainbow splash screen on boot.

### Splash screen

Enable the Mirror π by adding the `bootsplash` service to the system in four steps:

1. Add execution rights to the `bootsplash` service script.
    
    ```
    chmod a+x /home/pi/mirror-pi/startup/bootsplash.sh
    ```

2. Add a symbolic link of the service script to `/etc/init.d`.
    
    ```
    sudo ln -s /home/pi/mirror-pi/startup/bootsplash.sh /etc/init.d/bootsplash.sh
    ```

3. Enable the installed system init script by reading the comment header of the script.
    
    ```
    sudo insserv /etc/init.d/bootsplash.sh
    ```

4. Make the `bootsplash` service start on system startup.
    
    ```
    sudo update-rc.d bootsplash.sh start
    ```

### Desktop configuration

`TODO` detailed description

```
sudo sed -i.bak 's/^/#/' /etc/xdg/lxsession/LXDE/autostart
```

```
mkdir -p /home/pi/.config/autostart
ln -s /home/pi/mirror-pi/startup/mirror-pi.desktop /home/pi/.config/autostart/mirror-pi.desktop
```

```
sudo sed -i.bak 's/^#xserver-command=X$/xserver-command=X -s 0 -dpms -nocursor/' /etc/lightdm/lightdm.conf
```

## Mirror π setup

`TODO`
