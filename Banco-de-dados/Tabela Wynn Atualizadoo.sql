CREATE DATABASE dbWynn;
USE dbWynn;

CREATE TABLE tbEmpresa (
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nomeEmpresa VARCHAR (80) NOT NULL,
    cnpjEmpresa CHAR (19) NOT NULL,
	emailEmpresa VARCHAR (70) NOT NULL,
    telEmpresa VARCHAR(14) NOT NULL,
    cepLogradouroEmpresa VARCHAR (80) NOT NULL,
    logradouroEmpresa VARCHAR (80),
    bairroLogradouroEmpresa VARCHAR(70),
    cidadeLogradouroEmpresa VARCHAR (50),
    ufLogradouroEmpresa CHAR(2),
    numLogradouroEmpresa VARCHAR (5),
    compLogradouroEmpresa VARCHAR (150)
);

INSERT INTO tbEmpresa (nomeEmpresa, cnpjEmpresa, emailEmpresa, telEmpresa, cepLogradouroEmpresa, logradouroEmpresa, bairroLogradouroEmpresa, cidadeLogradouroEmpresa, ufLogradouroEmpresa, numLogradouroEmpresa, compLogradouroEmpresa) 
VALUES 
('Vinícola Campestre', '98.521.909/0002-70', 'vinicolaCampestre@gmail.com', '114940028922', '95205000', 'BR-116 KM 30', 'Bairro Passo da Porteira', 'Vacaria', 'RS', '1410', default), 
('Vinícola Abreu Garcia', '10.327.131/0001-31', 'abreuGarcia@gmail.com', '114988888888', '88580000', 'Fazenda Nova Dela Costa', 'Alto Travessão', 'Campo Belo do Sul', 'SC', default, 'Sem número'), 
('Vinícola Aurora', '88.777.134/0001-19', 'auroraVinhos@gmail.com', '114972222222', '95700000', 'Rua Olavo Bilac', 'Centro', 'Bento Gonçalves', 'RS', '500', default), 
('Vinícola Salton', '88.110.431/0001-02', 'saltonVinhos@outlook.com', '114977777777', '95180000', 'Estrada Salton', 'Tuiuty', 'Bento Gonçalves', 'RS', '1500', default), 
('Vinícola Miolo', '89.627.234/0001-56', 'mioloVinhos@outlook.com', '114966666666', '95700000', 'RS-444 KM 21', 'Vale dos Vinhedos', 'Bento Gonçalves', 'RS', default, 'Sem número');


CREATE TABLE tbFuncionarioEmpresa (
	idFuncionarioEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nomeFuncionarioEmpresa VARCHAR (100) NOT NULL,
    idEmpresa INT NOT NULL,
    dataNascFuncionarioEmpresa DATE,
    foneFuncionarioEmpresa VARCHAR (14),
    emailFuncionarioEmpresa VARCHAR (70) NOT NULL,
    senhaFuncionarioEmpresa VARCHAR(45) NOT NULL,
    cargoFuncionarioEmpresa VARCHAR (45),
    CONSTRAINT fkFuncionarioEmpresa_Empresa FOREIGN KEY (idEmpresa) REFERENCES tbEmpresa(idEmpresa)
);

INSERT INTO tbFuncionarioEmpresa (nomeFuncionarioEmpresa, idEmpresa, dataNascFuncionarioEmpresa, foneFuncionarioEmpresa, emailFuncionarioEmpresa, senhaFuncionarioEmpresa, cargoFuncionarioEmpresa) 
VALUES 
('Macari Marcelino', 1, '1985-05-15', '11956789012', 'macari.marcelino@gmail.com', '1234', 'Gerente'), 
('Lucas Aielo', 2, '1990-07-22', '11988776655', 'lucas.aielo@gmail.com', '1234', 'Enólogo'), 
('Gabriel Sousa', 1, '1992-10-09', '11922334455', 'gabriel.sousa@gmail.com', '1234', 'Enólogo'), 
('Ana Paula', 1, '1988-12-01', '11933445566', 'ana.paula@gmail.com', '1234', 'Vendedora'), 
('Carlos Lima', 1, '1991-03-16', '11999887766', 'carlos.lima@gmail.com', '1234', 'Assistente de Produção'),
('Fernanda Santos', 1, '1989-11-30', '11977665544', 'fernanda.santos@gmail.com', '1234', 'Assistente Administrativa'), 
('João Pereira', 2, '1986-08-14', '11956543211', 'joao.pereira@gmail.com', '1234', 'Vendedor'), 
('Renata Figueira', 2, '1993-09-18', '11933442255', 'renata.figueira@gmail.com', '1234', 'Assistente Administrativa'), 
('Patrícia Costa', 2, '1994-02-20', '11944556677', 'patricia.costa@gmail.com', '1234', 'Auxiliar de Produção'), 
('Marcelo Dias', 3, '1984-06-25', '11966554433', 'marcelo.dias@gmail.com', '1234', 'Gerente'), 
('Cláudia Medeiros', 3, '1987-04-10', '11977889900', 'claudia.medeiros@gmail.com', '1234', 'Vendedora'), 
('Rodrigo Alves', 3, '1992-01-12', '11988990011', 'rodrigo.alves@gmail.com', '1234', 'Enólogo'), 
('Mariana Martins', 4, '1985-11-23', '11933445577', 'mariana.martins@gmail.com', '1234', 'Assistente Administrativa'), 
('Eduardo Oliveira', 4, '1990-07-08', '11999887788', 'eduardo.oliveira@gmail.com', '1234', 'Auxiliar de Produção'), 
('Sofia Barros', 4, '1992-10-29', '11977665511', 'sofia.barros@gmail.com', '1234', 'Auxiliar de Produção'),
('Fernanda Lima', 5, '1991-05-17', '11999998888', 'fernanda.lima@gmail.com', '1234', 'Gerente de Projeto'), 
('Carlos Oliveira', 5, '1988-12-03', '11988887777', 'carlos.oliveira@gmail.com', '1234', 'Analista de Sistemas'), 
('Juliana Santos', 5, '1995-03-21', '11977776666', 'juliana.santos@gmail.com', '1234', 'Designer Gráfico');


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

CREATE TABLE tbControleTanque (
	idControleTanque INT PRIMARY KEY AUTO_INCREMENT,
    idEmpresa INT NOT NULL,
    idMicroControlador INT NOT NULL,
    medidaTotalMQ2 FLOAT NOT NULL,
    medidaTotalLM35 FLOAT NOT NULL,
    CONSTRAINT fkControleTanque_Empresa FOREIGN KEY (idEmpresa) REFERENCES tbEmpresa(idEmpresa),
    CONSTRAINT fkControleTanque_MicroControlador FOREIGN KEY (idMicroControlador) REFERENCES tbMicroControlador(idMicroControlador)
);

INSERT INTO tbControleTanque (idEmpresa, idMicroControlador, medidaTotalMQ2, medidaTotalLM35) 
VALUES 
(1, 1, 23.5, 28.3), 
(1, 2, 25.7, 29.1), 
(2, 3, 50.2, 30.6), 
(2, 4, 49.8, 31.2), 
(3, 5, 48.1, 27.4),
(3, 6, 47.6, 28.0), 
(4, 7, 52.3, 29.5), 
(4, 8, 53.1, 30.0), 
(5, 9, 45.9, 26.8), 
(5, 10, 46.4, 27.2);


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


CREATE TABLE tbTipoVinho(
idTipoVinho INT PRIMARY KEY AUTO_INCREMENT,
nomeVinho VARCHAR(45),
MetricaTemperatura FLOAT,
MetricaCO2 FLOAT 
);



SELECT 
    empresa.idEmpresa, 
    empresa.nomeEmpresa, 
    empresa.cnpjEmpresa, 
    funcionario.nomeFuncionarioEmpresa, 
    funcionario.emailFuncionarioEmpresa, 
    funcionario.cargoFuncionarioEmpresa, 
    microcontrolador.idMicroControlador, 
    microcontrolador.situacaoMicroControlador, 
    controletanque.medidaTotalMQ2, 
    controletanque.medidaTotalLM35, 
    sensor.idSensor, 
    sensor.tipoSensor, 
    sensor.statusSensor, 
    medidasensor.medidaSensor, 
    medidasensor.dataHoraSensor
FROM 
    tbEmpresa AS empresa
JOIN 
    tbFuncionarioEmpresa AS funcionario ON empresa.idEmpresa = funcionario.idEmpresa
JOIN 
    tbControleTanque AS controletanque ON empresa.idEmpresa = controletanque.idEmpresa
JOIN 
    tbMicroControlador AS  microcontrolador ON controletanque.idMicroControlador = microcontrolador.idMicroControlador
JOIN 
    tbSensor AS sensor ON controletanque.idControleTanque = sensor.idControleTanque
JOIN 
    tbMedidaSensor AS  medidasensor ON sensor.idSensor = medidasensor.idSensor;
    
    SELECT * FROM tbEmpresa;
SELECT * FROM tbFuncionarioEmpresa;
SELECT * FROM tbMicroControlador;
SELECT * FROM tbControleTonel;
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
