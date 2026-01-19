# Reading and Flashing ECUs

Most people get an expensive Tactrix Open Port 2.0 Adapter to flash their cars. But you don't always need to spend 300$ (or 800$ with all the scalping going on rn) on a Tactrix that utilizes a 20 year old USB Mini-B connector which tends to get damaged very easily. If you drive an older Subaru you can likely utilize off-the-shelf OBD adapters too!

<!-- prettier-ignore -->
!!! note "This guide will only talk about _Open Source Tuning_<br/>"
    You may also use propriatary flashing utilities which may come with some cool features that "Open Source" tuning does not offer at the moment like [Lambda Tuning](https://lambdatuning.com/). Another option would be a [Cobb AccessPort](https://www.cobbtuning.com/) but you won't be able to tune it yourself as only certified Cobb tuners have access to modifying tunes.

## Identifying Platform

First things first, you'll need to know if your car uses a Denso ECU or not. Most naturally aspirated engines use a Hitachi ECU which **cannot** be flashed!  
Unfortunately, if you don't have a turbo car, you'll likely have a hard time finding resources on flashing your ECU.

Next up you need to know if your car uses K-Line or CAN for the flashing process. A general rule of thumb is that most subies up to 2008 use K-Line. With the Legacies you generally see K-Line on the pre-facelift BL/BP (2003) and CAN on the facelift (2006).

Another detail to note is whether your ECU is 16bit or 32bit. iWire has a good [article](https://iwireusa.com/blogs/iwire-university/16-bit-ecu-vs-32-bit-ecu-in-your-subaru) on the topic. For tuning we only need to know if it's 16b or 32b for the choice of [ECU patches](#ecu-patches).  
<small>Well, another thing would be that 32bit ECUs can be flashed more often than 16bit, but the number of flashes you can perform is so high, and the risk of bricking your ECU during the flash process is present on every flash you perform, hence I don't think it's really a valid point to talk about.</small>

<!-- prettier-ignore -->
!!! info "Test mode adapters <br/>"
    As I drive a Forester SG I can only talk about my car. I know that some older subies require you to have a special adapter for flashing. For SG and GD you basically just need to connect the green _test mode connector_ underneath your steering wheel column. If that doesn't work you should check the passenger side, there's often another one hidden underneath the outside trim. You can basically keep one of them always connected and only connect the other one when you need to flash. You may even install a switch inbetween, the green connectors are simple blade connectors wiht a green housing so you can just extend them with some blade crimps.

## Adapters

### K-Line

Most K-Line cars can be flashed using a generic KKL adapter like a VAGCOM adapter which are readily available on eBay or AliExpress for 10-20 bucks! I'd recommend one with a genuine FTDI serial chip but the ones with a cheap CH340 serial adapter [also seem to work](https://www.subaruforester.org/threads/tuning-with-vag-com-cable.469866/).

## CAN

For CAN bus vehicles you'll most likely need a Tactrix.

There are some alternatives. [VXDIAG](https://vxdiag.com/collections/vcx-se-for-subaru/products/vxdiag-vcx-se-for-subaru) could be an option. One could use an official SSM3/SSM4 adapter from Subaru if they wanted as well.

<!-- prettier-ignore -->
!!! note ""
    I have ordered a Tactrix clone and am waiting for it at the moment. I will report back on how it works. I basically looked up _Open Port 2.0_ on AliExpress and chose the first listing (which only mentioned Mercedes and Toyota in the title, but Open Port is Open Port) for 18€. We'll see how well it works.  
    Clones are said to be hit or miss, I would assume that most problems arise when people use new EcuFlash versions which brick inofficial adapters. Use it with FastECU or EcuFlash 1.28 and you should be all good. If not you can always return it and try a different listing.

## Flashing Software

You need some software that is communicate with your car through your adapter. For this there are a few options.

If you are using official SSM3/SSM4 you will likely have access to Subaru's internal flashing utility.  
If you are using a commercial CAN-Bus/KKL adapter (like aformentioned VXDIAG) you will likely have access to their propriatary tool too.

If you wanna use "Open Source" tools you can choose one of the following ones.

### Atlas

[Atlas](https://motorsportsresearch.org/) is a tuning utility mostly aimed for modern Subarus (VA or VB WRX STi).

### EcuFlash

[EcuFlash](https://www.tactrix.com/index.php?option=com_content&view=category&layout=blog&id=36&Itemid=58) gives you an error if you don't use a genuine Tactrix adapter. But not all EcuFlash versions are like that! EcuFlash **1.28** works with any adapter you want! If you don't use a K-Line cable with an FTDI chip it will likely give you an error that no FTDI drivers could be loaded, but it will still happily read and flash your ECU! You can save your ROM into a `.bin`/`.hex` and open it with any ECU editor you want (including the latest EcuFlash version), you just use EcuFlash 1.28 for reading/flsahing.

You can find old EcuFlash versions archived in the [EvoECU Forums](https://evoecu.logic.net/mirror/ecuflash/releases/)

### FastECU

[FastECU](https://github.com/miikasyvanen/FastECU) is an actually open source ECU flasher. It is basically a GUI for [`nisprog`/`npkerne`](#origin-of-flashing-tools). It may feel dated, but you will only be using it for reading and flashing anyway.

### Origin of Flashing Tools

`nisprog` and `npkern` is basically the origin of tuning our ECUs. It was written by _fenugrec_ who had reverse engineered Nissan ECUs which used basically the same CPUs in their ECUs as Subaru did. _rimwall_ forked `nisprog`/`npkerne` and modified it to work with Subarus.

Ultimately, these lads (as well as many other contributors from the community) have laid the groundwork for any of these tools we are talking about.

## ECU Editing Software

There are many options for ECU editing. Hell, you could even edit the binary file directly in an HEX editor. But of course no one wants that.

## ECU Patches

There are some popular patches you can flash on your ECU. The two most popular patches are probably [Carberry](https://www.romraider.com/forum/viewtopic.php?f=36&t=7594) and [MerpMod](https://www.romraider.com/forum/viewtopic.php?f=37&t=10276).

As I have a 32bit ECU I don't really have any experience with Carberry but they basically work the same way anyway. There are actually some forks of MerpMod (a fork is a copy of some software that is being modified by another party, basically developing their own version of said software building upon the work of someone else) which add various features. There are some that add Anti Lag, some work on FlexFuel integration, etc etc.

Just look through forums, RomRaider's [Tuning Section](https://www.romraider.com/forum/viewforum.php?f=23) is a great place to start looking or asking :)

## Bench Flashing

This is a topic I haven't looked into yet but want to look into eventually. Bench flashing is the process of taking out your ECU from your car and communicating directly with the EEPROM of your ECU. This is useful if you "brick" your ECU.

## Little personal rant on "_Open Source Tuning_"

You may have noticed me putting _Open Source_ in paranthesis throughout this page.

The used terminology around these tools annoys me so much! First off, why is it called _Open Port_ if it's a propriatary adapter which fights heavily against clones?

Next up is EcuFlash. Up till 1.28 it has supported any adapter but with 1.29 they started enforcing you to use Tactrix' inhouse adapter.
If enforcing you to buy their expensive adapter isn't enough, if you use a cloned Tactrix adapter the program will detect it and **brick your cloned adapter**!
EcuFlash started as a flashing utility by OpenECU (which was founded by the CEO of Tactrix). Why is it called OpenECU if nothing about the software is _open_? The only thing open are the ECU definitions made by the community. These definitions are just identifying which bytes of your ECU hold what kind of content that the flashing utility then let's you modify. Obviously this kinda data is really important to have and hard to figure out, but this was mostly a community effort.

Why is _Open Source Tuning_ not actually **_Open Source_**?!
