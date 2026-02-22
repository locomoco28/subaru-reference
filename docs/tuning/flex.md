# Flex Fuel

NASIOC Thread: <https://forums.nasioc.com/forums/showthread.php?t=2810122>

## Backup (copied February 21st, 2026)

> Update: 10/17/2016 - if you followed the previous schematic, the resistor and cap were reversed. The correction has been made and the new schematic uploaded.  
> Update: 10/26/2016 - if you used a 10uF capacitor before, switch to a 0.1uF capacitor on your RC filter  
> Update: 10/31/2016 - this DIY just got simpler... no need for an RC filter, just use a 3.3k ohm resistor on the Pin 11 output and you'll be fine.
>
> First, credit to Daniel aka Dala on the sr20 forum for getting the ball rolling on this and for the help with trouble shooting and general "walk me through this" stuff. His thread on using an Arduino board to create a Flex Fuel ethanol content analyzer is a helpful resource, but it is a bit cluttered and there were a couple things wrong in that thread and in the code. Here is the link for reference. <http://www.sr20-forum.com/nismotronic/76787-flex-fuel-sensor-output.html>
>
> The problem? - Flex Fuel sensors on the market put out information in the form of a frequency between 50-150hz, so they don't put out 5v, which is what many engine management systems need. In this case we're talking about the Cobb Accessport V3.
>
> The solution - program an Arduino Nano board to convert the signal into a pulse width modulated (pwm) signal that feeds a voltage number that the AP can use to interpret the ethanol content.
>
> Things you'll need (I'll leave out basics like wire, solder iron, etc):
>
> - Arduino Nano $7 ([Amazon link](https://www.amazon.com/ATmega328P-Microcontroller-Board-Cable-Arduino/dp/B00NLAMS9C))
> - 4.7k ohm resistor $1
> - 3.3k ohm resistor $1
> - 8v 1amp Voltage Regulator $2 (I used [this one](http://www.alliedelec.com/nte-electronics-inc-nte964/70215852/))
> - Delphi [connector](http://www.mouser.com/ProductDetail/Delphi-Connection-Systems/13519047) plus [terminals](http://www.mouser.com/Search/ProductDetail.aspx?R=12191819-Lvirtualkey59690000virtualkey829-12191819) [seals](http://www.mouser.com/Connectors/Automotive-Connectors/_/N-1ehb5?Keyword=15366060&FS=True) and [locks](http://www.mouser.com/Search/ProductDetail.aspx?R=15317832virtualkey63000000virtualkey829-15317832) $2.70 plus $7.99 shipping. (O'Reilly Auto actually had [them with a pigtail in stock](http://www.oreillyauto.com/site/c/detail/CTI0/84785/N1590.oap))
> - Flex Fuel Sensor GM Part Number 13577429 ([Amazon](https://amzn.com/B01C5Q7XQ0)) or 13577379 $50 - I even picked an extra one up from the dealership for $65.
> - [Dorman](https://amzn.com/B000E323JO) 800-082 3/8" quick fuel connects if using -6an fuel lines $8.73
> - Rear O2 [sensor connector](https://www.bmotorsports.com/shop/product_info.php/products_id/3242) $8-$10
> - [TGV Connector](https://www.bmotorsports.com/shop/product_info.php/products_id/3202) $7-$10
>
> Let's start with how to wire the Arduino board.
>
> - Power the Arduino using an 8v Voltage Regulator. The VR's 12v source will come from the Rear O2 +12v along with the Rear O2 ground wire, or use a known good +12v switched source and ground wherever makes the most sense (can also use a relay - make sure it's switched by ignition "On"). The center pin of the VR will ground to the Nano labeled "GND" (where you will also solder your rear O2 ground wire), and the VR's 8v output will go to "VIN" on the Nano.
> - Your sensor's output will be received by input pin 8 on the Arduino Nano board. It will first need a +5v pull-up resistor using the 5v pin on the Nano and a 4.7k ohm resistor.
> - The Nano will output through a pwm pin, either pin 3 or pin 11. We will use pin 11 in this case.
> - To make the pwm from pin 11 a more steady voltage for the ECU to read, we need to use a 3.3k ohm resistor.
> - The output from pin 11 will then feed into a free TGV input pin/wire. In my case I used the LH side TGV.
>
> \*The connector for the sensor isn't a direct fit, so you'll have to trim the two tabs that keep it from sliding together.
>
> Next, the code:
>
> - I have included the Serial.print functions so that you can troubleshoot using the serial monitor window in the Arduino IDE on your computer.

<blockquote>
```c
/*******************************************************
This program will sample a 50-150hz signal depending on ethanol
content, and output a 0-5V signal via PWM.
The LCD (for those using an Arduino Uno + LCD shield) will display ethanol content, hz input, mv output, fuel temp
Connect PWM output to TGV. 3.3kOhm resistor works fine.
Input pin 8 (PB0) ICP1 on Atmega328
Output pin 3 or 11, defined below
If LCD Keypad shield is used, solder jumper from Pin 8 - Pin 2,
and snip leg from pin 8 http://i.imgur.com/KdlLmye.png
********************************************************/
// include the library code:
#include <LiquidCrystal.h> //LCD plugin
// initialize the library with the numbers of the interface pins
LiquidCrystal lcd(2, 9, 4, 5, 6, 7); //LCD Keypad Shield
int inpPin = 8;     //define input pin to 8
int outPin = 11;    //define PWM output, possible pins with LCD and 32khz freq. are 3 and 11 (Nano and Uno)
//Define global variables
volatile uint16_t revTick;    //Ticks per revolution
uint16_t pwm_output  = 0;     //integer for storing PWM value (0-255 value)
int HZ;                   //unsigned 16bit integer for storing HZ input
int ethanol = 0;              //Store ethanol percentage here
float expectedv;              //store expected voltage here - range for typical GM sensors is usually 0.5-4.5v
int duty;                     //Duty cycle (0.0-100.0)
float period;                 //Store period time here (eg.0.0025 s)
float temperature = 0;        //Store fuel temperature here
int fahr = 0;
int cels = 0;
static long highTime = 0;
static long lowTime = 0;
static long tempPulse;
void setupTimer()	 // setup timer1
{
	TCCR1A = 0;      // normal mode
	TCCR1B = 132;    // (10000100) Falling edge trigger, Timer = CPU Clock/256, noise cancellation on
	TCCR1C = 0;      // normal mode
	TIMSK1 = 33;     // (00100001) Input capture and overflow interupts enabled
	TCNT1 = 0;       // start from 0
}
ISR(TIMER1_CAPT_vect)    // PULSE DETECTED!  (interrupt automatically triggered, not called by main program)
{
	revTick = ICR1;      // save duration of last revolution
	TCNT1 = 0;	     // restart timer for next revolution
}
ISR(TIMER1_OVF_vect)    // counter overflow/timeout
{ revTick = 0; }        // Ticks per second = 0
void setup()
{
  Serial.begin(9600);
  pinMode(inpPin,INPUT);
  setPwmFrequency(outPin,1); //Modify frequency on PWM output
 setupTimer();
   // set up the LCD's number of columns and rows:
  lcd.begin(16, 2);
  // Initial screen formatting
  lcd.setCursor(0, 0);
  lcd.print("Ethanol:    %");
  lcd.setCursor(0, 1);
  lcd.print("     Hz       C");
}
void loop()
{
  getfueltemp(inpPin); //read fuel temp from input duty cycle
  if (revTick > 0) // Avoid dividing by zero, sample in the HZ
		{HZ = 62200 / revTick;}     // 3456000ticks per minute, 57600 per second
		else
		{HZ = 0;}                   //needs real sensor test to determine correct tickrate
  //calculate ethanol percentage
		if (HZ > 50) // Avoid dividing by zero
		{ethanol = (HZ-50);}
		else
		{ethanol = 0;}
if (ethanol > 99) // Avoid overflow in PWM
{ethanol = 99;}
  expectedv = ((((HZ-50.0)*0.01)*4)+0.5);
  //Screen calculations
  pwm_output = 1.1 * (255 * (expectedv/5.0)); //calculate output PWM for ECU
  lcd.setCursor(10, 0);
  lcd.print(ethanol);
  lcd.setCursor(2, 1);
  lcd.print(HZ);
  lcd.setCursor(8, 1);
  lcd.print(temperature); //Use this for celsius
  //PWM output
  analogWrite(outPin, pwm_output); //write the PWM value to output pin
  delay(100);  //make screen more easily readable by not updating it too often
  Serial.println(ethanol);
  Serial.println(pwm_output);
  Serial.println(expectedv);
  Serial.println(HZ);
  delay(1000);
}
void getfueltemp(int inpPin){ //read fuel temp from input duty cycle
highTime = 0;
lowTime = 0;
tempPulse = pulseIn(inpPin,HIGH);
  if(tempPulse>highTime){
  highTime = tempPulse;
  }
tempPulse = pulseIn(inpPin,LOW);
  if(tempPulse>lowTime){
  lowTime = tempPulse;
  }
duty = ((100*(highTime/(double (lowTime+highTime))))); //Calculate duty cycle (integer extra decimal)
float T = (float(1.0/float(HZ)));             //Calculate total period time
float period = float(100-duty)*T;             //Calculate the active period time (100-duty)*T
float temp2 = float(10) * float(period);      //Convert ms to whole number
temperature = ((40.25 * temp2)-81.25);        //Calculate temperature for display (1ms = -40, 5ms = 80)
int cels = int(temperature);
cels = cels*0.1;
float fahrtemp = ((temperature*1.8)+32);
fahr = fahrtemp*0.1;
}
void setPwmFrequency(int pin, int divisor) { //This code snippet raises the timers linked to the PWM outputs
  byte mode;                                 //This way the PWM frequency can be raised or lowered. Prescaler of 1 sets PWM output to 32KHz (pin 3, 11)
  if(pin == 5 || pin == 6 || pin == 9 || pin == 10) {
    switch(divisor) {
      case 1: mode = 0x01; break;
      case 8: mode = 0x02; break;
      case 64: mode = 0x03; break;
      case 256: mode = 0x04; break;
      case 1024: mode = 0x05; break;
      default: return;
    }
    if(pin == 5 || pin == 6) {
      TCCR0B = TCCR0B & 0b11111000 | mode;
    } else {
      TCCR1B = TCCR1B & 0b11111000 | mode;
    }
  } else if(pin == 3 || pin == 11) {
    switch(divisor) {
      case 1: mode = 0x01; break;
      case 8: mode = 0x02; break;
      case 32: mode = 0x03; break;
      case 64: mode = 0x04; break;
      case 128: mode = 0x05; break;
      case 256: mode = 0x06; break;
      case 1024: mode = 0x7; break;
      default: return;
    }
    TCCR2B = TCCR2B & 0b11111000 | mode;
  }
}
```
</blockquote>

> - Download drivers and the IDE interface to your computer and make sure you have communication with your Arduino via USB.
> - Upload the sketch to your Arduino Nano.
>
> Powering the Arduino Nano and the Flex Fuel Sensor:
>
> - For powering the Arduino, we need to drop down from +12v to +7-9v for the Arduino to safely operate. We will use an 8v 1amp voltage regulator. Another solution is a simple USB car charger that outputs +5v for cell phones, etc. Try to stick with 5v and 1amp (1000mah).
> - Pull your +12v using the rear O2 sensor (I cut the harness off of my stock O2 sensor since it was deleted to make way for AEM UEGO). This will power both the Arduino and the Flex Fuel Sensor. (if you're not sure which wire is +12v, use a simple voltage/circuit tester to check the pins on the harness)
>
> Connecting to TGV wire
>
> - Make sure to find the right pin on your TGV wire harness. This is what will use the output from pin 11 from the Arduino Nano.
>
> \*\*\*Testing (for if you feel like getting techie, otherwise if everything works when you plug it all in, then you're golden!)
>
> - For quick testing, you can monitor your TGV voltage on your AP or engine management software to see if the Arduino is working (0.5v = 0% ethanol, 2.5v = 50%, etc.), otherwise start by changing your map to setup for Ethanol (I had my tuner do it for me) and see if it looks accurate by monitoring "Ethanol Raw" or "Ethanol Final". [Cobb's Flex Fuel Tuning Guide](https://cobbtuning.atlassian.net/wiki/display/PRS/Subaru+Flex+Fuel+Tuning+Guide#SubaruFlexFuelTuningGuide-FuelSystemConsiderations:)
> - Make sure your Arduino's power light comes on when you turn your ignition to "On"
> - If you confirmed that the Arduino is receiving power, disconnect the wires that are powering the unit and plug in a USB cable from your Laptop.
> - With your laptop connected to the Arduino, open Arduino IDE software on your computer and hit Ctrl+Shift+M to open the monitor window. Turn the ignition back to "On". Every second it will refresh with 4 things being monitored; Ethanol(%), PWM output, expected voltage output (AP should reflect the same number as this), and Hz.
> - You may not have any numbers show up in the window, or they may look way off, so this is important\*\*\*8230; YOU MUST USE SOMETHING TO GROUND THE ARDUINO TO THE CAR when the USB cable is plugged into the laptop, otherwise it will not pull readings from the sensor. THIS IS NOT TRUE when the Arduino is powered by the car. I used my circuit tester and connected the alligator clip straight to the negative battery terminal, then touch the outer USB housing to ground it. Once you do this, the serial monitor window should be scrolling some numbers.
> - The math for deriving ethanol content from the Hz frequency of the sensor is simple. E = Hz-50. For example, 100Hz - 50 = E50. 150Hz - 50 = E100
> - If you have an oscilloscope or multimeter you can confirm that the Arduino is matching the exact frequency of the sensor output (more on that if somebody runs into a problem on this).
> - The voltage range will be 0.5v for 0% ethanol, and 4.5v for E100
>
> Drive around and make sure everything is fine. Content should be within 1% accuracy.
>
> If all is well, then congratulations! You just saved yourself $500!!!
> Finish up by enclosing everything in a waterproof container and using strain reliefs for the wiring going into the box. Small marine containers or similar products meant for keeping your cell phone safe when around water are good options for enclosing your Arduino Nano.
>
> \*For adding in an LCD, the code is already in the sketch, but you'll need to go to the link provided to the sr20 forum on how to jump a pin to make the LCD work (using Arduino Uno)
>
> \*\*Also included in the code is output for fuel temperature, which I think Subarus already have??? So that's not really necessary, and your other TGV is better off being used for reading fuel pressure.
>
> _\*\*Voltage output from Nano board to Nano board may vary a few percent. If your Ethanol number looks a bit off (ie- you know your ethanol % should be 85% but it reads 81%), then you'll just need to edit the pwm_output multiplier in the code. Edit this line pwm_output = 1.1 _ (255 \* (expectedv/5.0)); //calculate output PWM for ECU and change 1.1 up or down to get the correct output (note- you should only need to adjust in 0.01 increments)
