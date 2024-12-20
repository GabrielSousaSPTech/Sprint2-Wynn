create database dbWynn;
-- drop database dbWynn;
USE dbWynn;

CREATE TABLE tbAdministrador (
	idAdministrador INT PRIMARY KEY AUTO_INCREMENT,
    nomeAdministrador VARCHAR(45),
    emailAdministrador VARCHAR(60),
    senhaAdministrador VARCHAR(60)
);

insert into tbAdministrador (nomeAdministrador, emailAdministrador, senhaAdministrador) value
('Andrei Scafi', 'andrei@gmail.com', MD5('123456A!'));


CREATE TABLE tbEmpresa (
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nomeEmpresa VARCHAR (80) NOT NULL,
    cnpjEmpresa CHAR (19) NOT NULL UNIQUE,
	emailEmpresa VARCHAR (70) NOT NULL UNIQUE,
    senhaEmpresa varchar(50) NOT NULL,
    chaveAtivacaoEmpresa CHAR(8) NOT NULL UNIQUE,
    telEmpresa VARCHAR(14) NOT NULL,
    autorizacaoEmpresa BOOLEAN NOT NULL
);



CREATE TABLE Endereco (
	idEndereco INT PRIMARY KEY AUTO_INCREMENT,
	cep CHAR(9) NOT NULL,
    logradouro VARCHAR(80),
    bairro VARCHAR(80),
    cidade VARCHAR(80),
    uf CHAR(2),
    numero VARCHAR(4) NOT NULL,
    complemento VARCHAR (100)
);

CREATE TABLE tbEnderecoEmpresa (
	idEmpresa INT,
    fkEmpresa INT,
    fkEndereco INT,
    PRIMARY KEY (idEmpresa, fkEmpresa, fkEndereco),
    tipoEndereco VARCHAR(45),
    CONSTRAINT chk_tipo_endereco CHECK (tipoEndereco IN('Escritório', 'Vinícola')),
    CONSTRAINT fkEmpresa FOREIGN KEY (fkEmpresa) REFERENCES tbEmpresa (idEmpresa),
    CONSTRAINT fkEndereco FOREIGN KEY (fkEndereco) REFERENCES Endereco (idEndereco)
);

SELECT * FROM tbEmpresa;
SELECT * FROM Endereco;
SELECT * FROM tbEnderecoEmpresa;


INSERT INTO tbEmpresa (nomeEmpresa, cnpjEmpresa, emailEmpresa, senhaEmpresa, chaveAtivacaoEmpresa, telEmpresa, autorizacaoEmpresa) 
VALUES 
	('Vinícola Campestre', '98.521.909/0002-70', 'vinicolaCampestre@gmail.com', MD5('Urubu@100!'), 'E3DB98JK', '114940028922', false);
 

CREATE TABLE tbFuncionario (
	idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
    nomeFuncionario VARCHAR (100) NOT NULL,
    fkEmpresa INT NOT NULL,
    dataNascFuncionario DATE,
    foneFuncionario VARCHAR (14),
    emailFuncionario VARCHAR (70) NOT NULL,
    senhaFuncionario VARCHAR(45) NOT NULL,
    cargoFuncionario VARCHAR (45),
    CONSTRAINT fkFuncionarioEmpresa_Empresa FOREIGN KEY (fkEmpresa) REFERENCES tbEmpresa(idEmpresa)
);

INSERT INTO tbFuncionario (nomeFuncionario, fkEmpresa, dataNascFuncionario, foneFuncionario, emailFuncionario, senhaFuncionario, cargoFuncionario) 
VALUES 
('Macari Marcelino', 1, '1985-05-15', '11956789012', 'macari.marcelino@gmail.com', MD5('Adsa#2024'), 'Gerente');



CREATE TABLE tbTipoVinho(
	idTipoVinho INT AUTO_INCREMENT,
    fkEmpresa INT,
    CONSTRAINT fkVinho_Empresa FOREIGN KEY (fkEmpresa) REFERENCES tbEmpresa(idEmpresa),
	CONSTRAINT pkComposta PRIMARY KEY (idTipoVinho, fkEmpresa),
	nomeVinho VARCHAR(45),
    metricaTemperaturaCriticoMin DECIMAL (4,2),
	metricaTemperaturaPerigoMin DECIMAL (4,2),
	metricaTemperaturaPerigoMax DECIMAL (4,2),
	metricaTemperaturaCriticoMax DECIMAL (4,2)
);

INSERT INTO tbTipoVinho VALUES
	(default, 1, 'Tinto', 16, 20, 30, 34),
    (default, 1, 'Branco', 8, 12, 22, 26),
    (default, 1, 'Rose', 6, 10, 20, 24),
    (default, 1, 'Frisante', 8, 12, 18, 22); 


CREATE TABLE tbTanque (
	idTanque INT PRIMARY KEY AUTO_INCREMENT,
    nomeTanque varchar(8),
	fkEmpresa INT NOT NULL,
    fkTipoVinho INT NOT NULL,
    statusTanque VARCHAR(45),
    CONSTRAINT chk_statusTanque CHECK (statusTanque IN('Ativo', 'Inativo')),
    CONSTRAINT fkTanque_Empresa FOREIGN KEY (fkEmpresa) REFERENCES tbEmpresa(idEmpresa),
    CONSTRAINT fkTanque_TipoVinho FOREIGN KEY (fkTipoVinho) REFERENCES tbTipoVinho(idTipoVinho)
    );
    
-- INSERT INTO tbTanque (fkEmpresa, fkTipoVinho, statusTanque) VALUES 


CREATE TABLE tbMedida (
	idMedidaSensor INT PRIMARY KEY AUTO_INCREMENT,
    medidaLM35 DECIMAL(4,2) NOT NULL,
    medidaMQ2 DECIMAL (4,2) NOT NULL,
    dataHoraSensor DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkTanque INT,
    CONSTRAINT fkMedidaTanque FOREIGN KEY (fkTanque) REFERENCES tbTanque(idTanque)
);


INSERT INTO tbTanque (nomeTanque,fkEmpresa, fkTipoVinho, statusTanque) 
VALUES 
('TINTO-1',1, 1, 'ativo'), 
('BRANCO-1',1, 2, 'ativo'),
('ROSE-1',1, 3, 'ativo'), 
('FRIS-1',1, 4, 'ativo')  
;



INSERT INTO tbMedida (medidaLM35, medidaMQ2,dataHoraSensor, fkTanque) VALUES  
(26.7, 50, now(), 1),
(25.7, 50, now(), 1),
(24.7, 50, now(), 1),
(20.7, 50, now(), 1),
(25.7, 50, now(), 1),
(29.7, 50, now(), 1),
(31.7, 50, now(), 1);

INSERT INTO tbMedida (medidaLM35, medidaMQ2,dataHoraSensor, fkTanque) VALUES  
(15, 50, now(), 1);



select * from tbMedida;
INSERT INTO tbMedida (medidaLM35, medidaMQ2,dataHoraSensor, fkTanque) VALUES  
(22.7, 50, now(), 2),
(21.7, 50, now(), 2),
(18.7, 60, now(), 2),
(19.7, 50, now(), 2),
(20.7, 70, now(), 2),
(21.7, 50, now(), 2),
(23.7, 50, now(), 2);

select * from tbMedida;
INSERT INTO tbMedida (medidaLM35, medidaMQ2,dataHoraSensor, fkTanque) VALUES  
(10.7, 50, now(), 3),
(11.7, 50, now(), 3),
(13.7, 60, now(), 3),
(12.7, 50, now(), 3),
(15.7, 70, now(), 3),
(17.7, 50, now(), 3),
(21.8, 50, now(), 3);

INSERT INTO tbMedida (medidaLM35, medidaMQ2, dataHoraSensor, fkTanque) VALUES  
(13.3, 40, now(), 4),
(12.5, 55, now(), 4),
(14.2, 60, now(), 4),
(16.2, 60, now(), 4),
(15.8, 45, now(), 4),
(17.8, 45, now(), 4),
(18.0, 50, now(), 4);



 SELECT medidaLM35 AS Temperatura, medidaMQ2 as co2 FROM tbMedida WHERE fkTanque = 1  ORDER BY idMedidaSensor DESC LIMIT 1;
SELECT medidaLM35, hour(dataHoraSensor) FROM tbMedida WHERE fkTanque = 1;
SELECT medidaMQ2, hour(dataHoraSensor) FROM tbMedida WHERE fkTanque = 1;

/*
SELECT fkTanque, medidaLM35 FROM tbMedida
	JOIN tbTanque as tanque ON fkTanque = idTanque
 WHERE tanque.fkEmpresa = 1 GROUP BY fkTanque ORDER BY idMedidaSensor;
 */
 
 (SELECT medidaLM35
 FROM tbMedida
	JOIN tbTanque as tanque ON fkTanque = idTanque
     WHERE tanque.fkEmpresa = 1 AND idMedidaSensor = 
     (SELECT MAX(idMedidaSensor)
		FROM tbMedida
		JOIN tbTanque as tanque ON fkTanque = idTanque
		WHERE tanque.fkEmpresa = 1));
        

SELECT
	idMedidaSensor,
	idTanque, 
	medidaLM35,
	medidaMQ2,
	metrica.metricaTemperaturaPerigoMin AS temperaturaMinPerigo,
	metrica.metricaTemperaturaPerigoMax AS temperauraPerigoMax,
	metrica.metricaTemperaturaCriticoMin AS temperaturaCriticoMin,
	metrica.metricaTemperaturaCriticoMax AS temperaturaCriticoMax,
	metrica.metricaCO2PerigoMin AS CO2PerigoMin,
	metrica.metricaCO2PerigoMax AS CO2PerigoMax,
	metrica.metricaCO2CriticoMin AS CO2CriticoMin,
	metrica.metricaCO2CriticoMax AS CO2CriticoMax
 FROM tbTanque
        JOIN tbMedida ON fkTanque = idTanque
        JOIN tbTipoVinho AS metrica ON fkTipoVInho =idTipoVinho
        WHERE fkEmpresa = 1
        GROUP BY 
        idMedidaSensor,
        idTanque,
        medidaLM35,
		medidaMQ2
        ;
        
        SELECT idTanque FROM tbTanque WHERE fkEmpresa = 1;
        SELECT * FROM tbEmpresa;
        
        SELECT * FROM tbMedida;

SELECT 
    empresa.idEmpresa, 
    empresa.nomeEmpresa, 
    empresa.cnpjEmpresa, 
    funcionario.nomeFuncionarioEmpresa, 
    funcionario.emailFuncionarioEmpresa, 
    funcionario.cargoFuncionarioEmpresa, 
    microcontrolador.idMicroControlador, 
    microcontrolador.situacaoMicroControlador, 
    sensor.idSensor, 
    sensor.tipoSensor, 
    sensor.statusSensor, 
    medidasensor.medidaSensor, 
    medidasensor.dataHoraSensor, 
    tipovinho.nomeVinho, 
    tipovinho.MetricaTemperatura, 
    tipovinho.MetricaCO2
FROM 
    tbEmpresa AS empresa
JOIN 
    tbFuncionarioEmpresa AS funcionario ON empresa.idEmpresa = funcionario.fkEmpresa
JOIN
	tbTanque AS tanque on empresa.idEmpresa = tanque.fkEmpresa
JOIN 
    tbMicroControlador AS microcontrolador ON tanque.fkMicroControlador = microcontrolador.idMicroControlador
JOIN 
    tbSensor AS sensor ON microcontrolador.idMicroControlador = sensor.fkMicroControlador
JOIN 
    tbMedidaSensor AS medidasensor ON sensor.idSensor = medidasensor.fkSensor
JOIN 
    tbTipoVinho AS tipovinho ON tanque.fkTipoVinho = tipovinho.idTipoVinho;
SELECT * FROM tbEmpresa;

SELECT
	idEmpresa,
	idTanque,
    fkTipoVinho,
    nomeVinho,
	metricaTemperaturaPerigoMin AS temperaturaMinPerigo,
	metricaTemperaturaPerigoMax AS temperauraPerigoMax,
	metricaTemperaturaCriticoMin AS temperaturaCriticoMin,
	metricaTemperaturaCriticoMax AS temperaturaCriticoMax,
	metricaCO2PerigoMin AS CO2PerigoMin,
	metricaCO2PerigoMax AS CO2PerigoMax,
	metricaCO2CriticoMin AS CO2CriticoMin,
	metricaCO2CriticoMax AS CO2CriticoMax
FROM
    tbTanque
JOIN
	tbEmpresa
    on fkEmpresa = idEmpresa
JOIN
	tbTipoVinho
    on fkTipoVinho = idTipoVinho
where
	fkEmpresa = 1;
    
SELECT
	idTanque,
    nomeVinho,
    fkEmpresa
FROM
    tbTanque
JOIN
	tbEmpresa
    on fkEmpresa = idEmpresa
JOIN
	tbTipoVinho
    on fkTipoVinho = idTipoVinho
where
	fkEmpresa = 1;

SELECT
	medidaLM35 as temperatura,
	medidaMQ2 as co2,
    dataHoraSensor as momento_grafico,
	metricaTemperaturaPerigoMin AS temperaturaMinPerigo,
	metricaTemperaturaPerigoMax AS temperauraPerigoMax,
	metricaTemperaturaCriticoMin AS temperaturaCriticoMin,
	metricaTemperaturaCriticoMax AS temperaturaCriticoMax,
	metricaCO2PerigoMin AS CO2PerigoMin,
	metricaCO2CriticoMin AS CO2CriticoMin
FROM
    tbTanque
JOIN
	tbEmpresa
    on fkEmpresa = idEmpresa
JOIN
	tbTipoVinho
    on fkTipoVinho = idTipoVinho
JOIN
	tbMedida
    on fkTanque = idTanque
where
	idTanque = 13
ORDER BY idMedidaSensor DESC LIMIT 7;

INSERT INTO tbMedida (medidaLM35, medidaMQ2,dataHoraSensor, fkTanque) VALUES  
(26.7, 80.2, now(), 1),
(25.7, 76.3, now(), 1),
(24.7, 75.4, now(), 1),
(20.7, 70.2, now(), 1),
(25.7, 74.3, now(), 1),
(29.7, 95.1, now(), 1),
(25.7, 72.2, now(), 1);

INSERT INTO tbMedida (medidaLM35, medidaMQ2,dataHoraSensor, fkTanque) VALUES  
(12.7, 70, now(), 2),
(14.7, 50, now(), 2),
(13.7, 60, now(), 2),
(13.2, 50, now(), 2),
(12.7, 70, now(), 2),
(11.7, 60, now(), 2),
(10.3, 45, now(), 2);

select * from tbMedida;
INSERT INTO tbMedida (medidaLM35, medidaMQ2,dataHoraSensor, fkTanque) VALUES  
(10.7, 50, now(), 3),
(12.7, 60, now(), 3),
(12.5, 65.2, now(), 3),
(15.7, 67.4, now(), 3),
(16.7, 70.3, now(), 3),
(22.7, 75.4, now(), 3),
(25, 80.2, now(), 3);

INSERT INTO tbMedida (medidaLM35, medidaMQ2, dataHoraSensor, fkTanque) VALUES  
(15.3, 80, now(), 4),
(14.5, 85, now(), 4),
(16.2, 80, now(), 4),
(15.2, 85, now(), 4),
(14.8, 95, now(), 4),
(16.8, 95, now(), 4),
(15.0, 96, now(), 4);