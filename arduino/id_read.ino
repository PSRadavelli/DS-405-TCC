#include <SPI.h>
#include <MFRC522.h>

#define RST_PIN         22
#define SS_PIN          5
#define RELAY_PORT      27

MFRC522 mfrc522(SS_PIN, RST_PIN);

void setup() {
  Serial.begin(115200);
  SPI.begin();

  mfrc522.PCD_Init();
  mfrc522.PCD_DumpVersionToSerial();

  Serial.println("Aproxime a tag...");

  pinMode(RELAY_PORT, OUTPUT);
  digitalWrite(RELAY_PORT, LOW);
}

void loop() {
  if ( ! mfrc522.PICC_IsNewCardPresent()) {
    return;
  }

  if ( ! mfrc522.PICC_ReadCardSerial()) {
    return;
  }

  Serial.print("UID da tag :");
  String conteudo = "";
  byte letra;
  for (byte i = 0; i < mfrc522.uid.size; i++)
  {
    Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
    Serial.print(mfrc522.uid.uidByte[i], HEX);
    conteudo.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
    conteudo.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  Serial.println();
  conteudo.toUpperCase();

  if (conteudo.substring(1) == "FB 91 47 53")
  {
    Serial.println("AUTORIZADO !");
    Serial.println();
    digitalWrite(RELAY_PORT, HIGH); // ativa rele, abre a trava solenoide
    delay(3000);           // espera 3 segundos
    digitalWrite(RELAY_PORT, LOW);  // desativa rele, fecha a trava solenoide
  } else {
    delay(3000);
  }
}
