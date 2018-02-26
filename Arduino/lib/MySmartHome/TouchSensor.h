/*
 * TouchSensor.h
 *
 *  Created on: 2. feb. 2018
 *      Author: Stian
 */

#ifndef TOUCHSENSOR_H_
#define TOUCHSENSOR_H_

#include "MySmartHome.h"

class TouchSensor: public MySmartHome {
	public:
		TouchSensor();
		TouchSensor(PubSubClient& client, WiFiManager& manager);
		char touch_topic[5];
		int touch_value;
		void read_touch();
		virtual ~TouchSensor();
	private:
		const int _cts_pin;



};

#endif /* TOUCHSENSOR_H_ */
