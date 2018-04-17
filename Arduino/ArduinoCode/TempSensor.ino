#include <PubSubClient.h>
#include <ESP8266WiFi.h>          //https://github.com/esp8266/Arduino
//needed for library
#include <ESP8266WebServer.h>
#include <WiFiManager.h>         //https://github.com/tzapu/WiFiManager
#include <MySmartHome.h>
#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

WiFiClient EspClient;
PubSubClient client(EspClient);
WiFiManager manager;

TempHumidSensor sensor(dht, client, manager);

void setup() {
    Serial.begin(115200);
    while(!Serial) {;}
    sensor.setup_sensor_cons();
}

void loop() {
  sensor.read_temp_humid();
}

