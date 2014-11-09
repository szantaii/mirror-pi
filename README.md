# Mirror π

***

## Contents

* [About](#about)
  * [News](#news)
* [License](#license)
* [Prerequisites](#prerequisites)
  * [Optional prerequisites](#optional-prerequisites)
* [Hardware setup](#hardware-setup)y
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

This project, unless noted otherwise, is licensed under the GNU General Public License Version 3+. For the full license, see [`LICENSE`](LICENSE).

jQuery JavaScript Library v2.1.1 Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors, released under the [MIT license](http://jquery.org/license)

## Prerequisites

Mirror π is built using a Raspberry Model B+, but the following instructions also apply to the Raspberry Pi Model B rev1 and the Raspberry Pi Model B rev2.

The following operating system and configuration is required:

* [Raspbian](http://www.raspbian.org/) with internet access updated to the latest version.
    
    You can achieve this by running an update, and upgrade and a firmware update.
    
    ```
    sudo apt-get update && sudo apt-get dist-upgrade -y && sudo rpi-update
    ```
    
    _Note that after a required firmware update the Raspberry Pi will reboot._

* Boot to desktop enabled.
    
    Run `sudo raspi-config` from the command line, and select _Enable Boot to Desktop/Scratch_ → _Desktop Log in as user 'pi' at the graphical desktop_.

* Correct timezone set.
    
    Run `sudo raspi-config` from the command line, and select _Internationalisation Options_ → _Change Timezone_, and select your timezone according to your location.

* Enabled SSH server.
    
    Run `sudo raspi-config` from the command line, and select _Advanced Options_ → _SSH_, and enable the SSH server.

* At least 128 MB of GPU RAM.
    
    Run `sudo raspi-config` from the command line, and select _Advanced Options_ → _Memory Split_, and give at least 128 MB of RAM to the GPU.

The following packages are necessary for Mirror π to fully function:

* `fbi` `TODO` description

* `python-gtk2` `TODO` description

* `python-webkit` `TODO` description
    
    Install them by entering the following code to the command line:
    ```
    sudo apt-get install fbi python-gtk2 python-webkit -y
    ```

### Optional prerequisites

TODO: PIR sensor

The sensor is an optional prerequisite, therefore parts of this document in connection with the usage of the sensor are marked with `*`.

* `python-rpi.gpio` `TODO` description 

```bash
sudo apt-get install python-rpi.gpio
```

## Hardware setup

`TODO`

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

## Acquire Mirror π

`TODO` detailed description

```
git clone https://github.com/szantaii/mirror-pi.git
```

## Boot setup

### Kernel options

By applying the following settings boot logs and splash screens will be hidden.

First it is advisable to create a backup of the original kernel options file.

```
sudo cp /boot/cmdline.txt /boot/cmdline.txt.bak
```

Remove the following option from the exisitng kernel options:

* `console=tty1` By removing this option the output will not be written to `tty1`.

Add the following options to the existing kernel options:

* `loglevel=3` Kernel messages with severity 3 or smaller will only be logged to the console (KERN\_ERR, KERN\_CRIT, KERN\_ALERT, KERN\_EMERG).

* `logo.nologo` Disables display of the built-in Raspberry Pi logo.

* `vt.global_cursor_default=0` 0 will hide cursors, 1 will display them.

* `quiet` Disable most log messages.

You can add and remove the described options manually or use the following command:

```
sudo sed -i 's/console=tty1/loglevel=3 logo.nologo vt.global_cursor_default=0 quiet/' /boot/cmdline.txt
```

### Raspberry Pi configuration

`TODO` detailed description

It is advisable to create a backup of the original Raspberry Pi specific options file.

```
sudo cp /boot/config.txt /boot/config.txt.bak
```

* `hdmi_force_hotplug=1` `TODO` description

* `config_hdmi_boost=4` `TODO` description

* `display_rotate=3` `TODO` description

* `disable_splash=1` `TODO` description

### Splash screen

```
chmod a+x /home/pi/mirror-pi/startup/bootsplash.sh
sudo ln -s /home/pi/mirror-pi/startup/bootsplash.sh /etc/init.d/bootsplash.sh
sudo insserv /etc/init.d/bootsplash.sh
sudo update-rc.d bootsplash.sh start
```

### Desktop configuration

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
