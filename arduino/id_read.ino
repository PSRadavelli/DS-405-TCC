#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

#define RST_PIN         22
#define SS_PIN          5
#define RELAY_PORT      27

const char* ssid = "Vinicius 2.4GHz";
const char* password = "vibrafone";

MFRC522 mfrc522(SS_PIN, RST_PIN);

void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password);

  Serial.print("Conectando ao WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println("\nConectado a rede WiFi");
  Serial.print("Endereço IP: ");
  Serial.println(WiFi.localIP());

  SPI.begin();

  mfrc522.PCD_Init();
  mfrc522.PCD_DumpVersionToSerial();

  Serial.println("\nAproxime a tag...");

  pinMode(RELAY_PORT, OUTPUT);
  digitalWrite(RELAY_PORT, HIGH);
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

  checaTag(conteudo);
}

void checaTag(String conteudoTag) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient client;

    String tagUID = conteudoTag.substring(1);

    client.begin("https://tcc-cotuca-backend.viniciusgranado.repl.co/users/" + tagUID);

    int httpCode = client.GET();

    if (httpCode > 0) {
      String payload = client.getString();
      Serial.println("\nStatus code: " + String(httpCode));
      Serial.println(payload);

      char json[500];

      payload.replace(" ", "");
      payload.replace("\n", "");
      payload.trim();
      payload.toCharArray(json, 500);

      Serial.println(payload);

      StaticJsonDocument<200> doc;
      DeserializationError err = deserializeJson(doc, json);

      if (err) {
        Serial.println("Error");
      } else {
        Serial.println("Success");
      }

      JsonObject obj = doc.as<JsonObject>();

      if (obj.containsKey("id")) {
        Serial.println("Contains");
      } else {
        Serial.println("Not contains");
      }

      int id = doc["id"];
      int packageId = doc["packageId"];
      const char* pkgSize = doc["size"];
      int doorNumber = doc["doorNumber"];

      Serial.println("--------------------------");
      Serial.println(String(id));
      Serial.println(String(packageId));
      Serial.println(String(pkgSize));
      Serial.println(String(doorNumber));
      Serial.println("--------------------------");

      client.end();
    } else {
      Serial.println("Erro na requisição HTTP");
    }
  } else {
    Serial.println("Conexao perdida");
  }
}
