/*
 * MySmartHome.h
 *
 *  Created on: 9. feb. 2018
 *      Author: Stian
 *API references:
 *https://github.com/tzapu/WiFiManager/wiki/API-reference
 *https://pubsubclient.knolleary.net/api.html
 *Inspiration:
 *https://www.baldengineer.com/mqtt-tutorial.html
 *
 */

#ifndef MYSMARTHOME_H_
#define MYSMARTHOME_H_

#define mqtt_port 1883
#define str_length 40
#define temperature_topic "temp" //will be in dht class later
#include "Arduino.h"
#include "ESP8266WiFi.h"
#include "PubSubClient.h"
#include "WiFiManager.h"
#include "ArduinoJson.h"
/**
 * Base class for arduino sensors
 * Sets up an access point for user defined network variables to create a wifi connection
 * Creates an mqtt connection to the raspberry pi on the same network
 */
class MySmartHome {
	private:
		PubSubClient* _client;
		WiFiManager* _manager;
		char _sensor_id[str_length];
		char _mqtt_username[str_length];
		char _mqtt_password[str_length];
		char _mqtt_ssid[str_length];
		
	public:
		MySmartHome();
		MySmartHome(PubSubClient& client, WiFiManager& manager);
		void reconnect();
		void setup_connections();
		void mqtt_connection();
		void publish_sensor_json(char sensor_topic[], float payload);
		virtual ~MySmartHome();
};

#endif /* MYSMARTHOME_H_ */
