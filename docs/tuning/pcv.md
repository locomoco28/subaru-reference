---
title: Positive Crankcase Ventilation
#description: Some notes on the PCV system
---

## FlatironsTuning's In Depth Look

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/HAvxjSdQsXI?si=182sXQeji7hXM-cl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

This hour long video contains a lot of interesting information where Jon Cooley (Flatirons Tuning) and Harvey Epstein (The Boostcreep Ltd.) have been sharing their experience of logging dyno runs with logs of the crankcase pressure. They installed a barb fitting on a plastic oil cap and attached a pressure sensor that can read positive and negative pressure (important).

This is basically a write up for me for the key takeaways.

### Case 1: Stock PCV System

On a stock PCV system you will see **vacuum in the crankcase**. Outside of boost you will have vacuum in the intake which will keep the PCV valve open.  
Under boost the pressure in the intake manifold blocks the PCV valve and the air. The turbocharger is sucking in air through the inlet, and on the other side of the inlet is the air filter which is a restriction. Hence _the turbo is sucking more air in than what can pass through the filter_ and so the **turbo sucks in air from the least restrictive hole** which ends up being the big PCV hose coming from the crankcase.  
This causes a vacuum inside your crankcase.

![Example image showing explosion view of hose (part 11815AB450)](./assets/PCV%20Crankcase%20Hose.png)

/// caption
Illustration from 2006 Forester factory service manual
///

If you end up replacing your intake filter with something better flowing (e.g. Cobb SF intake as used in the video) you will end up with less restriction for the turbo to suck in air which leads to _less crankcase vacuum_ (aka more pressure).

A vacuum in the crankcase. It helps pull the oil seals in to keep them in place (having a clogged PCV blows your seals out and causes oil leaks), it pulls oil out of the turbo's drain hose and reduces drag on your crank (windage[^windage]). Hence Harvey even speculated in the video that a better flowing filter might even lose some performance as the increase in crankcase pressure could increase drag on the crankshaft.

### Case 2: Capped PCV System

Harvey had a Forester XT over to do some dyno runs with capped PCV ports. Both, on the intake as well as the crankcase the ports were plugged with vacuum caps.  
After taking the car for a first run on the dyno the car started heavily blowing white smoke and the crankcase logged positive pressure of 5.7psi (0.39bar) at close to 5k rpm where he aborted.  
Harvey's first instinct was a blown motor.  
After taking a peek in the engine bay and noticing the capped PCV system he decided to attach hoses to the crankcase to basically make a "vented catchcan" kinda like setup. Positive crank case pressure vents to atmosphere. After doing another pull the crankcase pressure stood consistent at around atmospheric, it was actually a tiny bit above it (0.3psi) which would indicate that the stock PCV system cannot flow enough air on its own, hence Subaru relies on the vacuum in the intake to suck crankcase pressure out; which would imply that **a vented PCV system would be less optimal** than a stock PCV. That slight positive pressure would probably not be too much of a concern though, unlike a capped crankcase (basically sealed) which would be disasterous.

### Case 3: Flawed AOS Designs

The next example consists of a 2014 WRX that had an AOS system that's attached to the oil filler cap. This kind of AOS does not have a resevoir to collect oil and also connects the crankcase vent as well as the valve cover vent to the cap through a T-fitting.

T-fitting PCV hoses _can_ be okay but can also be bad as it becomes a restriction.

Anyways, the vehicle had smoke, it had oily smell, hence Harvey suspected ringland failure from these indicators. The first dyno run envailed positive crankcase pressure which was fluctuating which was pretty weird too as the AOS was hooked to the inlet which should be pulling a vacuum.  
Harvey recommended to upgrade to an IAG Race AOS system before diagnosing an engine failure.

Once the new AOS was installed they did another dyno run and finally pulled vacuum.

### Case 4: When PCV pressure can indicate engine problems

During the last section there have been a lot of useful information.

On a turbo car, the forced induction can mask a lot of issues like ringlads or piston rings as the car will still make power. Harvey took a year to find out about his failed ringlands.

A customer with an 08 STi with an OEM PCV system and an oversized turbo was having inconsistent runs. From logs they could see that turbo was overboosting, PCV pressure was increasing into positives, wastegate vacuum hose popped so turbo overboosted (aimed for 20psi, turbo designed for 34psi with no boost control) and injectors maxed out, coilpack popped.
After fixing all the issues they found they did another dyno run which looked great on paper until they checked the PCV pressure: It was building positive pressure showing that there's an issue with the engine. Then they let RPMs climb slowly in idle (no boost) and it started smoking past 3k rpm. So the engine had taken damage from the previous runs and issues.

If the PCV pressure logs were not there they would've kept tuning on this damaged engine.

[^windage]: To read more about windage see [Windage & How it Affects Your Motor - Canton Racing Products](https://blog.cantonracingproducts.com/blog/windage-how-it-affects-your-motor)
