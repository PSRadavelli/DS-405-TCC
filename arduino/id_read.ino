#include <SoftwareSerial.h>

const int BUFFER_SIZE = 14;
const int DATA_SIZE = 10;
const int DATA_VERSION_SIZE = 2;
const int DATA_TAG_SIZE = 8;
const int CHECKSUM_SIZE = 2;

SoftwareSerial ssrfid = SoftwareSerial(6,8);

uint8_t buffer[BUFFER_SIZE];
int buffer_index = 0;

void setup() {
 Serial.begin(9600); 
 
 ssrfid.begin(9600);
 ssrfid.listen(); 
 
 Serial.println("INICIALIZACAO CONCLUIDA");
}

void loop() {
  if (ssrfid.available() > 0) {
    bool call_extract_tag = false;
    
    int ssvalue = ssrfid.read();
    if (ssvalue == -1) {
      return;
    }

    if (ssvalue == 2) {
      buffer_index = 0;
    } else if (ssvalue == 3) {     
      call_extract_tag = true;
    }

    if (buffer_index >= BUFFER_SIZE) {
      Serial.println("Error: Buffer overflow detected! ");
      return;
    }
    
    buffer[buffer_index++] = ssvalue;

    if (call_extract_tag == true) {
      if (buffer_index == BUFFER_SIZE) {
        unsigned tag = extract_tag();
      } else {
        buffer_index = 0;
        return;
      }
    }    
  }    
}

unsigned extract_tag() {
    uint8_t *msg_data = buffer + 1;
    uint8_t *msg_data_tag = msg_data + 2;

    long tag = hexstr_to_value(msg_data_tag, DATA_TAG_SIZE);

    Serial.println("");
    Serial.print("ID do usuario: ");
    Serial.println(tag);

    long checksum = 0;
    for (int i = 0; i < DATA_SIZE; i+= CHECKSUM_SIZE) {
      long val = hexstr_to_value(msg_data + i, CHECKSUM_SIZE);
      checksum ^= val;
    }

    Serial.println("");
    Serial.println("--------");

    return tag;
}

long hexstr_to_value(char *str, unsigned int length) {
  char* copy = malloc((sizeof(char) * length) + 1); 
  memcpy(copy, str, sizeof(char) * length);
  copy[length] = '\0'; 

  long value = strtol(copy, NULL, 16);
  free(copy);
  return value;
}
