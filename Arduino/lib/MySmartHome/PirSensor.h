/*
 * PirSensor.h
 *
 *  Created on: 2. feb. 2018
 *      Author: Stian
 */

#ifndef PIRSENSOR_H_
#define PIRSENSOR_H_

#include "MySmartHome.h"

class PirSensor: public MySmartHome {
	public:
		PirSensor();
		PirSensor(PubSubClient& client, WiFiManager& manager);
		char pir_topic[5];
		int pir_value;
		int input_pin;

		void setup_sensor_cons();
		void read_pir();

		virtual ~PirSensor();
	private:

};

#endif /* PIRSENSOR_H_ */
