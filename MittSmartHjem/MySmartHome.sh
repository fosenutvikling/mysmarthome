#/!bin/bash
#Script to install all needed components for the MySmartHome application, this
#will include the needed downloads for the other scripts to run and the
#scripts themselves, and make them autorun.

#Scripts that will be installed are Mqtt_Listener, Mqtt_Store_to_database
#and initializing of the database IoT.db.

RED="\033[0;31m"
GREEN="\033[0;32m"
NC="\033[0m"

printf "${GREEN}Updating the Raspberry${NC}\n"
sudo apt-get update
sudo apt-get dist-upgrade

printf "${GREEN}Downloading and installing MQTT Server${NC}\n"
#sudo apt-get install mosquitto
sudo apt-get install mosquitto-clients
wget http://repo.mosquitto.org/debian/mosquitto-repo.gpg.ket
sudo apt-key add mosquitto-repo.gpg.key
cd /etc/apt/sources.list.d/
sudo wget http://repo.mosquitto.org/debian/mosquitto-wheezy.list
sudo apt-get update
sudo apt-get install mosquitto
sudo stop mosquitto
sudo mosquitto_passwd -c /etc/mosquitto/passwd mittsmarthjem

sudo echo "password_file /etc/mosquitto/passwd" >> /etc/mosquitto/mosquitto.conf
sudo echo "allow_anonymous false
mosquitto -c /etc/mosquitto/mosquitto.conf
printf "${GREEN}Creating directory for scripts${NC}\n"
cd /home/pi/
mkdir MySmartHome
cd /home/pi/MySmartHome
touch README
printf "#In this folder you should have the files mqtt_Listen_Sensor_Data\n#initialize_DB_Tables and store_Sensor_to_DB" > /home/pi/MySmartHome/README
cd /home/pi/MySmartHome/public/
touch README
printf "#In this folder (public) you will need to add the NODE file client.js" > /home/pi/MySmartHome/public/README

printf "${GREEN}Creating UniqueID(RaspberryID) file for you to fill${NC}\n"
cd /home/pi/MySmartHome/
touch RaspberryID
printf "#Add a unique ID for the raspberry using ONE word below this comment" > /home/pi/MySmartHome/RaspberryID

printf "${GREEN}Installing NodeJs${NC}\n"
cd /home/pi/
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
suo apt install -y nodejs
node -v

printf "${GREEN}Installing socket.is and express in /home/pi/MySmartHome/public${NC}\n"
cd /home/pi/MySmartHome/public
sudo npm init
sudo npm install express --save
sudo npm install socket.io --save

#
#THIS MIGHT NOT WORK, IF IT DOENS'T IT IS BECAUSE OF THE exit on YES.
#

printf "${GREEN}Almost done, now you how to do something.\nGo to MySmartHome bitbucket and into the RaspberryPi folder.\nNow get the mqtt_Listen_Sensor_Data file, the initialize_DB file, and the store_Sensor_Data_to_DB file and add them to the /home/pi/MySmartHome/ folder.\nNext you need to go into the RaspberryPi/Node folder on bitbucket and get the file client.js and\nadd it to /home/pi/MySmartHome/public folder.${NC}"
while true; do
        read -p "Have you completed your task?(Y/N)" yn
        case $yn in
                [Yy]* ) exit;;
		[Nn]* ) echo "Well do it!";;
		* ) echo "Please answer yes or no.";;
	esac
done 

printf "${GREEN}Setting up crontab on reboot${NC}"
cron -e
@reboot python /home/pi/MySmartHome/mqtt_Listen_Sensor_Data
@reboot node /home/pi/MySmartHome/public/client.js
 

printf "${GREEN}The system requires a reboot to initiate${NC}"
while true; do
	read -p "Do you wish to reboot now (Y/N)?" yn
	case $yn in
		[Yy]* ) sudo reboot; break;;
		[Nn]* ) exit;;
		* ) echo "Please answer yes or no.";;
	esac
done