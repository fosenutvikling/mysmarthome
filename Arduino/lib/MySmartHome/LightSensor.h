/*
 * LightSensor.h
 *
 *  Created on: 14. feb. 2018
 *      Author: Stian
 */

#ifndef LIGHTSENSOR_H_
#define LIGHTSENSOR_H_
#define ao_pin AO
#include "MySmartHome.h"

namespace LightSensor {

class LightSensor: public MySmartHome {
	public:
		char light_topic[5];
		int sensor_value;

		LightSensor();
		LightSensor(PubSubClient& client, WiFiManager& manager);
		virtual ~LightSensor();
		void read_light();
		void setup_sensor_cons();

	private:
};

} /* namespace LightSensor */

#endif /* LIGHTSENSOR_H_ */
