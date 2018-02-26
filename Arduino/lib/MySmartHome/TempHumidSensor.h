/*
 * TempHumidSensor.h
 *
 *  Created on: 2. feb. 2018
 *      Author: Stian
 */

#ifndef TEMPHUMIDSENSOR_H_
#define TEMPHUMIDSENSOR_H_

#define temperature_topic "temp"
#define humidity_topic "hum"

#include "MySmartHome.h"
#include "DHT.h"

class TempHumidSensor: public MySmartHome {
	public:
		int temp_celsius;
		int temp_fahrenheit;
		int humidity;
		char temp_topic[5];
		char hum_topic[4];

		DHT* dht;

		TempHumidSensor();
		TempHumidSensor(DHT& sensor, PubSubClient& client, WiFiManager& manager);
		void setup_sensor_cons();
		void read_temp_humid();
		virtual ~TempHumidSensor();

};

#endif /* TEMPHUMIDSENSOR_H_ */
