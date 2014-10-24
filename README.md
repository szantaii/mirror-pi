# Mirror π

***

## Contents

* [About](#about)
  * [News](#news)
* [License](#license)
* [Prerequisites](#prerequisites)
  * [Mandatory prerequisites](#mandatory)
  * [Optional prerequisites](#optional)
* [Hardware setup](#hardware)
* [Mirror π setup](#mirror)

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

A fully updated Raspbian installation with a configured internet access is required.

### Mandatory prerequisites

The following packages are necessary for Mirror π to fully function:

* `fbi` `TODO` description
* `python-gtk2` `TODO` description
* `python-webkit` `TODO` description


```bash
sudo apt-get install python-webkit
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

```text
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

## Boot setup

## Mirror π setup
