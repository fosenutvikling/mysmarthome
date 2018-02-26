/*
 * PirSensor.cpp
 *
 *  Created on: 2. feb. 2018
 *      Author: Stian
 */

#include "PirSensor.h"

PirSensor::PirSensor() {
	pir_topic = "";
	pir_value = 0;
	input_pin = 0;
}

PirSensor::PirSensor(PubSubClient& client, WiFiManager& manager)  : MySmartHome(client, manager){
	pir_topic = "pir";
	pir_value = 0;
	input_pin = 2;
}

PirSensor::~PirSensor() {
}


void PirSensor::setup_sensor_cons(){
	pinMode(input_pin, INPUT);
	setup_connections();
}

void PirSensor::read_pir(){
	pir_value = digitalRead(input_pin);
	MySmartHome::publish_sensor_json(pir_topic, (String(pir_value)).c_str());
}
