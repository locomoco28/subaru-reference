# Lambda Sensor

On most Subies you can actually scale your front A/F sensor to read down to low 10's which is enough for tuning.

My Forester's ECU had a limitation unfortunately. Logging the front A/F sensor's current I noticed that it doesn't read below -1.37mA which equaled to approximately 11AFR. I was told that GD Imprezas can happy read lower hence you can scale them lower. For me I decided to buy a Denso front A/F sensor that was made for BRZ/GT86. The ft86club forums had a [thread](https://www.ft86club.com/forums/showthread.php?t=82875) with the scaling for their sensors. I had to extend the wiring to fit my SG. On Imprezas you might get away with re-pinning the connector if you decide to get a BRZ sensor (e.g. if you don't wanna scale your sensor yourself).

The scaling for the Denso `DOX-0570` (BRZ sensor I got) looks as follows (units are `mA` to `AFR`):

| -1.30 | -0.87 | -0.61 | -0.39 | -0.24 | -0.11 | 0.00  | 0.05  | 0.15  | 0.23  | 0.30  | 0.37  | 0.43  |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| 10.00 | 11.02 | 11.76 | 12.50 | 13.20 | 13.97 | 14.70 | 15.21 | 16.22 | 17.23 | 18.25 | 19.26 | 20.28 |

You also gotta remember to set your sensor rich limit to 10.0

I would assume that the BRZ sensor is more accurate than the Impreza sensors. If you look up the Denso page for the seperate sensors you'll notice that the Imprezas and Foresters (including STi) use a sensor of type `A/F`, but the BRZ (and I think some Legacy like the Spec B) use type `Planar A/F`.
