# MySmartHome

This is the repository for the Bachelor MySmartHome in cooperation with Fosen Utvikling. The bachelor report can be found and downloaded [here](https://brage.bibsys.no/xmlui/bitstream/handle/11250/2561637/Fonstad_Sundhaugen_Pukstad_Fenstad%5B1%5D.pdf?sequence=1&isAllowed=y). 

## The Idea
The idea is to make a product for SmartHome technologies. The product will contain Arduino components which will communicate through WiFI to a Gateway which in this case is a Raspberry Pi 2B.
This is a beginning of a Open Source project which Fosen Utvikling themselves will create based on what this product delivers after submit.

## What does the product contain?
There are schematics in this repository on how to set up the a DHT22 Temperature/Humidity sensor using the ESP component for WiFi connection.
The code for the sensor contains code for a WiFi Manager which is used by the user to provide the sensor with parameters needed to connect to the internet and the MQTT server.

To this date the product has a working Arduino_DHT22 Temperatur&Humidity sensor which sends data through WiFI to a gateway by using the publish/subscribe pattern with MQTT server and SQLite as backend.
The gateway has scripts creating the in memory database, the listener and a script to store the data recieved into the database. This is found in Source/RaspberryPi/Python.
The gateway is ready for more sensors to be developed, but due to problems using the analog connection of sensors, the group was forced to focus on one sensor to deliver on time.
The gateway also works as a client using the Event-Driven architecture using NodeJS, Express.js and Socket.io to communicate with the webserver. The gateway works as a man in the middle by gathering
data from the sensor and then work as a client to the webserver. The code for the client is found in Source/RaspberryPi/Node.

The webserver has communication both ways set up, but the website is just a shell of what it will be. There is a planned design for the website created but due to lack of time the website will not be done
to the deliverance of this project.

Code: 
Arduino/ArduinoCode/Relay.ino
- Code for a simple demonstration on how the relay should work when recieving message to turn on or off from the gateway.

Arduino/ArduinoCode/TempSensor.ino
- Code to send temperature/humidity data from the sensor using WiFi Manager.

Arduino/productSketch/TempSensor.fzz
- Schematic on how to set up a temperatur/humidity sensor using the needed components. You will need # fritzing # to view the file.

Arduino/productSketch/relaySketch.fzz
- Schematic on how to set up a demonstration relay, which uses wifi and a led light to demonstrate how the relay should work from recieving commands from the gateway. You will need # fritzing # to view the file.

RaspberryPi/Python/initialize_DB_Tables.py
- Code to initialize the SQLite in memory database used to log the data recieved from the sensor. This has a timestamp and is used as a fail-safe in case of power and/or internet outage.

RaspberryPi/Python/mqtt_Listen_Sensor_Data.py
- Code to start a listener to lister after topics for the MQTT server. The topics data is recieved and sent as a JSON object and is stored in the SQLite database by calling the store_Sensor_Data_to_DB.py.

RaspberryPi/Python/store_Sensor_Data_to_DB.py
- Code to store data recieved from the sensor to the SQLite database. This script is called by the mqtt_Listen_Sensor_Data.py script.

RaspberryPi/Node/Client.js
- This code uses socket.io to connect as a client to the webserver. The script sends the data from the SQLite databse to the webserver to be stored in a SQL database and displayed on the website.

SmartHomeWebsite/Socket_api/socket_api.js
- Code to recieve and send data with socket.io between the client and server.

SmartHomeWebsite/Views
- Contains all the views to show on the website. This is all written in ejs(effective java script)

SmartHomeWebsite/routes
- Code routing the activity

SmartHomeWebsite/mysmarthome.sql
- The SQL database on the webserver.

MittSmartHjem/MySmartHome.sh
- This is a bash script to autoinstall all needed software and scripts for the raspberry to become a gateway. This is not yet tested due to us having only one Raspberry Pi and will not take the risk ruining it. The plan is to make the script automatically create the filesystem needed for the other scripts to run without problems. It will also download all the needed software and updates when it comes to the MQTT server and VNC service for costumer service. It does not contain the code needed to download the scrips automatially from the bitbucket, but this will be added when Fosen Utvikling makes this to an Open Source project.

## Future work
This is the beginning of a Open Source project which in turn means there is a lot to be done. There is a possibility to add more sensors like, touch, light and sound. The project has made the gateway and
webserver ready to send and recieve new sensors, but the schematics have not yet been developed.

The website is without design and there is not much else then the data output sent from the sensor to see. The planned design for the website contains functionality which would be great to add some day.
The website should contain a posibillity to add a ruleset for a relay to react upon. This is not yet implemented but it is well thought out and described in the Bachelor Report. The basic plan about
the ruleset is use the IFTTT(If This Then That..) method to choose what a relay should do when a sensor shows a certain value. This can be everything from a light turning on when a light sensor senses that the
light is a bit low, or a heat pump turns on when the temperature falls below 20C.

Furthermore more security is needed. The task we were given told us not to focus on this while developing but rather plan what should be done. This is explained in the Bachelor Report.


## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/40139628?v=4" width="100px;"/><br /><sub><b>mpukstad</b></sub>](https://github.com/mpukstad)<br />[💻](https://github.com/fosenutvikling/mysmarthome/commits?author=mpukstad "Code") [📖](https://github.com/fosenutvikling/mysmarthome/commits?author=mpukstad "Documentation") [💡](#example-mpukstad "Examples") [🚇](#infra-mpukstad "Infrastructure (Hosting, Build-Tools, etc)") | [<img src="https://avatars2.githubusercontent.com/u/40124762?v=4" width="100px;"/><br /><sub><b>sfenstad91</b></sub>](https://github.com/Sfenstad91)<br />[💻](https://github.com/fosenutvikling/mysmarthome/commits?author=Sfenstad91 "Code") [📖](https://github.com/fosenutvikling/mysmarthome/commits?author=Sfenstad91 "Documentation") [💡](#example-Sfenstad91 "Examples") [🚇](#infra-Sfenstad91 "Infrastructure (Hosting, Build-Tools, etc)") | [<img src="https://avatars2.githubusercontent.com/u/16637372?v=4" width="100px;"/><br /><sub><b>Kristian Sundhaugen</b></sub>](https://github.com/KristianSundhaugen)<br />[💻](https://github.com/fosenutvikling/mysmarthome/commits?author=KristianSundhaugen "Code") [🎨](#design-KristianSundhaugen "Design") [🚇](#infra-KristianSundhaugen "Infrastructure (Hosting, Build-Tools, etc)") | [<img src="https://avatars1.githubusercontent.com/u/32250965?v=4" width="100px;"/><br /><sub><b>totalbug92</b></sub>](https://github.com/Totalbug92)<br />[💻](https://github.com/fosenutvikling/mysmarthome/commits?author=Totalbug92 "Code") [🎨](#design-Totalbug92 "Design") |
| :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->


Martin Pukstad, Stian Fenstad, Kristian Sundhaugen og Jakob Fonstad


## License 

This project is licensed under the MIT License - see the LICENSE.md file for details