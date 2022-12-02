#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <UrlEncode.h>

#define RST_PIN 22
#define SS_PIN 5

const char *ssid = "Vinicius 2.4GHz";
const char *password = "vibrafone";

struct Door
{
  int number;
  int id;
  int port;
};

Door door01 = {1, 1, 27};
Door door02 = {2, 2, 26};
Door door03 = {3, 3, 25};

Door doors[3] = {door01, door02, door03};
int ports[3] = {27, 26, 25};
int doorsArrayLength = 3;
int requestDoorDelay = 0;

MFRC522 mfrc522(SS_PIN, RST_PIN);

void setup()
{
  Serial.begin(115200);

  WiFi.begin(ssid, password);

  Serial.print("Conectando ao WiFi");

  while (WiFi.status() != WL_CONNECTED)
  {
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

  for (int port : ports)
  {
    pinMode(port, OUTPUT);
    digitalWrite(port, HIGH);
  }
}

void loop()
{
  if (requestDoorDelay == 150)
  {
    checaRequisicaoPorta();
    requestDoorDelay = 0;
  } else {
    requestDoorDelay += 1;
  }

  if (!mfrc522.PICC_IsNewCardPresent())
  {
    return;
  }

  if (!mfrc522.PICC_ReadCardSerial())
  {
    return;
  }

  Serial.print("\nUID da tag :");
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

void checaTag(String conteudoTag)
{
  if (WiFi.status() == WL_CONNECTED)
  {
    HTTPClient client;

    String tagUID = conteudoTag.substring(1);

    String encodedTag = urlEncode(tagUID);

    client.begin("https://TCC-COTUCA-BACKEND.viniciusgranado.repl.co/users/tag/" + encodedTag);

    int httpCode = client.GET();

    if (httpCode > 0)
    {
      String payload = client.getString();
      Serial.println("\nStatus code: " + String(httpCode));
      Serial.println(payload);

      char json[500];

      payload.replace(" ", "");
      payload.replace("\n", "");
      payload.trim();
      payload.toCharArray(json, 500);

      StaticJsonDocument<200> doc;
      DeserializationError err = deserializeJson(doc, json);

      JsonObject obj = doc.as<JsonObject>();

      // int userId = doc["userId"];
      // const char *userTag = doc["userTag"];
      boolean hasPackage = doc["hasPackage"];
      int packageDoors[3] = {doc["packageDoors"][0], doc["packageDoors"][1], doc["packageDoors"][2]};

      client.end();

      if (hasPackage)
      {
        abrePortas(packageDoors);
      }
    }
    else
    {
      Serial.println("Erro na requisição HTTP");
      client.end();
    }
  }
  else
  {
    Serial.println("Conexao perdida");
  }
}

void checaRequisicaoPorta()
{
    if (WiFi.status() == WL_CONNECTED)
  {
    HTTPClient client;

    client.begin("https://tcc-cotuca-backend.viniciusgranado.repl.co/doorRequest");

    int httpCode = client.GET();

    if (httpCode > 0)
    {
      String payload = client.getString();
      Serial.println("\nStatus code: " + String(httpCode));
      Serial.println(payload);

      char json[500];

      payload.replace(" ", "");
      payload.replace("\n", "");
      payload.trim();
      payload.toCharArray(json, 500);

      StaticJsonDocument<200> doc;
      DeserializationError err = deserializeJson(doc, json);

      JsonObject obj = doc.as<JsonObject>();

      int id = doc[0]["id"];
      int doorId = doc[0]["doorId"];
      int doorNumber = doc[0]["doorNumber"];

      client.end();

      if (doorId)
      {
        int porta[] = {doorId};
        abrePortas(porta);
      }
    }
    else
    {
      Serial.println("Erro na requisição HTTP");
      client.end();
    }
  }
  else
  {
    Serial.println("Conexao perdida");
  }
}

void abrePortas(int portas[])
{
  int doorsPorts[doorsArrayLength];

  for (int i = 0; i < doorsArrayLength; i++)
  {
    int doorId = portas[i];

    doorsPorts[i] = getDoorPortById(doorId);

    if (doorsPorts[i] != -1)
      openDoor(doorsPorts[i]);
  }

  delay(10000);

  for (int i = 0; i < doorsArrayLength; i++)
  {
    if (doorsPorts[i] != -1)
    {
      closeDoor(doorsPorts[i]);
    }
  }
}

void openDoor(int doorPort)
{
  digitalWrite(doorPort, LOW);
}

void closeDoor(int doorPort)
{
  digitalWrite(doorPort, HIGH);
}

int getDoorPortById(int doorId)
{
  for (int i = 0; i < doorsArrayLength; i++)
  {
    if (doors[i].id == doorId)
    {
      return doors[i].port;
    }
  }

  return -1;
}
