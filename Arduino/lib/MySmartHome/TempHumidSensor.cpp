/*
 * TempHumidSensor.cpp
 *
 *  Created on: 2. feb. 2018
 *      Author: Stian
 */

#include "TempHumidSensor.h"

TempHumidSensor::TempHumidSensor() : MySmartHome() {
	temp_fahrenheit = 0;
	temp_celsius = 0;
	humidity = 0;
	this->dht = NULL;
}
/**
 * Constructor for temphumid sensor. calls baseclass for setting up wifi access point and mqtt connection
 */
TempHumidSensor::TempHumidSensor(DHT& sensor,PubSubClient& client, WiFiManager& manager) : MySmartHome(client, manager){
	temp_fahrenheit = 0;
	temp_celsius = 0;
	humidity = 0;
	strcpy(temp_topic, "temp");
	strcpy(humidity_topic, "hum");
	this->dht = &sensor;

}
TempHumidSensor::~TempHumidSensor() {
}

void TempHumidSensor::setup_sensor_cons() {
	dht->begin();
	setup_connections();
}


void TempHumidSensor::read_temp_humid() {
	mqtt_connection();

	humidity = dht->readHumidity();
	temp_celsius = dht->readTemperature();
	temp_fahrenheit = dht->readTemperature(true);

	if(isnan(humidity) || isnan(temp_celsius) || isnan(temp_fahrenheit)){
		Serial.println("Failed DHT");
		return;
	} else {
		MySmartHome::publish_sensor_json(temp_topic, temp_celsius);
		MySmartHome::publish_sensor_json(hum_topic, humidity);
	}
	delay(5000);
}

