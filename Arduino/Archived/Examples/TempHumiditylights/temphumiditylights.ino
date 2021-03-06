/* How to use the DHT-22 sensor with Arduino uno
   Temperature and humidity sensor
   More info: http://www.ardumotive.com/how-to-use-dht-22-sensor-en.html
   Dev: Michalis Vasilakis // Date: 1/7/2015 // www.ardumotive.com */

//Libraries
#include <DHT.h>;

//Constants
#define DHTPIN 2     // what pin we're connected to
#define DHTTYPE DHT22   // DHT 22  (AM2302)
DHT dht(DHTPIN, DHTTYPE); //// Initialize DHT sensor for normal 16mhz Arduino


//Variables
int chk;
float hum;  //Stores humidity value
float temp; //Stores temperature value
int redPin = 7;
int bluePin = 5;
int greenPin = 6;
int counter = 0;

void setup()
{
  Serial.begin(9600);
  dht.begin();
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);

}

void loop()
{
  //Read data and store it to variables hum and temp
  hum = dht.readHumidity();
  temp = dht.readTemperature();
  //Print temp and humidity values to serial monitor
  Serial.print("Humidity: ");
  Serial.print(hum);
  Serial.print(" %, Temp: ");
  Serial.print(temp);
  Serial.println(" Celsius");
  if (hum >= 20) {
    switch (counter) {
      case 0:
        setColor(255, 0, 0);
        break;
      case 1:
        setColor(0, 255, 0);
        break;
      case 2:
        setColor(0, 0, 255);
        break;
      case 3:
        setColor(170, 0, 255);
        break;
      case 4:
        setColor(255, 255, 255);
        break;
      default:
        counter = 0;
    }
    counter++;
  }
  else{
      setColor(0,0,0);
  }
    
  
  delay(250);
}

void setColor(int redValue, int greenValue, int blueValue) {
  analogWrite(redPin, redValue);
  analogWrite(greenPin, greenValue);
  analogWrite(bluePin, blueValue);
}

