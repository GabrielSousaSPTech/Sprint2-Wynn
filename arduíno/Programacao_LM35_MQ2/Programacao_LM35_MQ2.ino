const int sensor_MQ2 = A0; // Porta do Sensor MQ2
const int sensor_LM35 = A1; // Porta do Sensor LM35

const int min = 100; // Valores para conversão das informações do MQ2
const int max = 1000; // Valores para conversão das informações do MQ2
float valor_MQ2 = 0; // Variável onde iremos atribuir as informações vindas do sensor de Gás
float valor_LM35 = 0; // Variável onde iremos atribuir as informações vindas do sensor de Temperatura


void setup() {
  Serial.begin(9600); // Iniciando o Monitor Serial
}

void loop() {
  valor_MQ2 = analogRead(sensor_MQ2); // Atribuindo os valores do sensor de Gás
  valor_LM35 = analogRead(sensor_LM35); // Atribuindo os valores do sensor de Temperatura

  // Convertendo os valores do sensor de Gás para porcentagem
    float porcentagem_gas = ((float)(valor_MQ2 - min) / (max - min)) * 100;
    
  // Convertendo os valores do sensor de Temperatura para graus celsius
    float temperaturaCelsius = (valor_LM35 * 5.0 / 1023.0) / 0.01;

  // Verificando se o sensor MQ2 está funcionando corretamente
  if (porcentagem_gas < 0) {
    porcentagem_gas = 0;
  } else if (porcentagem_gas > 100) {
    porcentagem_gas = 100;
  }

  // Verificando se o sensor LM35 está funcionando corretamente
  if (temperaturaCelsius < 0){
    temperaturaCelsius = 0;
  }


  // Exibindo valores no Monitor Serial

  Serial.print(porcentagem_gas);
  Serial.print(";");
  Serial.println(temperaturaCelsius);

  
  // Determinando o tempo do loop
  delay(10000); 
}
