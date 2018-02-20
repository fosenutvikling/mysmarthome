/*
 * LightSensor.cpp
 *
 *  Created on: 14. feb. 2018
 *      Author: Stian
 */

#include "LightSensor.h"

namespace LightSensor {

LightSensor::LightSensor() {
	sensor_value = 0;
}
LightSensor::LightSensor(PubSubClient& client, WiFiManager& manager) : MySmartHome(client, manager){
	light_topic = "lght";
	sensor_value = 0;
}
LightSensor::~LightSensor() {
}
void LightSensor::read_light(){
	sensor_value = analogRead(ao_pin);
	MySmartHome::publish_sensor_json(light_topic, (String(sensor_value)).c_str());
}
//Ikke nødvendig?!
void LightSensor::setup_sensor_cons(){

}
} /* namespace LightSensor */
