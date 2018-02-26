/*
 * TouchSensor.cpp
 *
 *  Created on: 2. feb. 2018
 *      Author: Stian
 */

#include "TouchSensor.h"

TouchSensor::TouchSensor(){
	touch_topic = "";
	touch_value = 0;
}

TouchSensor::TouchSensor(PubSubClient& client, WiFiManager& manager) : MySmartHome(client, manager) {
	touch_topic = "tch";
	touch_value = 0;
}

TouchSensor::~TouchSensor() {
}

