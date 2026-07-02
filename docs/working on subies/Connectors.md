## Jetronic

Standard for Bosch

- 2 pin
    - male
        - `1 287 013 003`
        - `9 122 067 011`
        - `1 928 402 078`

## Sumitomo

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

## Furukawa

Used for many OEM connectors on Subarus.

- 3 pin
    - `RFW-3S-3` / `RFW-3S-3W`
        - Ignition coil connectors (part with W suffix is white, other one is black)

## Aptiv/Delphi

- 6 pin
    - `12124107`
        - 6-pin Secondary Air Injection connector (2006 Forester wiring diagram connector E41)

## Yazaki

- 3 pin
    - `7283113330`
        - TGV connector

## Connector Kits

### 2006 Forester 2.5XT EJ255 intake manifold wiring harness connector kit

These are the part numbers for the connectors you need for a stock intake manifold harness.

This equals to the iWire kit [`KI-SUSTI001-0`](https://iwireusa.com/collections/connector-packages/products/2004-2006-usdm-sti-intake-manifold-harness-connector-package?variant=41181769498777).  
I skipped the oil pressure switch connector as it's just a blade connector at a 90° angle which I couldn't find online. Maybe you have some better luck (or use a basic blade connector). Also the PCV monitoring connector as my EUDM model doesn't have it. And if yours does, just crimp the two pins together. That's all the "sensor" does. The white piece in the PCV monitoring sensor just shorts those two pins to show the ECU it is there lol

I added all these items in AliExpress and ended up with around 70€ + 20€ in shipping. You may be optimize some stuff, or use a more reputable seller for a premium (like Mouser or Corsa-Technic). The main goal is to give you a bill of material to do your own research.

When looking for connectors online make sure to get the correct gender (some of the bulkhead connectors were mixed with female or male on AliExpress for the same connector) and also any keying on the connector (some connectors have keys on the sides, some on the bottom, some none etc.)

| Subaru Connector                | Qty | Part                           |
| ------------------------------- | --- | ------------------------------ |
| AVCS Solenoid Plug A            | 2   | Yazaki 7223-1324-30            |
| Cam/Crank/Knock Receptacle      | 1   | Sumitomo DL 6195-0164          |
| Camshaft Pos. Sensor Plug B     | 2   | DJK7031ZA-1.2-21               |
| Coil Pack Plug (Black)          | 2   | Furukawa RFW-3S-3              |
| Coil Pack Plug (White)          | 2   | Furukawa FW-C-D3F-B            |
| Coolant Temp Sensor Plug B      | 1   | Sumitomo 6189-0486             |
| Crankshaft Position Sensor Plug | 1   | **Sumitomo MT-2S-4 6189-0039** |
| Injector Plug – Side Feed       | 4   | **Sumitomo MT-2S-4 6189-0039** |
| Elec. Throttle Motor Plug A     | 1   | Toyota 90980-11858             |
| Knock Sensor Plug C             | 1   | Sumitomo TS090-2S-1 6189-0249  |
| MAP Sensor Plug A               | 1   | TE Econoseal 2822390-1         |
| Power Steering Plug             | 1   | Sumitomo MT-1S 6180-1181       |
| EVAP Purge Control Plug         | 1   | TE 174354-2                    |
| TGV Motor Plug                  | 2   | Sumitomo TS090-2S-2            |
| TGV Sensor Plug A               | 2   | Yazaki 7283-1133-30            |
| Main Engine Receptacle C        | 1   | Sumitomo DL090-16P 6188-0495   |
| Main Engine Receptacle B        | 1   | Sumitomo 6188-0494             |
| 04-06 STi Receptacle D          | 1   | Sumitomo DL 6195-0018          |
