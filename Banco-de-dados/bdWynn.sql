create database dbWynn;
drop database dbWynn;
USE dbWynn;


CREATE TABLE tbAdministrador (
	idAdministrador INT PRIMARY KEY AUTO_INCREMENT,
    nomeAdministrador VARCHAR(45),
    emailAdministrador VARCHAR(60),
    senhaAdministrador VARCHAR(60)
);

CREATE TABLE tbCategoriaRegistro (
	idCategoriaRegistro INT PRIMARY KEY AUTO_INCREMENT,
    nomeCategoria VARCHAR(45)
);

CREATE TABLE Registro (
	idRegistro INT PRIMARY KEY AUTO_INCREMENT,
    fkCategoria INT,
    fkAdministrador INT,
    CONSTRAINT fkCategoriaRegistro FOREIGN KEY (fkCategoriaRegistro) REFERENCES categoriaRegistro (idCategoriaRegistro),
    CONSTRAINT fkCategoriaRegistro FOREIGN KEY (fkCategoriaRegistro) REFERENCES tbAdministrador (idCAdministrador),
    tituloRegistro VARCHAR(60) NOT NULL,
    descricaoRegistro VARCHAR (800) NOT NULL,
    prioridadeRegistro VARCHAR(45),
    CONSTRAINT chkPrioridade CHECK (prioridadeRegistro IN ('Essencial', 'Importante', 'básico'))
);


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
	idEndereco INT AUTO_INCREMENT,
    fkEmpresa INT,
    CONSTRAINT pkEndereco PRIMARY KEY (idEndereco, fkEmpresa),
    CONSTRAINT fkEnderecoEmpresa FOREIGN KEY (fkEmpresa) REFERENCES tbEmpresa (idEmpresa),
	cep CHAR(9) NOT NULL,
    logradouro VARCHAR(80),
    bairro VARCHAR(80),
    cidade VARCHAR(80),
    uf CHAR(2),
    numero VARCHAR(4) NOT NULL,
    complemento VARCHAR (100)
);


SELECT * FROM Endereco;
SELECT * FROM tbEmpresa;
INSERT INTO tbEmpresa
      (nomeEmpresa, cnpjEmpresa, emailEmpresa, senhaEmpresa, chaveAtivacaoEmpresa, telEmpresa, autorizacaoEmpresa) 
		VALUES ('Vinicultura estreladoura',  '00200100100122', 'estreladoura@gmail.com', '123456', 'NME7OQZI', '11233445566', false);
        SELECT idEmpresa FROM tbEmpresa ORDER BY idEmpresa DESC LIMIT 1 ;
        SELECT * FROM tbEmpresa;
        SELECT * FROm Endereco;
INSERT INTO tbEmpresa (nomeEmpresa, cnpjEmpresa, emailEmpresa, senhaEmpresa, chaveAtivacaoEmpresa, telEmpresa, autorizacaoEmpresa) 
VALUES 
	('Vinícola Campestre', '98.521.909/0002-70', 'vinicolaCampestre@gmail.com', 123, 'E3DB98JK', '114940028922', false),
	('Vinícola Abreu Garcia', '10.327.131/0001-31', 'abreuGarcia@gmail.com', 123,'E4DB98JK', '114988888888', false),
	('Vinícola Aurora', '88.777.134/0001-19', 'auroraVinhos@gmail.com', 123,'E5DB98JK', '114972222222', false),
	('Vinícola Salton', '88.110.431/0001-02', 'saltonVinhos@outlook.com', 123,'E6DB98JK', '114977777777', false),
	('Vinícola Miolo', '89.627.234/0001-56', 'mioloVinhos@outlook.com', 123,'E7DB98JK', '114966666666', false);
 


-- ('95205000', 'BR-116 KM 30', 'Bairro Passo da Porteira', 'Vacaria', 'RS', '1410', default), 
-- ('88580000', 'Fazenda Nova Dela Costa', 'Alto Travessão', 'Campo Belo do Sul', 'SC', default, 'Sem número'), 
-- ('95700000', 'Rua Olavo Bilac', 'Centro', 'Bento Gonçalves', 'RS', '500', default),
-- ('95180000', 'Estrada Salton', 'Tuiuty', 'Bento Gonçalves', 'RS', '1500', default),
-- ('95700000', 'RS-444 KM 21', 'Vale dos Vinhedos', 'Bento Gonçalves', 'RS', default, 'Sem número');

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
('Macari Marcelino', 1, '1985-05-15', '11956789012', 'macari.marcelino@gmail.com', '1234', 'Gerente');





CREATE TABLE tbTipoVinho(
	idTipoVinho INT PRIMARY KEY AUTO_INCREMENT,
	nomeVinho VARCHAR(45),
	metricaTemperaturaPerigoMin DECIMAL (4,2),
	metricaTemperaturaPerigoMax DECIMAL (4,2),
	metricaTemperaturaCriticoMin DECIMAL (4,2),
	metricaTemperaturaCriticoMax DECIMAL (4,2),
	metricaCO2PerigoMin DECIMAL (4,2),
	metricaCO2PerigoMax DECIMAL (4,2),
	metricaCO2CriticoMin DECIMAL (4,2),
	metricaCO2CriticoMax DECIMAL (4,2)
);
INSERT INTO tbTipoVinho (nomeVinho, MetricaTemperatura, MetricaCO2) VALUES
();

CREATE TABLE tbTanque (
	idTanque INT PRIMARY KEY AUTO_INCREMENT,
	fkEmpresa INT NOT NULL,
    fkTipoVinho INT NOT NULL,
    statusTanque VARCHAR(45),
    CONSTRAINT chk_statusTanque CHECK (statusTanque IN('Ativo', 'Inativo')),
    CONSTRAINT fkTanque_Empresa FOREIGN KEY (fkEmpresa) REFERENCES tbEmpresa(idEmpresa),
    CONSTRAINT fkTanque_TipoVinho FOREIGN KEY (fkTipoVinho) REFERENCES tbTipoVinho(idTipoVinho)
    );

INSERT INTO tbTanque (fkEmpresa, fkTipoVinho, statusTanque) 
VALUES 
(1, 1, 'ativo'), 
(1, 1, 'ativo'), 
(2, 1, 'ativo'), 
(2, 2, 'ativo'), 
(3, 2, 'ativo'),
(3, 2, 'ativo'), 
(4, 3, 'ativo'), 
(4, 3, 'ativo'), 
(5, 4, 'ativo'), 
(5, 4, 'ativo');




CREATE TABLE tbMedida (
	idMedidaSensor INT PRIMARY KEY AUTO_INCREMENT,
    medidaLM35 DECIMAL(4,2) NOT NULL,
    mediidaMQ2 DECIMAL (4,2) NOT NULL,
    dataHoraSensor DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkTanque INT,
    CONSTRAINT fkMedidaTanque FOREIGN KEY (fkTanque) REFERENCES tbTanque(idTanque)
);

INSERT INTO tbMedida (fkSensor, medidaSensor, dataHoraSensor) 
VALUES 
 ();


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
