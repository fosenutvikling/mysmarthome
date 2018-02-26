/*
 * MySmartHome.cpp
 *
 *  Created on: 9. feb. 2018
 *      Author: Stian
 */

#include "MySmartHome.h"

MySmartHome::MySmartHome() {
	this->_client = NULL;
	this->_manager = NULL;

}
/**
 * @param client for connecting to mqtt broker on raspberry bi
 * @param manager for the access point
 */
MySmartHome::MySmartHome(PubSubClient& client, WiFiManager& manager) {
	this->_client = &client;
	this->_manager = &manager;
}

MySmartHome::~MySmartHome() {
}
/**
 * Attempts to establish a connection to the mqtt broker
 */
void MySmartHome::reconnect() {
	while(!_client->connected()) {
		Serial.print("Attempting MQTT connection..:");
		//Legg til parametre mqqt_brukernavn/mqtt_passord
		if(_client->connect("test", _mqtt_username, _mqtt_password)) {
		  Serial.println("Connected");
		} else {
		  Serial.print("failed, rc=");
		  Serial.print(_client->state());
		  Serial.println(" try again in 5 seconds");
		  delay(5000);
		}
	}
}
/**
 * Sets up the acces point with four arguments and waits for user to connect and supply information which will be stored on the arduino device
 */
void MySmartHome::setup_connections() {
	_manager->resetSettings();
	Serial.println("trying to customize par");
	WiFiManagerParameter custom_sensor_id("sensor id", "Sensor name(Ex: Bedroom/2)", _sensor_id, str_length);
	WiFiManagerParameter custom_mqtt_ssid("ssid", "mqtt SSID/IP", _mqtt_ssid, str_length);
	WiFiManagerParameter custom_mqtt_username("username", "mqtt username", _mqtt_username, str_length);
	WiFiManagerParameter custom_mqtt_password("password", "mqtt password", _mqtt_password, str_length);
	//Add parameters to configuration
	_manager->addParameter(&custom_sensor_id);
	_manager->addParameter(&custom_mqtt_ssid);
	_manager->addParameter(&custom_mqtt_username);
	_manager->addParameter(&custom_mqtt_password);
	//Create Wifi access point
	_manager->autoConnect("SmartHome");
	//Set data obtained from user
	strcpy(_sensor_id, custom_sensor_id.getValue());
	strcpy(_mqtt_ssid, custom_mqtt_ssid.getValue());
	strcpy(_mqtt_username, custom_mqtt_username.getValue());
	strcpy(_mqtt_password, custom_mqtt_password.getValue());
	//Parametre mqtt_ssid / mqtt_port
	_client->setServer(_mqtt_ssid, mqtt_port);
}
/**
 * Makes sure the connection to mqtt is up
 */
void MySmartHome::mqtt_connection() {
	if(!_client->connected()){
	    reconnect();
	  }
	  _client->loop();
}
/**
 * Sends json data through mqtt to the raspberry pi
 * @param sensor_topic each type of sensor contains its unique topic it sends data to
 * @param payload data the sensor sends
 */
void MySmartHome::publish_sensor_json(char sensor_topic[]/*pass topic*/, float payload) {
	StaticJsonBuffer<300> JSONbuffer;
	JsonObject& JSONencoder = JSONbuffer.createObject();

	JSONencoder["Sensor_ID"] = _sensor_id;
	JSONencoder["Temperature"] = payload;

	char JSONmessageBuffer[100];
	JSONencoder.printTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
	Serial.println("Sending message to MQTT topic..");
	Serial.println(JSONmessageBuffer);

	if (_client->publish(sensor_topic/*parameter topic*/, JSONmessageBuffer) == true) {
		Serial.println("Success sending message");
		delay(5000);
	}
	else {
		Serial.println("Error sending message");
		delay(5000);
	}
}
