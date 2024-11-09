CREATE DATABASE dbWynn;
USE dbWynn;


CREATE TABLE tbEmpresa (
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nomeEmpresa VARCHAR (80) NOT NULL,
    cnpjEmpresa CHAR (19) NOT NULL,
	emailEmpresa VARCHAR (70) NOT NULL UNIQUE,
    senhaEmpresa VARCHAR(50) NOT NULL,
    chaveAtivacaoEmpresa CHAR(8) NOT NULL UNIQUE,
    telEmpresa VARCHAR(14) NOT NULL,
    cepLogradouroEmpresa VARCHAR (80) NOT NULL,
    logradouroEmpresa VARCHAR (80),
    bairroLogradouroEmpresa VARCHAR(70),
    cidadeLogradouroEmpresa VARCHAR (50),
    ufLogradouroEmpresa CHAR(2),
    numLogradouroEmpresa VARCHAR (5),
    compLogradouroEmpresa VARCHAR (150)
);



INSERT INTO tbEmpresa (nomeEmpresa, cnpjEmpresa, emailEmpresa, senhaEmpresa, chaveAtivacaoEmpresa, telEmpresa, cepLogradouroEmpresa, logradouroEmpresa, bairroLogradouroEmpresa, cidadeLogradouroEmpresa, ufLogradouroEmpresa, numLogradouroEmpresa, compLogradouroEmpresa) 
VALUES 
('Vinícola SPTech', '98.521.909/0002-70', 'vinicolaSPTech@gmail.com','123','3ED7OP89', '114940028922', '95205000', 'BR-116 KM 30', 'Rua Haddock Lobo', 'Paulista', 'SP', '1410', default),
('Vinícola Campestre', '98.521.909/0002-70', 'vinicolaCampestre@gmail.com','123','6O55N1P2', '114940028922', '95205000', 'BR-116 KM 30', 'Bairro Passo da Porteira', 'Vacaria', 'RS', '1410', default), 
('Vinícola Abreu Garcia', '10.327.131/0001-31', 'abreuGarcia@gmail.com','123','4Q6K4LPA', '114988888888', '88580000', 'Fazenda Nova Dela Costa', 'Alto Travessão', 'Campo Belo do Sul', 'SC', default, 'Sem número'), 
('Vinícola Aurora', '88.777.134/0001-19', 'auroraVinhos@gmail.com','123','7NXZ8799', '114972222222', '95700000', 'Rua Olavo Bilac', 'Centro', 'Bento Gonçalves', 'RS', '500', default), 
('Vinícola Salton', '88.110.431/0001-02', 'saltonVinhos@outlook.com','123','11AL88PP', '114977777777', '95180000', 'Estrada Salton', 'Tuiuty', 'Bento Gonçalves', 'RS', '1500', default), 
('Vinícola Miolo', '89.627.234/0001-56', 'mioloVinhos@outlook.com','123','24LL66YQ', '114966666666', '95700000', 'RS-444 KM 21', 'Vale dos Vinhedos', 'Bento Gonçalves', 'RS', default, 'Sem número');





CREATE TABLE tbFuncionarioEmpresa (
	idFuncionarioEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nomeFuncionarioEmpresa VARCHAR (100) NOT NULL,
    idEmpresa INT NOT NULL,
    dataNascFuncionarioEmpresa DATE,
    foneFuncionarioEmpresa VARCHAR (14),
    emailFuncionarioEmpresa VARCHAR (70) NOT NULL UNIQUE,
    senhaFuncionarioEmpresa VARCHAR(45) NOT NULL,
    CONSTRAINT fkFuncionarioEmpresa_Empresa FOREIGN KEY (idEmpresa) REFERENCES tbEmpresa(idEmpresa)
);

INSERT INTO tbFuncionarioEmpresa (nomeFuncionarioEmpresa, idEmpresa, dataNascFuncionarioEmpresa, foneFuncionarioEmpresa, emailFuncionarioEmpresa, senhaFuncionarioEmpresa) 
VALUES 

('Gabriel Sousa', 1, '1992-10-09', '11922334455', 'gabriel.sousa@gmail.com', '1234');



CREATE TABLE tbMicroControlador (
	idMicroControlador INT PRIMARY KEY AUTO_INCREMENT,
    situacaoMicroControlador VARCHAR (45),
    CONSTRAINT chk_situacaoMicroControlador CHECK (situacaoMicroControlador IN('Ativo', 'Inativo'))
);

INSERT INTO tbMicroControlador (situacaoMicroControlador) 
VALUES 
('Ativo'), 
('Ativo'), 
('Ativo'), 
('Ativo'), 
('Ativo'),
('Ativo'), 
('Ativo'), 
('Ativo'), 
('Ativo'), 
('Ativo');

-- Colocar uma tabela com os tipos de vinho
-- Campo para configurar a temperatura e gás desejada 

CREATE TABLE tbTipoVinho(
idTipoVinho INT PRIMARY KEY AUTO_INCREMENT,
nomeVinho VARCHAR(45),
MetricaTemperaturaPerigoMaximo FLOAT,
MetricaTemperaturaPerigoMinimo FLOAT,
MetricaTemperaturaCriticoMinimo FLOAT,
MetricaTemperaturaCriticoMaximo FLOAT,
MetricaCO2PerigoMinimo FLOAT,
MetricaCO2PerigoMaximo FLOAT,
MetricaCO2CriticoMinimo FLOAT,
MetricaCO2CriticoMaximo FLOAT 
);
INSERT INTO tbTipoVinho (nomeVinho, MetricaTemperaturaPerigoMaximo, MetricaTemperaturaPerigoMinimo, MetricaTemperaturaCriticoMinimo, MetricaTemperaturaCriticoMaximo, MetricaCO2PerigoMinimo, MetricaCO2PerigoMaximo, MetricaCO2CriticoMinimo, MetricaCO2CriticoMaximo) 
VALUES 
('Vinho Tinto', 30.0 , 8.0, 5.0, 32.0, 40.0, 55.0, 35.0, 60.0),
('Vinho Branco', 26.0, 9.0, 6.0, 28.0, 38.0, 50.0, 30.0, 55.0);



CREATE TABLE tbControleTanque (
	idControleTanque INT PRIMARY KEY AUTO_INCREMENT,
    idEmpresa INT NOT NULL,
    tipoVinho VARCHAR(45) NOT NULL,
    idMicroControlador INT NOT NULL,
    medidaTotalMQ2 FLOAT NOT NULL,
    medidaTotalLM35 FLOAT NOT NULL,
    CONSTRAINT fkControleTanque_Empresa FOREIGN KEY (idEmpresa) REFERENCES tbEmpresa(idEmpresa),
    CONSTRAINT fkControleTanque_MicroControlador FOREIGN KEY (idMicroControlador) REFERENCES tbMicroControlador(idMicroControlador)
);



INSERT INTO tbControleTanque (idEmpresa, tipoVinho, idMicroControlador, medidaTotalMQ2, medidaTotalLM35) 
VALUES 
(1, 1, 1, 23.5, 28.3), 
(1, 2, 2, 25.7, 29.1), 
(2, 1, 3, 50.2, 30.6), 
(2, 2, 4, 49.8, 31.2), 
(3, 1, 5, 48.1, 27.4),
(3, 2, 6, 47.6, 28.0), 
(4, 1, 7, 52.3, 29.5), 
(4, 2, 8, 53.1, 30.0), 
(5, 1, 9, 45.9, 26.8), 
(5, 2, 10, 46.4, 27.2);


CREATE TABLE tbSensor (
	idSensor INT PRIMARY KEY AUTO_INCREMENT,
    idControleTanque INT NOT NULL,
    tipoSensor VARCHAR (45),
    statusSensor VARCHAR (45),
    CONSTRAINT chk_statusSensor CHECK (statusSensor IN('Ativo', 'Inativo')),
    CONSTRAINT chk_tipoSensor CHECK (tipoSensor IN('MQ2', 'LM35')),
    CONSTRAINT fkSensor_ControleTanque FOREIGN KEY (idControleTanque) REFERENCES tbControleTanque(idControleTanque)
);

INSERT INTO tbSensor (idControleTanque, tipoSensor, statusSensor) 
VALUES 
(1, 'MQ2', 'Ativo'), 
(1, 'LM35', 'Ativo'), 
(2, 'MQ2', 'Ativo'), 
(2, 'LM35', 'Ativo'), 
(3, 'MQ2', 'Ativo'),
(3, 'LM35', 'Ativo'), 
(4, 'MQ2', 'Ativo'), 
(4, 'LM35', 'Ativo'), 
(5, 'MQ2', 'Ativo'), 
(5, 'LM35', 'Ativo'), 
(6, 'MQ2', 'Ativo'), 
(6, 'LM35', 'Ativo'), 
(7, 'MQ2', 'Ativo'), 
(7, 'LM35', 'Ativo'), 
(8, 'MQ2', 'Ativo'), 
(8, 'LM35', 'Ativo'), 
(9, 'MQ2', 'Ativo'), 
(9, 'LM35', 'Ativo'), 
(10, 'MQ2', 'Ativo'), 
(10, 'LM35', 'Ativo');


CREATE TABLE tbMedidaSensor (
	idMedidaSensor INT PRIMARY KEY AUTO_INCREMENT,
    idSensor INT NOT NULL,
    medidaSensor FLOAT NOT NULL,
    dataHoraSensor DATETIME NOT NULL,
    CONSTRAINT fkMedidaSensor_Sensor FOREIGN KEY (idSensor) REFERENCES tbSensor(idSensor)
);

INSERT INTO tbMedidaSensor (idSensor, medidaSensor, dataHoraSensor) 
VALUES 
(1, 23.5, NOW()), 
(2, 28.3, NOW()), 
(3, 50.2, NOW()), 
(4, 30.6, NOW()), 
(5, 48.1, NOW()),
(6, 27.4, now()), 
(7, 52.3, now()), 
(8, 29.5, now()), 
(9, 45.9, now()), 
(10, 26.8, now()), 
(11, 53.1, now()), 
(12, 30.0, now()), 
(13, 47.6, now()), 
(14, 28.0, now()), 
(15, 46.4, now()), 
(16, 27.2, now()), 
(17, 49.8, now()), 
(18, 31.2, now()), 
(19, 25.7, now()), 
(20, 29.1, now());



-- Fazer o JOIN na mão 
-- Esse era apenas um teste para saber se a conexão deu certo

SELECT 
    e.idEmpresa, 
    e.nomeEmpresa, 
    e.cnpjEmpresa, 
    f.nomeFuncionarioEmpresa, 
    f.emailFuncionarioEmpresa, 
    f.cargoFuncionarioEmpresa, 
    mc.idMicroControlador, 
    mc.situacaoMicroControlador, 
    ct.medidaTotalMQ2, 
    ct.medidaTotalLM35, 
    s.idSensor, 
    s.tipoSensor, 
    s.statusSensor, 
    ms.medidaSensor, 
    ms.dataHoraSensor
FROM 
    tbEmpresa e
JOIN 
    tbFuncionarioEmpresa f ON e.idEmpresa = f.idEmpresa
JOIN 
    tbControleTanque ct ON e.idEmpresa = ct.idEmpresa
JOIN 
    tbMicroControlador mc ON ct.idMicroControlador = mc.idMicroControlador
JOIN 
    tbSensor s ON ct.idControleTanque = s.idControleTanque
JOIN 
    tbMedidaSensor ms ON s.idSensor = ms.idSensor;
    
SELECT tanque.idControleTanque AS Id,
		empresa.nomeEmpresa AS Empresa,
        tanque.tipoVinho AS 'Tipo de Vinho',
        microControlador.situacaoMicroControlador AS 'Status do Micro Controlador',
        tanque.medidaTotalLM35 AS Temperatura,
        tanque.medidaTotalMQ2 AS 'Concentração de CO2'
        FROM tbControleTanque as tanque
JOIN tbEmpresa AS empresa ON tanque.idEmpresa = empresa.idEmpresa
JOIN tbmicrocontrolador AS microControlador ON tanque.idMicroControlador = microControlador.idMicroControlador;
SELECT * FROM tbEmpresa;
SELECT * FROM tbFuncionarioEmpresa;
SELECT * FROM tbMicroControlador;
SELECT * FROM tbControleTanque;
SELECT * FROM tbSensor;
SELECT * FROM tbMedidaSensor;

-- SELECT QUE MOSTRA A MEDIDA DOS SENSORES
SELECT CASE
	WHEN idSensor IN(1, 3, 5, 7, 9, 11, 13, 15, 17, 19) THEN CONCAT('A medida do sensor de gás ', idSensor, ' é: ', medidaSensor, 'ppm' )
	WHEN idSensor IN( 2, 4, 6, 8, 10, 12, 14, 16, 18, 20) THEN CONCAT('A medida do sensor de temperatura ', idSensor, ' é: ', medidaSensor, '°') END AS 'Medida dos sensores'
FROM tbMedidaSensor ;

-- SELECT QUE MOSTRA A QUAL TONÉL O SENSOR PERTENCE
SELECT CONCAT('O sensor ', idSensor,' ' ,tipoSensor, ', pretence ao tonél ', idControleTonel, ', e o status dele está ',statusSensor) AS 'Identificação dos sensores' FROM tbSensor;

-- SELECT QUE MOSTRA A QUE EMPRESE PERTENCE O TONÉL
SELECT CONCAT('O Tonél ', idControleTonel, ' pertence a empresa ',idEmpresa, ', esá utilizando o micro controlador ', idMicroControlador, '. Volume de gás: ', medidaTotalMQ2, 'PPM', ' Temperatura: ', medidaTotalLM35, '°') AS 'Informações dos tonéis' FROM tbControleTonel;


SELECT CONCAT ('O funcionário ', nomeFuncionarioEmpresa, ', trabalha na empresa ', idEmpresa, ' com o cargo registrado de ', cargofuncionarioEmpresa) FROM tbfuncionarioempresa;


SELECT CONCAT( 'O Funcionario(a) ',nomeFuncionarioEmpresa, ' tem ', timestampdiff(YEAR, dataNascFuncionarioEmpresa, now()),' anos, e trabalha na empresa ', idEmpresa,' de ' ,cargoFuncionarioEmpresa) AS 'Apresentação dos funcionários das empresas' FROM tbFuncionarioEmpresa; 

SELECT * FROM tbEmpresa WHERE ufLogradouroEmpresa = 'RS';
SELECT * FROM tbEmpresa WHERE ufLogradouroEmpresa = 'SC';
SELECT * FROM tbEmpresa WHERE nomeEmpresa LIKE '%a';
SELECT * FROM tbEmpresa WHERE emailEmpresa LIKE '%gmail%';
SELECT * FROM tbEmpresa WHERE emailEmpresa LIKE '%outlook%';
SELECT CASE WHEN medidaTotalLM35>=30 THEN CONCAT('O tonél ', idControleTonel, ' não está com a temperatura adequada: ', medidaTotalLM35, '°') END AS 'Monitoramento de temperatura' FROM tbControleTonel;

SELECT CASE WHEN medidaTotalMQ2>=50 THEN CONCAT('O tonél ', idControleTonel, ' não está com o volume de gás adequado: ', medidaTotalMQ2, 'PPM') END AS 'Monitoramento de Gás' FROM tbControleTonel;
