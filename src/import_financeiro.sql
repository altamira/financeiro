/****** Script do comando SelectTopNRows de SSMS  ******/
DELETE FINANCEIRO.dbo.FN_BANCOS;
DELETE FINANCEIRO.dbo.FN_CONTAS;
DELETE FINANCEIRO.dbo.FN_MOVIMENTO;

INSERT INTO
	FINANCEIRO.dbo.FN_BANCOS
SELECT *
  FROM [DBALTAMIRA].[dbo].[FN_Bancos]


INSERT INTO
	FINANCEIRO.dbo.FN_CONTAS
SELECT *
  FROM [DBALTAMIRA].[dbo].[FN_ContaCorrente]

SET IDENTITY_INSERT FINANCEIRO.dbo.FN_MOVIMENTO ON;

INSERT INTO FINANCEIRO.dbo.FN_MOVIMENTO
	(sequencia,
	banco,
	agencia,
	conta,
	data,
	cheque,
	liquidado,
	descricao,
	valor,
	operacao,
	investimento,
	lock)
SELECT 
[fnmv_Sequencia]
    ,[fnmv_Banco]
    ,[fnmv_Agencia]
    ,[fnmv_Conta]
    ,[fnmv_DataMovimento]
    ,[fnmv_NumeroCheque]
    ,[fnmv_Liquidado]
    ,[fnmv_Descricao]
    ,[fnmv_Valor]
    ,[fnmv_Operacao]
    ,[fnmv_Investimento]
    ,[fnmv_Lock]
FROM [DBALTAMIRA].[dbo].[FN_MovimentoCC]

SET IDENTITY_INSERT FINANCEIRO.dbo.FN_MOVIMENTO OFF;