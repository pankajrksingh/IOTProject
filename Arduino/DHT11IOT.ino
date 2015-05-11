#include <MQ135.h>

// Example testing sketch for various DHT humidity/temperature sensors
// Written by ladyada, public domain

#include "DHT.h"
#include <YunClient.h>
#include <PubSubClient.h>

#define DHTPIN 8    // what pin we're connected to

#define GASSENSORPIN 1 // Gas sensor Pin

// Uncomment whatever type you're using!
#define DHTTYPE DHT11   // DHT 11 
//#define DHTTYPE DHT22   // DHT 22  (AM2302)
//#define DHTTYPE DHT21   // DHT 21 (AM2301)

// Connect pin 1 (on the left) of the sensor to +5V
// NOTE: If using a board with 3.3V logic like an Arduino Due connect pin 1
// to 3.3V instead of 5V!
// Connect pin 2 of the sensor to whatever your DHTPIN is
// Connect pin 4 (on the right) of the sensor to GROUND
// Connect a 10K resistor from pin 2 (data) to pin 1 (power) of the sensor

// Initialize DHT sensor for normal 16mhz Arduino
DHT dht(DHTPIN, DHTTYPE);
// NOTE: For working with a faster chip, like an Arduino Due or Teensy, you
// might need to increase the threshold for cycle counts considered a 1 or 0.
// You can do this by passing a 3rd parameter for this threshold.  It's a bit
// of fiddling to find the right value, but in general the faster the CPU the
// higher the value.  The default for a 16mhz AVR is a value of 6.  For an
// Arduino Due that runs at 84mhz a value of 30 works.
// Example to initialize DHT sensor for Arduino Due:
//DHT dht(DHTPIN, DHTTYPE, 30);

 
YunClient yunClient;
PubSubClient mqtt("messaging.quickstart.internetofthings.ibmcloud.com", 1883, callback, yunClient);

unsigned long time;
String pubString;
char pubChars[500];

MQ135 gasSensor = MQ135(GASSENSORPIN); 

 
void setup()
{
  Bridge.begin();
  dht.begin();
  mqtt.connect("d:quickstart:sensors:90a2daf52214");

}
 
void loop()
{  
  if(millis() > (time + 5000))
  {
     //float resitance = gasSensor.getResistance();
    //float rzeroco = gasSensor.getRZero();
    //float rzeronh = gasSensor.getRZeroNH3();
    //Serial.println("Resistance CO2: " + String(rzeroco));
    //Serial.println("Resistance NH3: " + String(rzeronh));
    // Reading temperature or humidity takes about 250 milliseconds!
    // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
    float h = dht.readHumidity();
    // Read temperature as Celsius
    float t = dht.readTemperature();
    // Read temperature as Fahrenheit
    float f = dht.readTemperature(true);
    // Compute heat index
    // Must send in temp in Fahrenheit!
    float hi = dht.computeHeatIndex(f, h);
    
    //GETTING DATA FROM GAS SENSOR
    float co2 = gasSensor.getPPM();
    float nh3 = gasSensor.getPPMNH3();
    //Serial.print("NH3 : " + String(nh3));
    //Serial.print("Gas Sensor : " + String(gas));
    //Serial.println(gas, DEC);
      
      
    time = millis();
    pubString = "{\"Temperature\":" + String(t);
    pubString += ",\"Humidity\":" + String(h);
    pubString += ",\"Heat Index\":" + String(hi);
    pubString += ",\"CO2\":" + String(co2);
    pubString += ",\"NH3\":" + String(nh3) + "} ";
    pubString.toCharArray(pubChars, pubString.length() + 1);
    Serial.println("pubString: " + pubString);
    mqtt.publish("iot-2/evt/status/fmt/json", pubChars);
  }
  mqtt.loop();
}
 
void callback(char* topic, byte* payload, unsigned int length) { }
