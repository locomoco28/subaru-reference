# Parts

## Boost Solenoids

## Pierburg 3 port Electronic Boost Control Solenoid (EBCS)

- Part Number `7.01024.02.0`
- Connector: 2 pin [Jetronic](#jetronic)

easy to find as it's used on many OEM cars like BMWs and hence easy to source

MAC units are said to have sticking issues but some users on the [Subaru Discord] have mentioned to have had no issues with them

## Injectors

### Bosch 1000cc EV1

- Part Number `0 280 158 040`
- Connector: 2 pin [Jetronic](#jetronic)

## IAT

### Bosch plastic housing IAT

The plastic housing IAT sensor is useful when installing an IAT sensor on a metal part (e.g. intercooler) to reduce heatsoak effects on the sensor.

- Part Number `0 280 130 085`
- Connector: 2 pin Jetronic
- [Datasheet](./datasheets/Bosch-IAT-0-280-130-085.pdf)
- Weld-on bungs
  - [MaxxECU](https://www.maxxecu.com/store/engine-control-or-electronics/sensors/temperature/welding-flange-bosch-iat-with-12mm-holes)
  - [Speeding Parts](https://www.speedingparts.com/p/engine-management/engine-control/sensors/temperature-sensor/welding-flange-bosch-iat-with-12mm-holes.html)
  - Probably fairly easy to DIY, from the datasheet it looks like a 12mm hole for the sensor and an M6 thread for a bolt that is like 15mm offset of the sensor hole

## Connectors

### Jetronic

Standard for Bosch

- 2 pin
  - male
    - `1 287 013 003`
    - `9 122 067 011`
    - `1 928 402 078`

### Sumitomo

Used for most OEM connectors on Subarus.

All connectors seem to be documented to this day on their [website](https://prd.sws.co.jp/components/en/) including 3D `STEP` files and CAD drawings which is cool :)  
I didn't archive any drawings as they had a notice not to distribute copies of the files.

- 2 pin
  - `MT-2S-4` / `6189-0039`
    - also known as _Nippon Denso Injector Connector_
    - [Datasheets](https://prd.sws.co.jp/components/en/detail.php?number_s=61890039)
    - Used in: Honda, Toyota, Subaru
    - Subaru Application:
      - Cam Position Sensor
      - Crankshaft Position Sensor
      - Injectors
  - `DL090-2S-2` / `6195-0043`
    - Used in some Subarus for injectors (possibly EZ30?), also for some VAG cars
    - [Datasheets](https://prd.sws.co.jp/components/en/detail.php?number_s=61950043)
  - `MT-2S-7`/`6189-0031`
    - [Datasheets](https://prd.sws.co.jp/components/en/detail.php?number_s=61890031)
    - Used in: Subaru, Toyota, Mitsubishi
    - Subaru Application:
      - AVCS/AVLS Solenoid (sometimes black, usually blue)
      - Fog Light
      - Wastegate Solenoid
      - Various Denso Vacuum Sensors (e.g. used in Toyota 1JZ/1UZ)
  - `RS.E-2S-4` / `6189-0775`
    - [Datasheets](https://prd.sws.co.jp/components/en/detail.php?number_s=61890775)
    - Used in: Nissan, Subaru
    - Subaru Applications:
      - EZ30 knock sensor

### Furukawa

Used for many OEM connectors on Subarus.

- 3 pin
  - `RFW-3S-3` / `RFW-3S-3W`
    - Ignition coil connectors (part with W suffix is white, other one is black)
