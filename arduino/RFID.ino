#include <SoftwareSerial.h>
SoftwareSerial RFID(5,4); // RX and TX

String text;
String CardNumber; 

void setup()
{
  Serial.begin(9600);
  RFID.begin(9600);
  Serial.println("Aproxime o cartao …");
}
char c;

void loop()
{
  while (RFID.available() > 0) {
    delay(5);
    c = RFID.read();
    text += c;
  }
  if (text.length() > 20)
  check();
  text = "";
}

void check()
{
  text = text.substring(1, 11);
  Serial.println("ID USUARIO : " + text);

  delay(2000);
  Serial.println(" ");
  Serial.println("Aproxime o cartao …");
}