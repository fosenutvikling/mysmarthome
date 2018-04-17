#include <PubSubClient.h>
#include <ESP8266WiFi.h>          //https://github.com/esp8266/Arduino
//needed for library
#include <ESP8266WebServer.h>
#include <WiFiManager.h>         //https://github.com/tzapu/WiFiManager


#define GPIO2 2

#define mqtt_server ""
#define wifi_ssid ""
#define wifi_password ""
#define mqtt_username ""
#define mqtt_password ""


WiFiClient EspClient;
PubSubClient client(EspClient);

void setup_wifi() {
  WiFi.begin(wifi_ssid, wifi_password);
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

}
void reconnect() {
  //Loop until we're reconnected
  while(!client.connected()) {
    Serial.print("Attenting MQTT connection..:");
    if(client.connect("test", mqtt_username, mqtt_password)) {
      Serial.println("Connected");
      client.subscribe("relay");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}
void client_message(char* topic, byte* payload, unsigned int length){
  Serial.print("Message: ");
  Serial.print(topic);
  Serial.println();
  for (int i = 0; i < length; i++) {
    char receptor = (char)payload[i];
    Serial.print(receptor);
    if (receptor == '1'){
    digitalWrite(GPIO2, HIGH);
    }
    if (receptor == '0'){
    digitalWrite(GPIO2, LOW);
    }
  }
  Serial.println();  
}

void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(client_message);
  pinMode(GPIO2, OUTPUT);
}

void loop() {
   //Connect to the mqtt server
  if(!client.connected()){
    reconnect();
  }
  client.loop();
}
