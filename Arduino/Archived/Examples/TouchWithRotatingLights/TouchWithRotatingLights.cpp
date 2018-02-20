#include <Arduino.h>

int in = 2;
int redPin = 7;
int greenPin = 6;
int bluePin = 5;

int counter = 0;

int state = HIGH;
int r;
int p = LOW;
long time = 0;
long debounce = 200;
void setColor(int redValue, int greenValue, int blueValue) {
  analogWrite(redPin, redValue);
  analogWrite(greenPin, greenValue);
  analogWrite(bluePin, blueValue);
}
void setup()
{
  pinMode(in, INPUT);
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
}
void loop()
{
  r = digitalRead(in);
  if (r == HIGH && p == LOW && millis() - time > debounce) {
    if (counter == 0) {
      counter = 1;
      setColor(170, 0, 255);
    }else if (counter == 1){
      counter = 2;
      setColor(255, 0, 0);
    } else if (counter == 2){
      counter = 3;
      setColor(0, 0, 255);
    } else if (counter == 3) {
      counter = 4;
      setColor(0, 255, 0);
    } else if (counter == 4) {
      counter = 5;
      setColor(255, 255, 255);
    } else{
      counter = 0;
      state = LOW;
    }
    time = millis();

  }
  p = r;
}
