USE [master]
GO
/****** Object:  Database [FINANCEIRO]    Script Date: 20/02/2017 17:26:54 ******/
CREATE DATABASE [FINANCEIRO]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'FINANCEIRO', FILENAME = N'F:\Databases\MSSQL11.MSSQLSERVER\MSSQL\DATA\FINANCEIRO.mdf' , SIZE = 69632KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'FINANCEIRO_log', FILENAME = N'F:\Databases\MSSQL11.MSSQLSERVER\MSSQL\DATA\FINANCEIRO_log.ldf' , SIZE = 517184KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [FINANCEIRO] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [FINANCEIRO].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [FINANCEIRO] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [FINANCEIRO] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [FINANCEIRO] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [FINANCEIRO] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [FINANCEIRO] SET ARITHABORT OFF 
GO
ALTER DATABASE [FINANCEIRO] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [FINANCEIRO] SET AUTO_CREATE_STATISTICS ON 
GO
ALTER DATABASE [FINANCEIRO] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [FINANCEIRO] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [FINANCEIRO] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [FINANCEIRO] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [FINANCEIRO] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [FINANCEIRO] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [FINANCEIRO] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [FINANCEIRO] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [FINANCEIRO] SET  DISABLE_BROKER 
GO
ALTER DATABASE [FINANCEIRO] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [FINANCEIRO] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [FINANCEIRO] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [FINANCEIRO] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [FINANCEIRO] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [FINANCEIRO] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [FINANCEIRO] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [FINANCEIRO] SET RECOVERY FULL 
GO
ALTER DATABASE [FINANCEIRO] SET  MULTI_USER 
GO
ALTER DATABASE [FINANCEIRO] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [FINANCEIRO] SET DB_CHAINING OFF 
GO
ALTER DATABASE [FINANCEIRO] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [FINANCEIRO] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
USE [FINANCEIRO]
GO
/****** Object:  User [financeiro]    Script Date: 20/02/2017 17:26:54 ******/
CREATE USER [financeiro] FOR LOGIN [financeiro] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [financeiro]
GO
ALTER ROLE [db_datareader] ADD MEMBER [financeiro]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [financeiro]
GO
USE [FINANCEIRO]
GO
/****** Object:  Sequence [dbo].[ERR_LOG_SEQ]    Script Date: 20/02/2017 17:26:54 ******/
CREATE SEQUENCE [dbo].[ERR_LOG_SEQ] 
 AS [int]
 START WITH 1
 INCREMENT BY 1
 MINVALUE -2147483648
 MAXVALUE 2147483647
 CACHE 
GO
USE [FINANCEIRO]
GO
/****** Object:  Sequence [dbo].[REMESSA_SEQ]    Script Date: 20/02/2017 17:26:54 ******/
CREATE SEQUENCE [dbo].[REMESSA_SEQ] 
 AS [int]
 START WITH 1
 INCREMENT BY 1
 MINVALUE -2147483648
 MAXVALUE 2147483647
 CACHE 
GO
USE [FINANCEIRO]
GO
/****** Object:  Sequence [dbo].[RETORNO_SEQ]    Script Date: 20/02/2017 17:26:54 ******/
CREATE SEQUENCE [dbo].[RETORNO_SEQ] 
 AS [int]
 START WITH 1
 INCREMENT BY 1
 MINVALUE -2147483648
 MAXVALUE 2147483647
 CACHE 
GO
USE [FINANCEIRO]
GO
/****** Object:  Sequence [dbo].[TAREFA_NAV_SEQ]    Script Date: 20/02/2017 17:26:54 ******/
CREATE SEQUENCE [dbo].[TAREFA_NAV_SEQ] 
 AS [bigint]
 START WITH 1
 INCREMENT BY 1
 MINVALUE -9223372036854775808
 MAXVALUE 9223372036854775807
 CACHE 
GO
USE [FINANCEIRO]
GO
/****** Object:  Sequence [dbo].[TAREFA_SEQ]    Script Date: 20/02/2017 17:26:54 ******/
CREATE SEQUENCE [dbo].[TAREFA_SEQ] 
 AS [int]
 START WITH 1
 INCREMENT BY 1
 MINVALUE -2147483648
 MAXVALUE 2147483647
 CACHE 
GO
/****** Object:  UserDefinedTableType [dbo].[COBRANCA_PARCELA_TYPE]    Script Date: 20/02/2017 17:26:54 ******/
CREATE TYPE [dbo].[COBRANCA_PARCELA_TYPE] AS TABLE(
	[carteira] [int] NOT NULL,
	[nosso_numero] [int] NOT NULL,
	[parcela] [int] NOT NULL,
	[forma_pagto] [varchar](10) NOT NULL,
	[tipo_vencto] [varchar](3) NOT NULL,
	[vencto] [date] NOT NULL,
	[prazo] [int] NOT NULL,
	[valor] [money] NOT NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[COBRANCA_TYPE]    Script Date: 20/02/2017 17:26:55 ******/
CREATE TYPE [dbo].[COBRANCA_TYPE] AS TABLE(
	[carteira] [int] NOT NULL,
	[nosso_numero] [int] NOT NULL,
	[conta_contabil] [varchar](56) NOT NULL,
	[cnpj] [varchar](20) NOT NULL,
	[inscricao] [varchar](20) NULL,
	[fantasia] [varchar](50) NULL,
	[nome] [varchar](100) NULL,
	[logradouro] [varchar](5) NULL,
	[endereco] [varchar](50) NULL,
	[numero] [varchar](10) NULL,
	[complemento] [varchar](30) NULL,
	[bairro] [varchar](30) NULL,
	[municipio] [int] NULL,
	[cidade] [varchar](30) NULL,
	[cep] [varchar](9) NULL,
	[uf] [char](2) NULL,
	[ddd] [varchar](3) NULL,
	[telefone] [varchar](15) NULL,
	[contato] [varchar](20) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[ERR_LOG_TYPE]    Script Date: 20/02/2017 17:26:55 ******/
CREATE TYPE [dbo].[ERR_LOG_TYPE] AS TABLE(
	[id] [int] NOT NULL,
	[datahora] [datetime] NOT NULL,
	[erro] [int] NOT NULL,
	[nivel] [int] NULL,
	[situacao] [nchar](10) NULL,
	[procedimento] [nchar](50) NULL,
	[linha] [nchar](10) NULL,
	[mensagem] [nvarchar](max) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[EVENTO_TYPE]    Script Date: 20/02/2017 17:26:55 ******/
CREATE TYPE [dbo].[EVENTO_TYPE] AS TABLE(
	[id] [int] NOT NULL,
	[chave] [varchar](20) NOT NULL,
	[timestamp] [datetime] NOT NULL,
	[origem] [varchar](50) NOT NULL,
	[evento] [varchar](20) NOT NULL,
	[descricao] [varchar](50) NULL,
	[detalhes] [varchar](100) NULL,
	[documento] [varchar](max) NULL,
	[reconhecido] [bit] NOT NULL,
	[uid] [uniqueidentifier] NOT NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[PAGADOR_TYPE]    Script Date: 20/02/2017 17:26:55 ******/
CREATE TYPE [dbo].[PAGADOR_TYPE] AS TABLE(
	[cnpj] [varchar](20) NOT NULL,
	[inscricao] [varchar](20) NULL,
	[fantasia] [varchar](50) NULL,
	[nome] [varchar](100) NULL,
	[logradouro] [varchar](5) NULL,
	[endereco] [varchar](50) NULL,
	[numero] [varchar](10) NULL,
	[complemento] [varchar](30) NULL,
	[bairro] [varchar](30) NULL,
	[municipio] [int] NULL,
	[cidade] [varchar](30) NULL,
	[cep] [varchar](9) NULL,
	[uf] [char](2) NULL,
	[ddd] [varchar](3) NULL,
	[telefone] [varchar](15) NULL,
	[contato] [varchar](20) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[REC_PARCELA_TYPE]    Script Date: 20/02/2017 17:26:55 ******/
CREATE TYPE [dbo].[REC_PARCELA_TYPE] AS TABLE(
	[nosso_numero] [int] NOT NULL,
	[parcela] [int] NOT NULL,
	[forma_pagto] [varchar](10) NOT NULL,
	[tipo_vencto] [varchar](3) NOT NULL,
	[vencto] [date] NOT NULL,
	[prazo] [int] NOT NULL,
	[valor_produtos] [money] NOT NULL,
	[valor_ipi] [money] NOT NULL,
	[valor] [money] NOT NULL,
	[origem] [varchar](10) NOT NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[REM_PARCELA_TYPE]    Script Date: 20/02/2017 17:26:55 ******/
CREATE TYPE [dbo].[REM_PARCELA_TYPE] AS TABLE(
	[remessa] [int] NOT NULL,
	[nosso_numero] [int] NOT NULL,
	[parcela] [int] NOT NULL,
	[forma_pagto] [varchar](10) NOT NULL,
	[tipo_vencto] [varchar](3) NOT NULL,
	[vencto] [date] NOT NULL,
	[prazo] [int] NOT NULL,
	[valor] [money] NOT NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[RET_PARCELA_TYPE]    Script Date: 20/02/2017 17:26:55 ******/
CREATE TYPE [dbo].[RET_PARCELA_TYPE] AS TABLE(
	[retorno] [int] NOT NULL,
	[nosso_numero] [int] NOT NULL,
	[parcela] [int] NOT NULL,
	[forma_pagto] [varchar](10) NOT NULL,
	[tipo_vencto] [varchar](3) NOT NULL,
	[vencto] [date] NOT NULL,
	[prazo] [int] NOT NULL,
	[valor] [money] NOT NULL,
	[aceito] [bit] NOT NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[TAREFA_NAV_TYPE]    Script Date: 20/02/2017 17:26:55 ******/
CREATE TYPE [dbo].[TAREFA_NAV_TYPE] AS TABLE(
	[id] [int] NOT NULL,
	[nome] [nvarchar](100) NOT NULL,
	[titulo] [nvarchar](50) NULL,
	[descricao] [nvarchar](50) NULL,
	[detalhes] [nvarchar](100) NULL,
	[documento] [nvarchar](max) NULL,
	[atribuir] [nvarchar](50) NULL,
	[atribuido] [nvarchar](50) NULL,
	[form] [nvarchar](100) NOT NULL,
	[parametros] [nvarchar](max) NULL,
	[prazo] [datetime2](7) NULL,
	[criado] [datetime2](7) NULL,
	[concluido] [datetime2](7) NULL,
	[versao] [int] NOT NULL,
	[operacao] [varchar](10) NOT NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[TAREFA_NOTIFICACAO_TYPE]    Script Date: 20/02/2017 17:26:55 ******/
CREATE TYPE [dbo].[TAREFA_NOTIFICACAO_TYPE] AS TABLE(
	[id] [int] NOT NULL,
	[nome] [nvarchar](100) NOT NULL,
	[titulo] [nvarchar](50) NULL,
	[descricao] [nvarchar](50) NULL,
	[atribuir] [nvarchar](50) NULL,
	[form] [nvarchar](100) NOT NULL,
	[parametros] [nvarchar](max) NULL,
	[prazo] [datetime] NULL,
	[criado] [datetime] NOT NULL,
	[concluido] [datetime] NULL,
	[versao] [int] NULL,
	[topico] [nvarchar](100) NOT NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[TAREFA_TYPE]    Script Date: 20/02/2017 17:26:55 ******/
CREATE TYPE [dbo].[TAREFA_TYPE] AS TABLE(
	[id] [int] NOT NULL,
	[nome] [nvarchar](100) NOT NULL,
	[titulo] [nvarchar](50) NULL,
	[descricao] [nvarchar](50) NULL,
	[detalhes] [nvarchar](100) NULL,
	[documento] [nvarchar](max) NULL,
	[atribuir] [nvarchar](50) NULL,
	[atribuido] [nvarchar](50) NULL,
	[form] [nvarchar](100) NOT NULL,
	[parametros] [nvarchar](max) NULL,
	[prazo] [datetime2](7) NULL,
	[criado] [datetime2](7) NULL,
	[atualizado] [datetime2](7) NULL,
	[concluido] [datetime2](7) NULL,
	[versao] [int] NOT NULL
)
GO
/****** Object:  StoredProcedure [dbo].[CARREGA_PEDIDO_GPIMAC]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[CARREGA_PEDIDO_GPIMAC] 
	@NUMERO INT
AS
BEGIN
	SET NOCOUNT ON;

	-- pedidos
	SELECT
		--LTRIM(RTRIM(LPV.LPEMP))								AS empresa,
		CAST(LPV.LPPED AS INT)									AS numero,
		LPV.LPENT												AS emissao,
		LPV.Lp0SaiRed											AS entrega,
		--LTRIM(RTRIM(LPV.CCCGC))								AS cliente,
		LPV.LPPAG												AS condicao 
		--LPV.LPVEN												AS representante 
		--LPV.LpCom												AS comissao
	FROM
		GPIMAC_Altamira.dbo.LPV WITH (NOLOCK)
	WHERE
		LPV.LPPED = @NUMERO

	-- cliente
	SELECT
		LTRIM(RTRIM(CACLI.CCCGC))                               AS cnpj,
		LTRIM(RTRIM(CACLI.CCINS))                               AS inscricao,
		REPLACE(LTRIM(RTRIM(CACLI.CCFAN)), '''', '')            AS fantasia,
		REPLACE(LTRIM(RTRIM(CACLI.CCNOM)), '''', '')            AS nome,
		REPLACE(LTRIM(RTRIM(CACLI.CCLogTip0CodC)), '''', '')    AS logradouro,
		REPLACE(LTRIM(RTRIM(CACLI.CCCEN)), '''', '')            AS endereco,
		LTRIM(RTRIM(CACLI.CCCENNum))                            AS numero,
		REPLACE(LTRIM(RTRIM(CACLI.CCCENCpl)), '''', '')         AS complemento,
		LTRIM(RTRIM(CACLI.CCCBA))                               AS bairro,
		CACLI.CCCCIIBGECOD                                      AS municipio,
		LTRIM(RTRIM(CACLI.CCCCI))                               AS cidade,
		LTRIM(RTRIM(CACLI.CCCcEP))                              AS CEP,
		LTRIM(RTRIM(CACLI.CCCES))                               AS UF,
		LTRIM(RTRIM(CACLI.CCDD5))                               AS ddd,
		LTRIM(RTRIM(CACLI.CCtFO3))                              AS telefone,
		REPLACE(LTRIM(RTRIM(CACLI.CCCO1)), '''', '')            AS contato,
		LTRIM(RTRIM(CACLI.CCCL))                                AS conta_contabil
	FROM
		GPIMAC_Altamira.dbo.LPV WITH (NOLOCK) INNER JOIN 
		GPIMAC_Altamira.dbo.CACLI WITH (NOLOCK) ON LPV.CCCGC = CACLI.CCCGC 
	WHERE
		LPV.LPPED = @NUMERO

	-- representante
	SELECT
		-- representante
		LTRIM(RTRIM(CAREP.CVCOD))								AS codigo,
		LTRIM(RTRIM(CAREP.CVNOM))								AS nome,
		--LPV.LPVEN												AS representante, 
		LPV.LpCom												AS comissao
	FROM
		GPIMAC_Altamira.dbo.LPV WITH (NOLOCK) INNER JOIN 
		GPIMAC_Altamira.dbo.CAREP WITH (NOLOCK) ON LPV.LPVEN = CAREP.CVCOD 
	WHERE
		LPV.LPPED = @NUMERO

	-- totais
	SELECT
		SUM(LPVCPGPAR.LpCPg1ProVal)		AS produtos,
		SUM(LPVCPGPAR.LpCPg1ImpVal)		AS ipi,
		SUM(LPVCPGPAR.LpCPg1ParVal)		AS total

	FROM
		GPIMAC_Altamira.dbo.LPV WITH (NOLOCK) INNER JOIN 
		GPIMAC_Altamira.dbo.LPVCPGPAR ON LPV.LPPED = LPVCPGPAR.LPPED
	WHERE
		LPV.LPPED = @NUMERO
	GROUP BY 
		LPV.LPPED

	-- parcelas
	SELECT
		LPVCPGPAR.LpCPg1DtV         AS vencto,
		'VENDA'                     AS origem,
		'COBRANCA'                  AS forma_pagto,
		LPVCPGPAR.LpCPg1Tip         AS tipo_vencto,
		LPVCPGPAR.LpCpg1Par         AS parcela,
		LPVCPGPAR.LpCPg1Dias        AS prazo,
		LPVCPGPAR.LpCPg1ProIdxRed   AS porcentagem,
		LPVCPGPAR.LpCPg1ProVal      AS valor_produtos,
		LPVCPGPAR.LpCPg1ImpVal      AS valor_ipi,
		LPVCPGPAR.LpCPg1ParVal      AS valor
	FROM
	   GPIMAC_Altamira.dbo.LPV WITH (NOLOCK) INNER JOIN
	   GPIMAC_Altamira.dbo.LPVCPGPAR WITH (NOLOCK) ON LPV.LPPED = LPVCPGPAR.LPPED	   
	WHERE
		LPV.LPPED = @NUMERO
	ORDER BY 
		LPVCPGPAR.LpCpg1Par;

END



GO
/****** Object:  StoredProcedure [dbo].[CONSULTA_LANCAMENTOS]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[CONSULTA_LANCAMENTOS]
AS
BEGIN

	CREATE TABLE #REC (
	[nosso_numero] [int] NOT NULL,
	[data] [datetime2](7),
	[conta_contabil] [varchar](56) NOT NULL,
	[cnpj] [varchar](20) NOT NULL,
	[inscricao] [varchar](20) NULL,
	[fantasia] [varchar](50) NULL,
	[nome] [varchar](100) NULL,
	[logradouro] [varchar](5) NULL,
	[endereco] [varchar](50) NULL,
	[numero] [varchar](10) NULL,
	[complemento] [varchar](20) NULL,
	[bairro] [varchar](30) NULL,
	[municipio] [int] NULL,
	[cidade] [varchar](30) NULL,
	[cep] [varchar](9) NULL,
	[uf] [char](2) NULL,
	[ddd] [varchar](3) NULL,
	[telefone] [varchar](15) NULL,
	[contato] [varchar](20) NULL)

	INSERT INTO 
		#REC
	SELECT 
		TOP 50 *
	FROM
		REC
	ORDER BY
		data DESC

	SELECT * FROM #REC

	SELECT 
		REC_PED.*
	FROM
		#REC REC INNER JOIN REC_PED ON REC_PED.nosso_numero = REC.nosso_numero

	SELECT 
		REC_PAR.*
	FROM
		#REC REC INNER JOIN REC_PAR ON REC.nosso_numero = REC_PAR.nosso_numero


END
GO
/****** Object:  StoredProcedure [dbo].[ERRO_NOTIFICA]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[ERRO_NOTIFICA] 
AS
BEGIN
	DECLARE @ID INT
	DECLARE @NUMBER INT

	DECLARE @ERR_LOG ERR_LOG_TYPE

	---------------------------- CAPTURA O ERRO ----------------------------
	SET @NUMBER = ERROR_NUMBER()

	---------------------------- REGISTRA O ERRO ----------------------------
	SET @ID = NEXT VALUE FOR err_log_seq

	INSERT INTO err_log (id, erro, nivel, situacao, procedimento, linha, mensagem)
	VALUES (@ID, @NUMBER, ERROR_SEVERITY(), ERROR_STATE(), ERROR_PROCEDURE(), ERROR_LINE(), ERROR_MESSAGE())

	---------------------------- RETORNA O ERRO PARA O CLIENTE ----------------------------
	INSERT @ERR_LOG
	SELECT * FROM err_log WHERE id = @ID

	SELECT * FROM @ERR_LOG

	RETURN @NUMBER

END




GO
/****** Object:  StoredProcedure [dbo].[FN_BANCOS_LIST]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO







CREATE PROCEDURE [dbo].[FN_BANCOS_LIST]
AS
BEGIN

	SELECT DISTINCT
		id,
		codigo,
		nome
	FROM 
		FN_BANCOS
	WHERE 
		EXISTS (SELECT 1 FROM FN_CONTAS WHERE FN_BANCOS.id = FN_CONTAS.banco AND FN_CONTAS.ativo = 1)
	ORDER BY 
		codigo, nome

END









GO
/****** Object:  StoredProcedure [dbo].[FN_CONTAS_LIST]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO









CREATE PROCEDURE [dbo].[FN_CONTAS_LIST]
AS
BEGIN

	SELECT DISTINCT
		id,
		codigo,
		nome
	FROM 
		FN_BANCOS
	WHERE 
		EXISTS (SELECT 1 FROM FN_CONTAS WHERE FN_BANCOS.id = FN_CONTAS.banco AND FN_CONTAS.ativo = 1)
	ORDER BY 
		codigo, nome

	SELECT DISTINCT
		--id,
		banco, 
		agencia
	FROM 
		FN_CONTAS
	WHERE 
		LEN(agencia) > 0 AND 
		LEN(conta) > 0 AND
		ativo = 1
	ORDER BY 
		banco, agencia

	SELECT DISTINCT
		id,
		banco, 
		agencia, 
		conta,
		0 AS saldo,
		ativo
	FROM 
		FN_CONTAS
	WHERE 
		LEN(agencia) > 0 AND 
		LEN(conta) > 0 AND
		ativo = 1
	ORDER BY 
		banco, agencia, conta

END











GO
/****** Object:  StoredProcedure [dbo].[FN_LANCAMENTO_ADD]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO









CREATE procedure [dbo].[FN_LANCAMENTO_ADD] 
	@ID INT,
	@CONTA INT,
	@DATA DATE,
	@LIQUIDACAO DATE,
	@DOCUMENTO VARCHAR(50),
	@DESCRICAO VARCHAR(100),
	@VALOR MONEY,
	@OPERACAO CHAR(1),
	@LIQUIDADO BIT
AS
BEGIN
	SET NOCOUNT ON;

	----------------------------- DECLARACAO DE VARIAVEIS -----------------------------
	DECLARE @ERR INT
	DECLARE @ERR_LOG ERR_LOG_TYPE

	DECLARE @NOTIFICACAO TAREFA_NOTIFICACAO_TYPE

	DECLARE @TOPICO NVARCHAR(50)

	BEGIN TRY
		BEGIN TRANSACTION

		IF @LIQUIDADO = 1 AND @LIQUIDACAO IS NULL
		BEGIN
			SET @LIQUIDACAO = GETDATE()
		END
		
		IF @LIQUIDADO = 0 AND NOT @LIQUIDACAO IS NULL
		BEGIN
			SET @LIQUIDACAO = NULL
		END

		IF (@VALOR < 0 AND @OPERACAO = 'C') OR
			(@VALOR > 0 AND @OPERACAO = 'D')
		BEGIN
			SET @VALOR = @VALOR * -1
		END

		INSERT INTO [FINANCEIRO].[dbo].[FN_MOVIMENTO]
			(conta, data, liquidacao, documento, descricao, valor, operacao, liquidado)
		VALUES 
			(@CONTA, @DATA, @LIQUIDACAO, @DOCUMENTO, @DESCRICAO, @VALOR, @OPERACAO, @LIQUIDADO)

		SET @ID = @@IDENTITY

		SET @TOPICO = '/contacorrente/lancamento/novo'

		/************************************ CONFIRMA ALTERACOES ************************************/

		COMMIT TRANSACTION

		------------------- NOTIFICA O SUCESSO DA OPERACAO PARA O CLIENTE -------------------
		INSERT INTO @ERR_LOG (id, datahora, erro, mensagem) 
		SELECT 0, GETDATE(), erro, mensagem FROM ERR WHERE erro = 0

	END TRY
	BEGIN CATCH

		------------------------- REVERTE AS ALTERACOES -------------------------
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION

		---------------------- RETORNA O ERRO PARA O CLIENTE ----------------------
		INSERT @ERR_LOG EXEC @ERR = ERRO_NOTIFICA

	END CATCH

	------------------ RETORNA O RESULTADO DA OPERACAO ------------------
	SELECT * FROM @ERR_LOG

	---------------------- RETORNA AS NOTIFICACOES ----------------------
	SELECT 
		id, conta, data, documento, descricao, valor, operacao, liquidado, @TOPICO AS topico
	FROM 
		[FINANCEIRO].[dbo].[FN_MOVIMENTO]
	WHERE id = @ID

	---------------------- RETORNA O REGISTRO ----------------------
	SELECT  
		id, conta, data, documento, descricao, valor, operacao, liquidado
	FROM 
		[FINANCEIRO].[dbo].[FN_MOVIMENTO]
	WHERE id = @ID

	RETURN @ERR; 

END











GO
/****** Object:  StoredProcedure [dbo].[FN_LANCAMENTO_EDIT]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO










CREATE procedure [dbo].[FN_LANCAMENTO_EDIT] 
	@ID INT,
	@CONTA INT,
	@DATA DATE,
	@LIQUIDACAO DATE,
	@DOCUMENTO VARCHAR(50),
	@DESCRICAO VARCHAR(100),
	@VALOR MONEY,
	@OPERACAO CHAR(1),
	@LIQUIDADO BIT
AS
BEGIN
	SET NOCOUNT ON;

	----------------------------- DECLARACAO DE VARIAVEIS -----------------------------
	DECLARE @ERR INT
	DECLARE @ERR_LOG ERR_LOG_TYPE

	DECLARE @NOTIFICACAO TAREFA_NOTIFICACAO_TYPE

	DECLARE @TOPICO NVARCHAR(50)

	BEGIN TRY
		BEGIN TRANSACTION

		IF @LIQUIDADO = 1 AND @LIQUIDACAO IS NULL
		BEGIN
			SET @LIQUIDACAO = GETDATE()
		END
		
		IF @LIQUIDADO = 0 AND NOT @LIQUIDACAO IS NULL
		BEGIN
			SET @LIQUIDACAO = NULL
		END

		IF (@VALOR < 0 AND @OPERACAO = 'C') OR
			(@VALOR > 0 AND @OPERACAO = 'D')
		BEGIN
			SET @VALOR = @VALOR * -1
		END

		UPDATE [FINANCEIRO].[dbo].[FN_MOVIMENTO] SET
			conta = @CONTA,
			data = @DATA,
			liquidacao = @LIQUIDACAO,
			documento = @DOCUMENTO,
			descricao = @DESCRICAO,
			valor = @VALOR,
			operacao = @OPERACAO,
			liquidado = @LIQUIDADO,
			alterado = GETDATE()
		WHERE 
			id = @ID

		SET @TOPICO = '/contacorrente/lancamento/atualizado'

		/************************************ CONFIRMA ALTERACOES ************************************/

		COMMIT TRANSACTION

		------------------- NOTIFICA O SUCESSO DA OPERACAO PARA O CLIENTE -------------------
		INSERT INTO @ERR_LOG (id, datahora, erro, mensagem) 
		SELECT 0, GETDATE(), erro, mensagem FROM ERR WHERE erro = 0

	END TRY
	BEGIN CATCH

		------------------------- REVERTE AS ALTERACOES -------------------------
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION

		---------------------- RETORNA O ERRO PARA O CLIENTE ----------------------
		INSERT @ERR_LOG EXEC @ERR = ERRO_NOTIFICA

	END CATCH

	------------------ RETORNA O RESULTADO DA OPERACAO ------------------
	SELECT * FROM @ERR_LOG

	---------------------- RETORNA AS NOTIFICACOES ----------------------
	SELECT 
		id, conta, data, documento, descricao, valor, operacao, liquidado, @TOPICO AS topico
	FROM 
		[FINANCEIRO].[dbo].[FN_MOVIMENTO]
	WHERE id = @ID

	---------------------- RETORNA O REGISTRO ----------------------
	SELECT  
		id, conta, data, documento, descricao, valor, operacao, liquidado
	FROM 
		[FINANCEIRO].[dbo].[FN_MOVIMENTO]
	WHERE id = @ID

	RETURN @ERR; 

END












GO
/****** Object:  StoredProcedure [dbo].[FN_LANCAMENTO_LIQUIDAR]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[FN_LANCAMENTO_LIQUIDAR]
	@ID INT,
	@LIQUIDADO BIT
AS
BEGIN
	SET NOCOUNT ON;

	----------------------------- DECLARACAO DE VARIAVEIS -----------------------------
	DECLARE @ERR INT
	DECLARE @ERR_LOG ERR_LOG_TYPE

	DECLARE @NOTIFICACAO TAREFA_NOTIFICACAO_TYPE

	DECLARE @TOPICO NVARCHAR(50)

	BEGIN TRY
		BEGIN TRANSACTION

		UPDATE 
			FN_MOVIMENTO
		SET
			liquidacao = GETDATE(),
			liquidado = @LIQUIDADO,
			alterado = GETDATE()
		FROM
			FN_MOVIMENTO
		WHERE
			id = @ID AND
			liquidado <> @LIQUIDADO

		SET @TOPICO = '/contacorrente/lancamento/liquidado/'

		/************************************ CONFIRMA ALTERACOES ************************************/

		COMMIT TRANSACTION

		------------------- NOTIFICA O SUCESSO DA OPERACAO PARA O CLIENTE -------------------
		INSERT INTO @ERR_LOG (id, datahora, erro, mensagem) 
		SELECT 0, GETDATE(), erro, mensagem FROM ERR WHERE erro = 0

	END TRY
	BEGIN CATCH

		------------------------- REVERTE AS ALTERACOES -------------------------
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION

		---------------------- RETORNA O ERRO PARA O CLIENTE ----------------------
		INSERT @ERR_LOG EXEC @ERR = ERRO_NOTIFICA

	END CATCH

	------------------ RETORNA O RESULTADO DA OPERACAO ------------------
	SELECT * FROM @ERR_LOG

	---------------------- RETORNA AS NOTIFICACOES ----------------------
	SELECT 
		id, conta, data, documento, descricao, valor, operacao, liquidado, @TOPICO AS topico
	FROM 
		[FINANCEIRO].[dbo].[FN_MOVIMENTO]
	WHERE id = @ID

	---------------------- RETORNA O REGISTRO ----------------------
	SELECT  
		id, conta, data, documento, descricao, valor, operacao, liquidado
	FROM 
		[FINANCEIRO].[dbo].[FN_MOVIMENTO]
	WHERE id = @ID

	RETURN @ERR; 

END







GO
/****** Object:  StoredProcedure [dbo].[FN_LANCAMENTO_REMOVE]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





CREATE PROCEDURE [dbo].[FN_LANCAMENTO_REMOVE]
	@ID INT
AS
BEGIN
	SET NOCOUNT ON;

	----------------------------- DECLARACAO DE VARIAVEIS -----------------------------
	DECLARE @ERR INT
	DECLARE @ERR_LOG ERR_LOG_TYPE

	DECLARE @NOTIFICACAO TAREFA_NOTIFICACAO_TYPE

	DECLARE @TOPICO NVARCHAR(50)

	CREATE TABLE #MOVIMENTO (
		[id] [int] NOT NULL,
		[conta] [int] NOT NULL,
		[data] [date] NOT NULL,
		[liquidacao] [date] NULL,
		[documento] [varchar](50) NULL,
		[descricao] [varchar](100) NOT NULL,
		[valor] [money] NOT NULL,
		[operacao] [char](1) NOT NULL,
		[liquidado] [bit] NOT NULL,
		[observacao] [nvarchar](MAX) NULL,
		[criado] [datetime2](7) NOT NULL,
		[alterado] [datetime2](7) NULL
	)

	BEGIN TRY
		BEGIN TRANSACTION

		INSERT INTO #MOVIMENTO
		SELECT * FROM FN_MOVIMENTO WHERE ID = @ID

		DELETE 
			FN_MOVIMENTO
		WHERE
			id = @ID

		SET @TOPICO = '/contacorrente/lancamento/excluido/'

		/************************************ CONFIRMA ALTERACOES ************************************/

		COMMIT TRANSACTION

		------------------- NOTIFICA O SUCESSO DA OPERACAO PARA O CLIENTE -------------------
		INSERT INTO @ERR_LOG (id, datahora, erro, mensagem) 
		SELECT 0, GETDATE(), erro, mensagem FROM ERR WHERE erro = 0

	END TRY
	BEGIN CATCH

		------------------------- REVERTE AS ALTERACOES -------------------------
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION

		---------------------- RETORNA O ERRO PARA O CLIENTE ----------------------
		INSERT @ERR_LOG EXEC @ERR = ERRO_NOTIFICA

	END CATCH

	------------------ RETORNA O RESULTADO DA OPERACAO ------------------
	SELECT * FROM @ERR_LOG

	---------------------- RETORNA AS NOTIFICACOES ----------------------
	SELECT 
		id, conta, data, documento, descricao, valor, operacao, liquidado, @TOPICO AS topico
	FROM 
		#MOVIMENTO
	WHERE id = @ID

	SELECT 
		id, conta, data, documento, descricao, valor, operacao, liquidado
	FROM 
		#MOVIMENTO
	WHERE id = @ID

	RETURN @ERR; 

END










GO
/****** Object:  StoredProcedure [dbo].[FN_LANCAMENTOS_A_CONFERIR]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO












CREATE PROCEDURE [dbo].[FN_LANCAMENTOS_A_CONFERIR]
	@CONTA		INT
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRANSACTION

	SELECT 
		0 AS id, 
		@CONTA AS conta, 
		GETDATE() AS data,
		GETDATE() AS liquidacao, 
		'' AS documento, 
		1 AS liquidado, 
		'SALDO ANTERIOR' AS descricao, 
		SUM(valor) AS valor, 
		CASE WHEN SUM(valor) < 0 THEN 'D' ELSE 'C' END AS operacao
	FROM
		FN_MOVIMENTO
	WHERE 
		conta = @CONTA AND
		liquidado = 1
	UNION		
	SELECT  
		[id],
		[conta],
		[data],
		[liquidacao],
		[documento],
		[liquidado],
		[descricao],
		[valor],
		[operacao]
	FROM 
		FN_MOVIMENTO
	WHERE 
		conta = @CONTA AND
		liquidado = 0
	ORDER BY
		data, liquidacao 

	COMMIT TRANSACTION
END













GO
/****** Object:  StoredProcedure [dbo].[FN_LANCAMENTOS_LIQUIDADOS]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO











CREATE PROCEDURE [dbo].[FN_LANCAMENTOS_LIQUIDADOS]
	@CONTA		INT
AS
BEGIN
	SET NOCOUNT ON;

	SELECT TOP 500 
		[id],
		[conta],
		[data],
		[liquidacao],
		[documento],
		[liquidado],
		[descricao],
		[valor],
		[operacao]
	FROM 
		FN_MOVIMENTO
	WHERE 
		conta = @CONTA AND
		liquidado = 1 AND
		liquidacao >= DATEADD(month, -6, GETDATE())
	ORDER BY
		liquidacao DESC, data DESC 

END













GO
/****** Object:  StoredProcedure [dbo].[IMPORT_PEDIDOS_LIBERADOS]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






CREATE PROCEDURE [dbo].[IMPORT_PEDIDOS_LIBERADOS] AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @ERR INT
	DECLARE @ERR_LOG ERR_LOG_TYPE

	DECLARE @EVENTOS EVENTO_TYPE
	DECLARE @TAREFAS TAREFA_TYPE
	DECLARE @TAREFAS_NOTIFICACAO TAREFA_NOTIFICACAO_TYPE

	BEGIN TRY

		BEGIN TRANSACTION

		-- eventos
		INSERT INTO 
			@EVENTOS
		SELECT EVT.*
		FROM
			GPIMAC_Altamira.dbo.INTEGRACAO_EVENTO EVT WITH (NOLOCK)
		WHERE
		   EVT.evento = 'PEDIDO_LIBERADO' AND 
		   EVT.reconhecido = 0

		INSERT INTO @TAREFAS
		   (id, nome, titulo, descricao, documento, atribuir, form, versao)
		SELECT 
		   NEXT VALUE FOR tarefa_seq, 'Pedido Liberado', descricao, detalhes, documento, 'faturamento', '/recebiveis/lancamento/', 0
		FROM 
			@EVENTOS

		INSERT INTO TRF 
			(id, nome, titulo, descricao, detalhes, documento, atribuir, atribuido, form,
			parametros, prazo, criado, atualizado, concluido)
		SELECT 
			id, nome, titulo, descricao, detalhes, documento, atribuir, atribuido, form,
			parametros, prazo, GETDATE(), atualizado, concluido
		FROM @TAREFAS 

		INSERT INTO @TAREFAS_NOTIFICACAO
		   (id, nome, titulo, descricao, atribuir, form, parametros, prazo, criado, topico)
		SELECT 
			id, nome, titulo, descricao, atribuir, form, parametros, prazo, GETDATE(), '/tarefas/nova/' + atribuir
		FROM @TAREFAS

		UPDATE EVT
			SET EVT.reconhecido = 1
		FROM 
			GPIMAC_Altamira.dbo.INTEGRACAO_EVENTO EVT INNER JOIN @EVENTOS ENT ON EVT.id = ENT.id

		COMMIT TRANSACTION

		------------------- NOTIFICA O SUCESSO DA OPERACAO PARA O CLIENTE -------------------
		INSERT INTO @ERR_LOG (id, datahora, erro, mensagem) 
		SELECT 0, GETDATE(), erro, mensagem FROM ERR WHERE erro = 0

		------------------ RETORNA O RESULTADO DA OPERACAO ------------------
		SELECT * FROM @ERR_LOG

		---------------------- RETORNA AS NOTIFICACOES ----------------------
		SELECT * FROM @TAREFAS_NOTIFICACAO

		------------------ RETORNA EVENTOS ------------------
		SELECT * FROM @EVENTOS

	END TRY
	BEGIN CATCH

		------------------------- REVERTE AS ALTERACOES -------------------------
		--IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION

		---------------------- RETORNA O ERRO PARA O CLIENTE ----------------------
		INSERT @ERR_LOG EXEC @ERR = ERRO_NOTIFICA

		SELECT * FROM @ERR_LOG

	END CATCH

	RETURN @ERR; 

END







GO
/****** Object:  StoredProcedure [dbo].[LANCAMENTO_COBRANCA]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO














CREATE PROCEDURE [dbo].[LANCAMENTO_COBRANCA]

	@CARTEIRA INT,

	@COBRANCA COBRANCA_TYPE READONLY,

	@PARCELAS COBRANCA_PARCELA_TYPE READONLY,

	@TAREFAS TAREFA_NAV_TYPE READONLY

AS
BEGIN
	SET NOCOUNT ON;

	----------------------------- DECLARACAO DE VARIAVEIS -----------------------------
	DECLARE @ERR INT
	DECLARE @ERR_LOG ERR_LOG_TYPE

	DECLARE @NOTIFICACAO TAREFA_NOTIFICACAO_TYPE

	BEGIN TRY

		BEGIN TRANSACTION

		/************************************************************************************
		*                         INICIO DA TRANSACAO DE COBRANCA
		************************************************************************************/
		INSERT INTO COB 
			(carteira, nosso_numero, conta_contabil, cnpj, inscricao, fantasia, nome, logradouro, endereco, numero, complemento, bairro, municipio, cidade, cep, uf, ddd, telefone, contato)
		SELECT 
			carteira, nosso_numero, conta_contabil, cnpj, inscricao, fantasia, nome, logradouro, endereco, numero, complemento, bairro, municipio, cidade, cep, uf, ddd, telefone, contato	
		FROM @COBRANCA
    
		---------------------------------------------------- GRAVA PARCELAS ----------------------------------------------------
		/*IF EXISTS(SELECT NOSSO_NUMERO FROM COB_PAR WHERE carteira = @CARTEIRA AND nosso_numero = @NOSSO_NUMERO AND parcela = @PARCELA)
		BEGIN
    
		   ROLLBACK TRANSACTION
    
		   INSERT INTO ERR_LOG (erro, mensagem) 
		   SELECT erro, mensagem FROM ERR WHERE erro = 1123
		   
		   SELECT * FROM ERR WHERE erro = 1123
    
		   RETURN 1123
		END*/
    
		INSERT INTO COB_PAR
		SELECT * FROM @PARCELAS

		UPDATE CRT SET
		   remessa = remessa + (SELECT SUM(valor) FROM @PARCELAS)
		WHERE id = @CARTEIRA

		/*****************************************************************************************
		*                                   ATUALIZA TAREFAS
		*****************************************************************************************/
		DECLARE @TAREFA INT
		DECLARE @VERSAO INT

		SELECT TOP 1 @TAREFA = id, @VERSAO = versao FROM @TAREFAS WHERE operacao = 'CONCLUIR'

		INSERT @NOTIFICACAO EXEC TAREFA_CONCLUIR @TAREFA, @VERSAO

		----------------------------- CRIAR OU ATUALIZAR A PROXIMA TAREFA -----------------------------
		IF EXISTS (SELECT TOP 1 nome FROM @TAREFAS WHERE operacao = 'REPETIR')
		BEGIN
			DECLARE @DESCRICAO NVARCHAR(50)
			DECLARE @DOCUMENTO NVARCHAR(MAX)

			DECLARE @ATUALIZA TAREFA_TYPE

			INSERT INTO @ATUALIZA
				(id, nome, titulo, descricao, detalhes, documento, atribuir, atribuido, form, parametros, prazo, criado, concluido,	versao)
			SELECT TOP 1 
				id, nome, titulo, descricao, detalhes, documento, atribuir, atribuido, form, parametros, prazo, criado, concluido,	versao
			FROM TRF WHERE id = @TAREFA

			SELECT TOP 1 @DESCRICAO = descricao, @DOCUMENTO = documento FROM @TAREFAS WHERE operacao = 'REPETIR'

			UPDATE @ATUALIZA SET
				descricao = @DESCRICAO,
				documento = @DOCUMENTO

			INSERT @NOTIFICACAO EXEC TAREFA_REPETIR @ATUALIZA
		END

		DECLARE @PROXIMA TAREFA_TYPE

		INSERT INTO @PROXIMA 
			(id, nome, titulo, descricao, detalhes, documento, atribuir, atribuido, form, parametros, prazo, criado, concluido, versao)
		SELECT TOP 1 
			id, nome, titulo, descricao, detalhes, documento, atribuir, atribuido, form, parametros, prazo, criado, concluido, versao
		FROM @TAREFAS WHERE operacao = 'PROXIMA'

		INSERT @NOTIFICACAO EXEC TAREFA_INCLUIR @PROXIMA

		/************************************ CONFIRMA ALTERACOES ************************************/

		COMMIT TRANSACTION

		------------------- NOTIFICA O SUCESSO DA OPERACAO PARA O CLIENTE -------------------
		INSERT INTO @ERR_LOG (id, datahora, erro, mensagem) 
		SELECT 0, GETDATE(), erro, mensagem FROM ERR WHERE erro = 0

	END TRY
	BEGIN CATCH

		------------------------- REVERTE AS ALTERACOES -------------------------
		--IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION

		---------------------- RETORNA O ERRO PARA O CLIENTE ----------------------
		INSERT @ERR_LOG EXEC @ERR = ERRO_NOTIFICA

	END CATCH

	------------------ RETORNA O RESULTADO DA OPERACAO ------------------
	SELECT * FROM @ERR_LOG

	---------------------- RETORNA AS NOTIFICACOES ----------------------
	SELECT * FROM @NOTIFICACAO

	RETURN @ERR; 

END


























GO
/****** Object:  StoredProcedure [dbo].[LANCAMENTO_CONTAS_RECEBER]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO















CREATE PROCEDURE [dbo].[LANCAMENTO_CONTAS_RECEBER]

	-- Remessa
	@NOSSO_NUMERO INT,

	-- Pedido
	@PEDIDO INT,
	@EMISSAO DATETIME2,
	@ENTREGA DATETIME2,
	@CONDICAO VARCHAR(3),

	-- Cliente
	@CONTA_CONTABIL VARCHAR(20),
	@CNPJ VARCHAR(20),
	@INSCRICAO VARCHAR(12),
	@FANTASIA VARCHAR(30),
	@NOME VARCHAR(100),
	@LOGRADOURO VARCHAR(5),
	@ENDERECO VARCHAR(50),
	@NUMERO VARCHAR(10),
	@COMPLEMENTO VARCHAR(20),
	@BAIRRO VARCHAR(30),
	@MUNICIPIO INT,
	@CIDADE VARCHAR(30),
	@CEP CHAR(9),
	@UF CHAR(2),
	@DDD VARCHAR(3),
	@TELEFONE VARCHAR(15),
	@CONTATO VARCHAR(20),

	-- Representante
	@REPRESENTANTE_CODIGO CHAR(3),
	@REPRESENTANTE_NOME VARCHAR(50),
	@REPRESENTANTE_COMISSAO DECIMAL(18,2),

	@PARCELAS REC_PARCELA_TYPE READONLY,

	@TAREFAS TAREFA_NAV_TYPE READONLY

AS
BEGIN
	SET NOCOUNT ON;

	----------------------------- DECLARACAO DE VARIAVEIS -----------------------------
	DECLARE @ERR INT
	DECLARE @ERR_LOG ERR_LOG_TYPE

	DECLARE @NOTIFICACAO TAREFA_NOTIFICACAO_TYPE

	BEGIN TRY

		BEGIN TRANSACTION

		/************************************************************************************
		*               CONTAS A RECEBER: VALIDACAO DE DADOS DA TRANSACAO 
		************************************************************************************/
		DECLARE @ERRO INT
		DECLARE @MENSAGEM NVARCHAR(100)

		IF @NOSSO_NUMERO = 0
		BEGIN
			SELECT @ERRO = erro, @MENSAGEM = mensagem FROM ERR WHERE erro = 51234;

			THROW @ERRO, @MENSAGEM, 1;
		END

		IF EXISTS(SELECT NOSSO_NUMERO FROM REC WHERE nosso_numero = @NOSSO_NUMERO)
		BEGIN
			SELECT @ERRO = erro, @MENSAGEM = mensagem FROM ERR WHERE erro = 51235;

			THROW @ERRO, @MENSAGEM, 1;
		END

		-------------------------------- GRAVA RECEBIMENTO --------------------------------

		IF NOT EXISTS(SELECT TOP 1 cnpj FROM EMP WHERE cnpj = @CNPJ)
		BEGIN
			INSERT INTO EMP
				(cnpj, inscricao, fantasia, nome, logradouro, endereco, numero, complemento, bairro, municipio, cidade, cep, uf, ddd, telefone, contato)
			VALUES 
				(@CNPJ, @INSCRICAO, @FANTASIA, @NOME, @LOGRADOURO, @ENDERECO, @NUMERO, @COMPLEMENTO, @BAIRRO, @MUNICIPIO, @CIDADE, @CEP, @UF, @DDD, @TELEFONE, @CONTATO)
		END
		ELSE
		BEGIN
			UPDATE EMP SET
				inscricao = @INSCRICAO, 
				fantasia = @FANTASIA, 
				nome = @NOME, 
				logradouro = @LOGRADOURO, 
				endereco = @ENDERECO, 
				numero = @NUMERO, 
				complemento = @COMPLEMENTO, 
				bairro = @BAIRRO, 
				municipio = @MUNICIPIO, 
				cidade = @CIDADE, 
				cep = @CEP, 
				uf = @UF, 
				ddd = @DDD, 
				telefone = @TELEFONE, 
				contato = @CONTATO
			WHERE
				cnpj = @CNPJ
		END

		INSERT INTO REC 
			(nosso_numero, conta_contabil, cnpj, inscricao, fantasia, nome, logradouro, endereco, numero, complemento, bairro, municipio, cidade, cep, uf, ddd, telefone, contato)
		VALUES 
			(@NOSSO_NUMERO, @CONTA_CONTABIL, @CNPJ, @INSCRICAO, @FANTASIA, @NOME, @LOGRADOURO, @ENDERECO, @NUMERO, @COMPLEMENTO, @BAIRRO, @MUNICIPIO, @CIDADE, @CEP, @UF, @DDD, @TELEFONE, @CONTATO)

		INSERT INTO REC_PED (nosso_numero, numero, emissao, entrega, condicao) VALUES (@NOSSO_NUMERO, @PEDIDO, @EMISSAO, @ENTREGA, @CONDICAO)

		----------------------------------------- GRAVA PARCELAS --------------------------------------------

		INSERT INTO REC_REP 
			(nosso_numero, codigo, nome, comissao)
		VALUES 
			(@NOSSO_NUMERO, @REPRESENTANTE_CODIGO, @REPRESENTANTE_NOME, @REPRESENTANTE_COMISSAO)

		----------------------------------------- GRAVA PARCELAS --------------------------------------------

		INSERT INTO REC_PAR 
			(nosso_numero, parcela, forma_pagto, tipo_vencto, vencto, prazo, valor_produtos, valor_ipi, valor, origem)
		SELECT 
			nosso_numero, parcela, forma_pagto, tipo_vencto, vencto, prazo, valor_produtos, valor_ipi, valor, origem 
		FROM @PARCELAS

		/*****************************************************************************************
		*                                   ATUALIZA TAREFAS
		*****************************************************************************************/
		DECLARE @TAREFA INT
		DECLARE @VERSAO INT

		SELECT TOP 1 @TAREFA = id, @VERSAO = versao FROM @TAREFAS WHERE operacao = 'CONCLUIR'

		INSERT @NOTIFICACAO EXEC TAREFA_CONCLUIR @TAREFA, @VERSAO

		----------------------------- CRIAR OU ATUALIZAR A PROXIMA TAREFA -----------------------------
		/*DECLARE @ATUALIZA TAREFA_TYPE

		INSERT INTO @ATUALIZA
		SELECT TOP 1 id, nome, titulo, descricao, detalhes, documento, atribuir, atribuido, form, parametros, prazo, criado, concluido,	versao
		FROM TRF WHERE nome = (SELECT TOP 1 nome FROM @TAREFAS WHERE operacao = 'PROXIMA') AND concluido IS NULL

		IF NOT EXISTS (SELECT * FROM @ATUALIZA)
		BEGIN*/
			DECLARE @PROXIMA TAREFA_TYPE

			INSERT INTO @PROXIMA 
				(id, nome, titulo, descricao, detalhes, documento, atribuir, atribuido, form, parametros, prazo, criado, concluido, versao)
			SELECT TOP 1 id, nome, titulo, descricao, detalhes, documento, atribuir, atribuido, form, parametros, prazo, criado, concluido, versao
			FROM @TAREFAS WHERE operacao = 'PROXIMA'

			INSERT @NOTIFICACAO EXEC TAREFA_INCLUIR @PROXIMA
		/*END
		ELSE
		BEGIN
			DECLARE @DESCRICAO NVARCHAR(50)
			DECLARE @DOCUMENTO NVARCHAR(MAX)

			SELECT TOP 1 @DESCRICAO = descricao, @DOCUMENTO = documento FROM @TAREFAS WHERE operacao = 'PROXIMA'

			UPDATE @ATUALIZA SET
				descricao = @DESCRICAO,
				documento = @DOCUMENTO

			INSERT @NOTIFICACAO EXEC TAREFA_ATUALIZAR @ATUALIZA
		END*/

		/************************************ CONFIRMA ALTERACOES ************************************/

		COMMIT TRANSACTION

		------------------- NOTIFICA O SUCESSO DA OPERACAO PARA O CLIENTE -------------------
		INSERT INTO @ERR_LOG (id, datahora, erro, mensagem) 
		SELECT 0, GETDATE(), erro, mensagem FROM ERR WHERE erro = 0

		------------------ RETORNA O RESULTADO DA OPERACAO ------------------
		SELECT * FROM @ERR_LOG

		---------------------- RETORNA AS NOTIFICACOES ----------------------
		SELECT * FROM @NOTIFICACAO

	END TRY
	BEGIN CATCH

		------------------------- REVERTE AS ALTERACOES -------------------------
		--IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION

		---------------------- RETORNA O ERRO PARA O CLIENTE ----------------------
		INSERT @ERR_LOG EXEC @ERR = ERRO_NOTIFICA

		SELECT * FROM @ERR_LOG

	END CATCH

	RETURN @ERR; 

END















GO
/****** Object:  StoredProcedure [dbo].[LANCAMENTO_REMESSA]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

















CREATE PROCEDURE [dbo].[LANCAMENTO_REMESSA]

	@CARTEIRA INT,

	@VALOR_TITULOS MONEY,
	@VALOR_LIQUIDO MONEY,
	@VALOR_OPERACAO MONEY,
	@VALOR_TARIFA MONEY,
	@VALOR_IOF MONEY,
	@VALOR_JUROS MONEY,
	@TAXA_JUROS MONEY,

	@PAGADORES PAGADOR_TYPE READONLY,

	@PARCELAS REM_PARCELA_TYPE READONLY,

	@TAREFAS TAREFA_NAV_TYPE READONLY

AS
BEGIN
	SET NOCOUNT ON;

	----------------------------- DECLARACAO DE VARIAVEIS -----------------------------
	DECLARE @ERR INT
	DECLARE @ERR_LOG ERR_LOG_TYPE

	DECLARE @NOTIFICACAO TAREFA_NOTIFICACAO_TYPE

	BEGIN TRY

		BEGIN TRANSACTION

		/************************************************************************************
		*                         INICIO DA TRANSACAO DE COBRANCA
		************************************************************************************/
		DECLARE @REMESSA INT

		SET @REMESSA = NEXT VALUE FOR remessa_seq

		---------------------------------------------------- cabecalho da remessa ----------------------------------------------------

		INSERT INTO REM (
			remessa,
			carteira,
			valor_titulos,
			valor_liquido,
			valor_operacao,
			valor_tarifa,
			valor_iof,
			valor_juros,
			taxa_juros)
		VALUES (
			@REMESSA,
			@CARTEIRA,
			@VALOR_TITULOS,
			@VALOR_LIQUIDO,
			@VALOR_OPERACAO,
			@VALOR_TARIFA,
			@VALOR_IOF,
			@VALOR_JUROS,
			@TAXA_JUROS)

		----------------------------------------- ATUALIZA CADASTRO GPIMAC --------------------------------------------
		UPDATE GPIMAC_Altamira.dbo.CACLI SET
			CACLI.CCLogTip0CodC			= PAGADORES.logradouro,
			CACLI.CCCEN					= PAGADORES.endereco,
			CACLI.CCCENNum				= PAGADORES.numero,
			CACLI.CCCENCpl				= PAGADORES.complemento,
			CACLI.CCCBA					= PAGADORES.bairro,
			CACLI.CCCCIIBGECOD			= PAGADORES.municipio,
			CACLI.CCCCI					= PAGADORES.cidade,
			CACLI.CCCcEP				= PAGADORES.CEP,
			CACLI.CCCES					= PAGADORES.UF,
			CACLI.CCDD5					= PAGADORES.ddd,
			CACLI.CCtFO3				= PAGADORES.telefone,
			CACLI.CCCO1					= PAGADORES.contato
			--CACLI.CCCL					conta_contabil
		FROM 
			@PAGADORES AS PAGADORES INNER JOIN GPIMAC_Altamira.dbo.CACLI ON PAGADORES.cnpj = GPIMAC_Altamira.dbo.CACLI.CCCGC

		----------------------------------------- ATUALIZA SALDO DA CARTEIRA --------------------------------------------
		UPDATE CRT SET
			--utilizado = utilizado + @VALOR_TITULOS,
			remessa = remessa - @VALOR_TITULOS,
			retorno = retorno + @VALOR_TITULOS
		WHERE id = @CARTEIRA

		----------------------------------------- GRAVA PARCELAS --------------------------------------------
		/*IF EXISTS(SELECT NOSSO_NUMERO FROM REMD WHERE nosso_numero = @NOSSO_NUMERO AND parcela = @PARCELA AND carteira = @CARTEIRA)
		BEGIN

			ROLLBACK TRANSACTION

			INSERT INTO ERR_LOG (erro, mensagem) SELECT erro, mensagem FROM ERR WHERE erro = 1123
			SELECT * FROM ERR WHERE erro = 1123

			RETURN
		END*/

		INSERT INTO REM_PAR 
			(remessa, nosso_numero, parcela, forma_pagto, tipo_vencto, vencto, prazo, valor)
		SELECT 
			@REMESSA, nosso_numero, parcela, forma_pagto, tipo_vencto, vencto, prazo, valor
		FROM @PARCELAS

		/*****************************************************************************************
		*                                   ATUALIZA TAREFAS
		*****************************************************************************************/
		DECLARE @TAREFA INT
		DECLARE @VERSAO INT

		SELECT TOP 1 @TAREFA = id, @VERSAO = versao FROM @TAREFAS WHERE operacao = 'CONCLUIR'

		INSERT @NOTIFICACAO EXEC TAREFA_CONCLUIR @TAREFA, @VERSAO

		----------------------------- CRIAR OU ATUALIZAR A PROXIMA TAREFA -----------------------------
		DECLARE @PROXIMA TAREFA_TYPE

		INSERT INTO @PROXIMA 
			(id, nome, titulo, descricao, detalhes, documento, atribuir, atribuido, form, parametros, prazo, criado, concluido, versao)
		SELECT TOP 1 
			id, nome, titulo, descricao, detalhes, documento, atribuir, atribuido, form, parametros, prazo, criado, concluido, versao
		FROM @TAREFAS WHERE operacao = 'PROXIMA'

		INSERT @NOTIFICACAO EXEC TAREFA_INCLUIR @PROXIMA

		/************************************ CONFIRMA ALTERACOES ************************************/

		COMMIT TRANSACTION

		------------------- NOTIFICA O SUCESSO DA OPERACAO PARA O CLIENTE -------------------
		INSERT INTO @ERR_LOG (id, datahora, erro, mensagem) 
		SELECT 0, GETDATE(), erro, mensagem FROM ERR WHERE erro = 0

		------------------ RETORNA O RESULTADO DA OPERACAO ------------------
		SELECT * FROM @ERR_LOG

		---------------------- RETORNA AS NOTIFICACOES ----------------------
		SELECT * FROM @NOTIFICACAO

	END TRY
	BEGIN CATCH

		------------------------- REVERTE AS ALTERACOES -------------------------
		--IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION

		---------------------- RETORNA O ERRO PARA O CLIENTE ----------------------
		INSERT @ERR_LOG EXEC @ERR = ERRO_NOTIFICA

		SELECT * FROM @ERR_LOG

	END CATCH

	RETURN @ERR; 

END





























GO
/****** Object:  StoredProcedure [dbo].[LANCAMENTO_RETORNO]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO














CREATE PROCEDURE [dbo].[LANCAMENTO_RETORNO]

	@CARTEIRA INT,

	@VALOR_TITULOS MONEY,
	@VALOR_LIQUIDO MONEY,
	@VALOR_OPERACAO MONEY,
	@VALOR_TARIFA MONEY,
	@VALOR_IOF MONEY,
	@VALOR_JUROS MONEY,
	@TAXA_JUROS MONEY,

	@PARCELAS RET_PARCELA_TYPE READONLY,

	@TAREFAS TAREFA_NAV_TYPE READONLY

AS
BEGIN
	SET NOCOUNT ON;

	----------------------------- DECLARACAO DE VARIAVEIS -----------------------------
	DECLARE @ERR INT
	DECLARE @ERR_LOG ERR_LOG_TYPE

	DECLARE @NOTIFICACAO TAREFA_NOTIFICACAO_TYPE

	BEGIN TRY

		BEGIN TRANSACTION

		/************************************************************************************
		*                         INICIO DA TRANSACAO DE COBRANCA
		************************************************************************************/
		DECLARE @RETORNO INT

		SET @RETORNO = NEXT VALUE FOR retorno_seq

		---------------------------------------------------- cabecalho da remessa ----------------------------------------------------

		INSERT INTO RET (
			retorno,
			carteira,
			valor_titulos,
			valor_liquido,
			valor_operacao,
			valor_tarifa,
			valor_iof,
			valor_juros,
			taxa_juros)
		VALUES (
			@RETORNO,
			@CARTEIRA,
			@VALOR_TITULOS,
			@VALOR_LIQUIDO,
			@VALOR_OPERACAO,
			@VALOR_TARIFA,
			@VALOR_IOF,
			@VALOR_JUROS,
			@TAXA_JUROS)

		UPDATE CRT SET
			utilizado = utilizado + @VALOR_TITULOS,
			--remessa = remessa - @VALOR_TITULOS,
			retorno = retorno - @VALOR_TITULOS
		WHERE id = @CARTEIRA

		----------------------------------------- GRAVA PARCELAS --------------------------------------------
		/*IF EXISTS(SELECT NOSSO_NUMERO FROM REMD WHERE nosso_numero = @NOSSO_NUMERO AND parcela = @PARCELA AND carteira = @CARTEIRA)
		BEGIN

			ROLLBACK TRANSACTION

			INSERT INTO ERR_LOG (erro, mensagem) SELECT erro, mensagem FROM ERR WHERE erro = 1123
			SELECT * FROM ERR WHERE erro = 1123

			RETURN
		END*/

		INSERT INTO RET_PAR 
			(retorno, nosso_numero, parcela, forma_pagto, tipo_vencto, vencto, prazo, valor)
		SELECT 
			@RETORNO, nosso_numero, parcela, forma_pagto, tipo_vencto, vencto, prazo, valor
		FROM @PARCELAS

		/*****************************************************************************************
		*                                   ATUALIZA TAREFAS
		*****************************************************************************************/
		DECLARE @TAREFA INT
		DECLARE @VERSAO INT

		SELECT TOP 1 @TAREFA = id, @VERSAO = versao FROM @TAREFAS WHERE operacao = 'CONCLUIR'

		INSERT @NOTIFICACAO EXEC TAREFA_CONCLUIR @TAREFA, @VERSAO

		----------------------------- CRIAR OU ATUALIZAR A PROXIMA TAREFA -----------------------------

		DECLARE @PROXIMA TAREFA_TYPE

		INSERT INTO @PROXIMA 
			(id, nome, titulo, descricao, detalhes, documento, atribuir, atribuido, form, parametros, prazo, criado, concluido, versao)
		SELECT TOP 1 
			id, nome, titulo, descricao, detalhes, documento, atribuir, atribuido, form, parametros, prazo, criado, concluido, versao
		FROM @TAREFAS WHERE operacao = 'PROXIMA'

		INSERT @NOTIFICACAO EXEC TAREFA_INCLUIR @PROXIMA

		/************************************ CONFIRMA ALTERACOES ************************************/

		COMMIT TRANSACTION

		------------------- NOTIFICA O SUCESSO DA OPERACAO PARA O CLIENTE -------------------
		INSERT INTO @ERR_LOG (id, datahora, erro, mensagem) 
		SELECT 0, GETDATE(), erro, mensagem FROM ERR WHERE erro = 0

		------------------ RETORNA O RESULTADO DA OPERACAO ------------------
		SELECT * FROM @ERR_LOG

		---------------------- RETORNA AS NOTIFICACOES ----------------------
		SELECT * FROM @NOTIFICACAO

	END TRY
	BEGIN CATCH

		------------------------- REVERTE AS ALTERACOES -------------------------
		--IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION

		---------------------- RETORNA O ERRO PARA O CLIENTE ----------------------
		INSERT @ERR_LOG EXEC @ERR = ERRO_NOTIFICA

		SELECT * FROM @ERR_LOG

	END CATCH

	RETURN @ERR; 

END


























GO
/****** Object:  StoredProcedure [dbo].[PR_MAQUINA_ATUALIZA]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[PR_MAQUINA_ATUALIZA] 
	@ID INT,
	@CODIGO VARCHAR(20),
	@NOME VARCHAR(50),
	@LINHA VARCHAR(20),
	@PARAMETROS VARCHAR(MAX)
AS
BEGIN

	UPDATE MAQUINA
		SET
			codigo = @CODIGO, 
			nome = @NOME, 
			linha = @LINHA,
			parametros = @PARAMETROS
	WHERE 
		id = @ID

	SELECT * FROM MAQUINA WHERE id = @ID

END


GO
/****** Object:  StoredProcedure [dbo].[PR_MAQUINA_INSERIR]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[PR_MAQUINA_INSERIR] 
	@CODIGO VARCHAR(20),
	@NOME VARCHAR(50),	
	@LINHA VARCHAR(20),
	@PARAMETROS VARCHAR(MAX)
AS
BEGIN

	INSERT INTO MAQUINA (codigo, nome, linha, parametros) VALUES (@CODIGO, @NOME, @LINHA, @PARAMETROS)

	SELECT * FROM MAQUINA WHERE id = @@IDENTITY

END




GO
/****** Object:  StoredProcedure [dbo].[PR_MAQUINA_LISTA]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[PR_MAQUINA_LISTA] AS
BEGIN


	SELECT DISTINCT 
		*
	FROM
		MAQUINA
	ORDER BY
		nome

END

GO
/****** Object:  StoredProcedure [dbo].[TAREFA_ATUALIZAR]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





CREATE PROCEDURE [dbo].[TAREFA_ATUALIZAR](@TAREFA TAREFA_TYPE READONLY) AS
BEGIN 

	DECLARE @NOTIFICACAO TAREFA_NOTIFICACAO_TYPE

	-------------------------------------- CONCLUIR A TAREFA ATUAL ----------------------------------------------
	DECLARE @ID INT
	DECLARE @VERSAO INT
	DECLARE @DESCRICAO NVARCHAR(100)
	DECLARE @DOCUMENTO NVARCHAR(MAX)

	SELECT TOP 1 @ID = id, @VERSAO = versao, @DESCRICAO = LTRIM(RTRIM(descricao)), @DOCUMENTO = LTRIM(RTRIM(documento)) FROM @TAREFA;

	UPDATE TRF SET
		descricao = @DESCRICAO,
		documento = STUFF(LTRIM(RTRIM(TRF.documento)), LEN(LTRIM(RTRIM(TRF.documento))), 1, ', ' + @DOCUMENTO + ']'),
		atualizado = GETDATE()
	WHERE
		id = @ID AND
		concluido IS NULL AND
		versao = @VERSAO

	IF @@ROWCOUNT != 1
	BEGIN

		DECLARE @ULTIMA_VERSAO INT
		DECLARE @CONCLUIDO DATETIME

		SELECT TOP 1 @ULTIMA_VERSAO = versao, @CONCLUIDO = concluido FROM TRF WHERE id = @ID;

		IF @@ROWCOUNT != 1 THROW 57015, 'Tarefa não existe !', 1;

		IF (NOT @CONCLUIDO IS NULL) THROW 57010, 'Tarefa já foi concluída !', 1;
			
		IF (@ULTIMA_VERSAO <> @VERSAO) THROW 57450, 'Tarefa esta com versão diferente !', 1;

		THROW 59999, 'Erro interno ao concluir uma tarefa, contate o suporte técnico', 1;
	END

	INSERT INTO @NOTIFICACAO 
	SELECT id, nome, titulo, descricao, atribuir, form, parametros, prazo, criado, concluido, versao, '/tarefas/atualizada/' + LTRIM(RTRIM(atribuir)) AS topico 
	FROM TRF 
	WHERE id = @ID

	SELECT * FROM @NOTIFICACAO

END






GO
/****** Object:  StoredProcedure [dbo].[TAREFA_CONCLUIR]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[TAREFA_CONCLUIR](@TAREFA INT, @VERSAO INT) AS
BEGIN 

	DECLARE @NOTIFICACAO TAREFA_NOTIFICACAO_TYPE

	-------------------------------------- CONCLUIR A TAREFA ATUAL ----------------------------------------------

	UPDATE TRF SET
		concluido = GETDATE()
	WHERE
		id = @TAREFA AND
		concluido IS NULL AND
		versao = @VERSAO

	IF @@ROWCOUNT != 1
	BEGIN

		DECLARE @ULTIMA_VERSAO INT
		DECLARE @CONCLUIDO DATETIME

		SELECT TOP 1 @ULTIMA_VERSAO = versao, @CONCLUIDO = concluido FROM TRF WHERE id = @TAREFA;

		IF @@ROWCOUNT != 1 THROW 57015, 'Tarefa não existe !', 1;

		IF (NOT @CONCLUIDO IS NULL) THROW 57010, 'Tarefa já foi concluída !', 1;
			
		IF (@ULTIMA_VERSAO <> @VERSAO) THROW 57450, 'Tarefa esta com versão diferente !', 1;

		THROW 59999, 'Erro interno ao concluir uma tarefa, contate o suporte técnico', 1;
	END

	INSERT INTO @NOTIFICACAO 
	SELECT id, nome, titulo, descricao, atribuir, form, parametros, prazo, criado, concluido, versao, '/tarefas/concluida/' + LTRIM(RTRIM(atribuir)) AS topico 
	FROM TRF 
	WHERE id = @TAREFA

	SELECT * FROM @NOTIFICACAO

END


GO
/****** Object:  StoredProcedure [dbo].[TAREFA_INCLUIR]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[TAREFA_INCLUIR](@TAREFA TAREFA_TYPE READONLY) AS
BEGIN 

	DECLARE @ID INT
	DECLARE @VERSAO INT

	DECLARE @NAV INT

	DECLARE @NOTIFICACAO TAREFA_NOTIFICACAO_TYPE

	-------------------------------------- INCLUIR NOVA TAREFA ----------------------------------------------

	SET @ID = NEXT VALUE FOR tarefa_seq

	INSERT INTO TRF 
		(id, nome, titulo, descricao, detalhes,	documento, atribuir, atribuido, form, parametros, prazo, criado, concluido)
	SELECT 
		@ID, nome, titulo, descricao,	detalhes, documento, atribuir, atribuido, form,	parametros, prazo, criado, concluido
	FROM 
		@TAREFA
					
	INSERT INTO @NOTIFICACAO 
	SELECT id, nome, titulo, descricao, atribuir, form, parametros, prazo, criado, concluido, versao, '/tarefas/nova/' + LTRIM(RTRIM(atribuir)) AS topico 
	FROM TRF 
	WHERE id = @ID

	--SET @NAV = NEXT VALUE FOR tarefa_nav_seq

	--INSERT TRFN (transacao, tarefa_origem, tarefa_destino) VALUES (NEXT VALUE FOR tarefa_nav_seq, @ID, @NAV)

	SELECT * FROM @NOTIFICACAO

END





GO
/****** Object:  StoredProcedure [dbo].[TAREFA_REPETIR]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO









CREATE PROCEDURE [dbo].[TAREFA_REPETIR](@TAREFA TAREFA_TYPE READONLY) AS
BEGIN 

	DECLARE @NOTIFICACAO TAREFA_NOTIFICACAO_TYPE

	-------------------------------------- CONCLUIR A TAREFA ATUAL ----------------------------------------------
	DECLARE @ID INT
	DECLARE @VERSAO INT
	DECLARE @DESCRICAO NVARCHAR(100)
	DECLARE @DOCUMENTO NVARCHAR(MAX)

	SELECT TOP 1 @ID = id, @VERSAO = versao, @DESCRICAO = LTRIM(RTRIM(descricao)), @DOCUMENTO = LTRIM(RTRIM(documento)) FROM @TAREFA;

	DECLARE @NOVO_ID INT

	SET @NOVO_ID = NEXT VALUE FOR tarefa_seq

	INSERT INTO TRF 
		(id, nome, titulo, descricao, detalhes,	documento, atribuir, atribuido, form, parametros, prazo, criado, concluido)
	SELECT 
		@NOVO_ID, nome, titulo, @DESCRICAO,	detalhes, @DOCUMENTO, atribuir, atribuido, form, parametros, prazo, criado, NULL
	FROM 
		TRF
	WHERE
		id = @ID AND
		--concluido IS NULL AND
		versao = @VERSAO

	/*UPDATE TRF SET
		descricao = @DESCRICAO,
		documento = STUFF(LTRIM(RTRIM(TRF.documento)), LEN(LTRIM(RTRIM(TRF.documento))), 1, ', ' + @DOCUMENTO + ']'),
		atualizado = GETDATE()
	WHERE
		id = @ID AND
		--concluido IS NULL AND
		versao = @VERSAO*/

	IF @@ROWCOUNT != 1
	BEGIN

		DECLARE @ULTIMA_VERSAO INT
		DECLARE @CONCLUIDO DATETIME

		SELECT TOP 1 @ULTIMA_VERSAO = versao, @CONCLUIDO = concluido FROM TRF WHERE id = @ID;

		IF @@ROWCOUNT != 1 THROW 57015, 'Tarefa não existe !', 1;

		IF (NOT @CONCLUIDO IS NULL) THROW 57010, 'Tarefa já foi concluída !', 1;
			
		IF (@ULTIMA_VERSAO <> @VERSAO) THROW 57450, 'Tarefa esta com versão diferente !', 1;

		THROW 59999, 'Erro interno ao concluir uma tarefa, contate o suporte técnico', 1;
	END

	INSERT INTO @NOTIFICACAO 
	SELECT id, nome, titulo, descricao, atribuir, form, parametros, prazo, criado, concluido, versao, '/tarefas/nova/' + LTRIM(RTRIM(atribuir)) AS topico 
	FROM TRF 
	WHERE id = @NOVO_ID

	SELECT * FROM @NOTIFICACAO

END










GO
/****** Object:  StoredProcedure [dbo].[TAREFAS_NAV]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[TAREFAS_NAV] (@TAREFAS TAREFA_NAV_TYPE READONLY) 
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @ULTIMA_VERSAO INT
	DECLARE @CONCLUIDO DATETIME

	DECLARE @PROX_TAREFA INT
	DECLARE @PROX_TAREFA_VERSAO INT

	DECLARE @NOVA_NAV INT

	DECLARE @NOTIFICACAO TAREFA_NOTIFICACAO_TYPE

	-------------------------------------- CONCLUIR A TAREFA ATUAL ----------------------------------------------
	DECLARE @TAREFA INT
	DECLARE @VERSAO INT

	SELECT TOP 1 @TAREFA = id, @VERSAO = versao FROM @TAREFAS WHERE operacao = 'CONCLUIR'
	INSERT @NOTIFICACAO EXEC TAREFA_CONCLUIR @TAREFA, @VERSAO

	-------------------------------------- CRIAR OU ATUALIZAR A PROXIMA TAREFA ----------------------------------------------

	SELECT TOP 1 @TAREFA = id, @VERSAO = versao FROM TRF WHERE nome = (SELECT nome FROM TRF WHERE id = @TAREFA) AND concluido IS NULL

	IF @TAREFA IS NULL
	BEGIN

		INSERT @NOTIFICACAO EXEC TAREFA_INCLUIR @TAREFA, @VERSAO

	END
	ELSE
	BEGIN

		INSERT @NOTIFICACAO EXEC TAREFA_ATUALIZAR @TAREFA, @VERSAO

	END

END


GO
/****** Object:  StoredProcedure [dbo].[TITULO]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[TITULO] 
	@NOSSO_NUMERO INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	/* Recebimento */
	SELECT 
		REC.*,
		REC_PED.numero AS pedido,
		REC_PED.emissao,
		REC_PED.entrega
	FROM 
		REC INNER JOIN REC_PED ON REC.nosso_numero = REC_PED.nosso_numero
	WHERE
		REC.nosso_numero = @NOSSO_NUMERO;

	/* Cliente */
	SELECT 
		EMP.*
	FROM 
		REC INNER JOIN EMP ON REC.cnpj = EMP.cnpj
	WHERE
		REC.nosso_numero = @NOSSO_NUMERO;

	/* Representante */
	SELECT 
		*
	FROM 
		REC_REP 
	WHERE
		REC_REP.nosso_numero = @NOSSO_NUMERO;

	/* Parcelas */
	SELECT 
		*
	FROM 
		REC_PAR
	WHERE
		REC_PAR.nosso_numero = @NOSSO_NUMERO;
END



GO
/****** Object:  StoredProcedure [dbo].[USUARIO_TROCA_SENHA]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[USUARIO_TROCA_SENHA]
	@USUARIO VARCHAR(20),
	@SENHA_ATUAL VARCHAR(32),
	@SENHA_NOVA VARCHAR(32)
AS
BEGIN
	SET NOCOUNT ON;

	----------------------------- DECLARACAO DE VARIAVEIS -----------------------------
	DECLARE @ERR INT
	DECLARE @ERR_LOG ERR_LOG_TYPE

	DECLARE @NOTIFICACAO TAREFA_NOTIFICACAO_TYPE

	DECLARE @TOPICO NVARCHAR(50)

	BEGIN TRY
		BEGIN TRANSACTION

		UPDATE USR	
			SET senha = @SENHA_NOVA
		FROM USR
		WHERE 
			usuario = @USUARIO AND senha = @SENHA_ATUAL

		/************************************ CONFIRMA ALTERACOES ************************************/

		COMMIT TRANSACTION

		------------------- NOTIFICA O SUCESSO DA OPERACAO PARA O CLIENTE -------------------
		INSERT INTO @ERR_LOG (id, datahora, erro, mensagem) 
		SELECT 0, GETDATE(), erro, mensagem FROM ERR WHERE erro = 0

	END TRY
	BEGIN CATCH

		------------------------- REVERTE AS ALTERACOES -------------------------
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION

		---------------------- RETORNA O ERRO PARA O CLIENTE ----------------------
		INSERT @ERR_LOG EXEC @ERR = ERRO_NOTIFICA

	END CATCH

	------------------ RETORNA O RESULTADO DA OPERACAO ------------------
	SELECT * FROM @ERR_LOG

	---------------------- RETORNA O REGISTRO ----------------------
	SELECT  
		*
	FROM 
		USR
	WHERE 
		usuario = @USUARIO AND senha = @SENHA_NOVA

	RETURN @ERR; 

END










GO
/****** Object:  Table [dbo].[BAN]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[BAN](
	[codigo] [int] NOT NULL,
	[nome] [varchar](50) NOT NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[CLI]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CLI](
	[cnpj] [varchar](20) NOT NULL,
	[inscricao] [varchar](12) NULL,
	[fantasia] [varchar](30) NULL,
	[nome] [varchar](100) NULL,
	[logradouro] [varchar](5) NULL,
	[endereco] [varchar](50) NULL,
	[numero] [varchar](10) NULL,
	[complemento] [varchar](20) NULL,
	[bairro] [varchar](30) NULL,
	[municipio] [int] NULL,
	[cidade] [varchar](20) NULL,
	[cep] [varchar](9) NULL,
	[uf] [char](2) NULL,
	[ddd] [varchar](3) NULL,
	[telefone] [varchar](15) NULL,
	[contato] [varchar](20) NULL,
	[desconto] [bit] NOT NULL,
 CONSTRAINT [PK_CLI] PRIMARY KEY CLUSTERED 
(
	[cnpj] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[COB]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[COB](
	[carteira] [int] NOT NULL,
	[nosso_numero] [int] NOT NULL,
	[conta_contabil] [varchar](56) NOT NULL,
	[cnpj] [varchar](20) NOT NULL,
	[inscricao] [varchar](20) NULL,
	[fantasia] [varchar](50) NULL,
	[nome] [varchar](100) NULL,
	[logradouro] [varchar](5) NULL,
	[endereco] [varchar](50) NULL,
	[numero] [varchar](10) NULL,
	[complemento] [varchar](30) NULL,
	[bairro] [varchar](30) NULL,
	[municipio] [int] NULL,
	[cidade] [varchar](30) NULL,
	[cep] [varchar](9) NULL,
	[uf] [char](2) NULL,
	[ddd] [varchar](3) NULL,
	[telefone] [varchar](15) NULL,
	[contato] [varchar](20) NULL,
 CONSTRAINT [PK_COB] PRIMARY KEY CLUSTERED 
(
	[carteira] ASC,
	[nosso_numero] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[COB_PAR]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[COB_PAR](
	[carteira] [int] NOT NULL,
	[nosso_numero] [int] NOT NULL,
	[parcela] [int] NOT NULL,
	[forma_pagto] [varchar](10) NOT NULL,
	[tipo_vencto] [varchar](3) NOT NULL,
	[vencto] [date] NOT NULL,
	[prazo] [int] NOT NULL,
	[valor] [money] NOT NULL,
 CONSTRAINT [PK_COB_PAR] PRIMARY KEY CLUSTERED 
(
	[carteira] ASC,
	[nosso_numero] ASC,
	[parcela] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[CRT]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CRT](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[banco] [varchar](20) NOT NULL,
	[agencia] [varchar](10) NOT NULL,
	[conta] [varchar](10) NOT NULL,
	[carteira] [int] NOT NULL,
	[nome] [varchar](50) NOT NULL,
	[limite] [money] NOT NULL CONSTRAINT [DF_CRT_limite]  DEFAULT ((0)),
	[utilizado] [money] NOT NULL CONSTRAINT [DF_CRT_utilizado]  DEFAULT ((0)),
	[saldo] [money] NOT NULL CONSTRAINT [DF_CRT_saldo]  DEFAULT ((0)),
	[defasagem] [money] NOT NULL CONSTRAINT [DF_CRT_defasado]  DEFAULT ((0)),
	[descoberto] [money] NOT NULL CONSTRAINT [DF_CRT_descoberto]  DEFAULT ((0)),
	[valor_operacao] [money] NOT NULL CONSTRAINT [DF_CRT_valor_operacao]  DEFAULT ((0)),
	[valor_tarifa] [money] NOT NULL CONSTRAINT [DF_CRT_valor_tarifa]  DEFAULT ((0)),
	[taxa_juros] [decimal](18, 3) NOT NULL CONSTRAINT [DF_CRT_taxa]  DEFAULT ((0.00)),
	[total_iof] [money] NOT NULL CONSTRAINT [DF_CRT_iof]  DEFAULT ((0.00)),
	[total_juros] [money] NOT NULL CONSTRAINT [DF_CRT_juros]  DEFAULT ((0.00)),
	[total_tarifas] [money] NOT NULL CONSTRAINT [DF_CRT_taxas]  DEFAULT ((0)),
	[remessa] [money] NOT NULL CONSTRAINT [DF_CRT_remessa]  DEFAULT ((0)),
	[retorno] [money] NOT NULL CONSTRAINT [DF_CRT_retorno]  DEFAULT ((0)),
 CONSTRAINT [PK_CRT] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[DUP]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[DUP](
	[nosso_numero] [int] NOT NULL,
	[parcela] [int] NOT NULL,
	[tipo] [varchar](3) NOT NULL,
	[vencto] [date] NOT NULL,
	[prazo] [int] NOT NULL,
	[porcentagem] [decimal](18, 3) NOT NULL,
	[valor] [money] NOT NULL,
	[descricao] [varchar](50) NULL,
	[origem] [varchar](10) NOT NULL,
	[nome] [varchar](100) NULL,
	[logradouro] [varchar](5) NULL,
	[endereco] [varchar](50) NULL,
	[numero] [varchar](10) NULL,
	[complemento] [varchar](20) NULL,
	[bairro] [varchar](30) NULL,
	[municipio] [int] NULL,
	[cidade] [varchar](20) NULL,
	[cep] [varchar](9) NULL,
	[uf] [char](2) NULL,
	[ddd] [varchar](3) NULL,
	[telefone] [varchar](15) NULL,
	[contato] [varchar](20) NULL,
 CONSTRAINT [PK_DUP] PRIMARY KEY CLUSTERED 
(
	[nosso_numero] ASC,
	[parcela] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[DUP_CRT]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DUP_CRT](
	[crt_id] [int] NOT NULL,
	[dup_nosso_numero] [int] NOT NULL,
	[dup_parcela] [int] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[EMP]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[EMP](
	[cnpj] [varchar](20) NOT NULL,
	[inscricao] [varchar](20) NULL,
	[fantasia] [varchar](50) NULL,
	[nome] [varchar](100) NULL,
	[logradouro] [varchar](5) NULL,
	[endereco] [varchar](50) NULL,
	[numero] [varchar](10) NULL,
	[complemento] [varchar](30) NULL,
	[bairro] [varchar](30) NULL,
	[municipio] [int] NULL,
	[cidade] [varchar](30) NULL,
	[cep] [varchar](9) NULL,
	[uf] [char](2) NULL,
	[ddd] [varchar](3) NULL,
	[telefone] [varchar](15) NULL,
	[contato] [varchar](20) NULL,
 CONSTRAINT [PK_EMP] PRIMARY KEY CLUSTERED 
(
	[cnpj] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ERR]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ERR](
	[erro] [int] NOT NULL,
	[mensagem] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_ERR] PRIMARY KEY CLUSTERED 
(
	[erro] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ERR_LOG]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ERR_LOG](
	[id] [int] NOT NULL DEFAULT (NEXT VALUE FOR [err_log_seq]),
	[datahora] [datetime] NOT NULL CONSTRAINT [DF_ERR_LOG_datahora]  DEFAULT (getdate()),
	[erro] [int] NOT NULL,
	[nivel] [int] NULL,
	[situacao] [nchar](10) NULL,
	[procedimento] [nchar](50) NULL,
	[linha] [nchar](10) NULL,
	[mensagem] [nvarchar](max) NULL,
 CONSTRAINT [PK_ERR_LOG] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[FN_BANCOS]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[FN_BANCOS](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[codigo] [varchar](50) NOT NULL,
	[nome] [varchar](50) NOT NULL,
	[valor_taxa] [money] NOT NULL,
	[valor_bordero] [money] NOT NULL,
	[valor_limite] [money] NOT NULL,
	[financeiro] [varchar](50) NULL,
	[cheque_especial] [money] NULL,
 CONSTRAINT [PK_FN_BANCOS] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[FN_CONTAS]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[FN_CONTAS](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[banco] [int] NOT NULL CONSTRAINT [DF_FN_CONTAS_banco_fk]  DEFAULT ((0)),
	[agencia] [varchar](50) NOT NULL,
	[conta] [varchar](50) NOT NULL,
	[gerente] [varchar](30) NULL,
	[telefone] [varchar](50) NULL,
	[previsao] [char](1) NOT NULL,
	[saldo] [money] NOT NULL,
	[ativo] [bit] NOT NULL CONSTRAINT [DF_FN_CONTAS_ativo]  DEFAULT ((1)),
 CONSTRAINT [PK_FN_CONTAS] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[FN_MOVIMENTO]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[FN_MOVIMENTO](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[conta] [int] NOT NULL CONSTRAINT [DF_FN_MOVIMENTO_conta_fk]  DEFAULT ((0)),
	[data] [date] NOT NULL,
	[liquidacao] [date] NULL,
	[documento] [varchar](50) NULL CONSTRAINT [DF_FN_MovimentoCC_fnmv_NumeroCheque]  DEFAULT (NULL),
	[descricao] [varchar](100) NOT NULL,
	[valor] [money] NOT NULL,
	[operacao] [char](1) NOT NULL,
	[liquidado] [bit] NOT NULL CONSTRAINT [DF_FN_MOVIMENTO_liquidado]  DEFAULT ((0)),
	[observacao] [nvarchar](max) NULL,
	[criado] [datetime2](7) NOT NULL CONSTRAINT [DF_FN_MOVIMENTO_criado]  DEFAULT (getdate()),
	[alterado] [datetime2](7) NULL,
 CONSTRAINT [PK_FN_MOVIMENTO] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[MAQUINA]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[MAQUINA](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[codigo] [varchar](20) NOT NULL,
	[nome] [varchar](50) NOT NULL,
	[linha] [varchar](20) NOT NULL,
	[parametros] [varchar](max) NULL,
 CONSTRAINT [PK_MAQUINA] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[PED]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[PED](
	[numero] [int] NOT NULL,
	[emissao] [date] NOT NULL,
	[entrega] [date] NOT NULL,
	[condicao] [varchar](3) NOT NULL,
	[comissao] [decimal](3, 3) NOT NULL,
 CONSTRAINT [PK_PED_1] PRIMARY KEY CLUSTERED 
(
	[numero] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[PED_CLI]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[PED_CLI](
	[ped_numero] [int] NOT NULL,
	[cli_cnpj] [varchar](20) NOT NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[PED_DUP]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PED_DUP](
	[ped_numero] [int] NOT NULL,
	[dup_nosso_numero] [int] NOT NULL,
	[dup_parcela] [int] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[PED_REP]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[PED_REP](
	[ped_numero] [int] NOT NULL,
	[rep_codigo] [varchar](3) NOT NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[REC]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[REC](
	[nosso_numero] [int] NOT NULL,
	[data] [datetime2](7) NOT NULL CONSTRAINT [DF_REC_data]  DEFAULT (getdate()),
	[conta_contabil] [varchar](56) NOT NULL,
	[cnpj] [varchar](20) NOT NULL,
	[inscricao] [varchar](20) NULL,
	[fantasia] [varchar](50) NULL,
	[nome] [varchar](100) NULL,
	[logradouro] [varchar](5) NULL,
	[endereco] [varchar](50) NULL,
	[numero] [varchar](10) NULL,
	[complemento] [varchar](20) NULL,
	[bairro] [varchar](30) NULL,
	[municipio] [int] NULL,
	[cidade] [varchar](30) NULL,
	[cep] [varchar](9) NULL,
	[uf] [char](2) NULL,
	[ddd] [varchar](3) NULL,
	[telefone] [varchar](15) NULL,
	[contato] [varchar](20) NULL,
 CONSTRAINT [PK_REC] PRIMARY KEY CLUSTERED 
(
	[nosso_numero] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[REC_PAR]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[REC_PAR](
	[nosso_numero] [int] NOT NULL,
	[parcela] [int] NOT NULL,
	[forma_pagto] [varchar](10) NOT NULL,
	[tipo_vencto] [varchar](3) NOT NULL,
	[vencto] [date] NOT NULL,
	[prazo] [int] NOT NULL,
	[valor_produtos] [money] NOT NULL CONSTRAINT [DF_REC_PAR_valor_produtos]  DEFAULT ((0)),
	[valor_ipi] [money] NOT NULL CONSTRAINT [DF_REC_PAR_valor_ipi]  DEFAULT ((0)),
	[valor] [money] NOT NULL,
	[origem] [varchar](10) NOT NULL,
 CONSTRAINT [PK_REC_PAR] PRIMARY KEY CLUSTERED 
(
	[nosso_numero] ASC,
	[parcela] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[REC_PED]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[REC_PED](
	[nosso_numero] [int] NOT NULL,
	[numero] [int] NOT NULL,
	[emissao] [datetime2](7) NULL,
	[entrega] [datetime2](7) NOT NULL,
	[condicao] [varchar](3) NOT NULL,
 CONSTRAINT [PK_REC_PED] PRIMARY KEY CLUSTERED 
(
	[nosso_numero] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[REC_REP]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[REC_REP](
	[nosso_numero] [int] NOT NULL,
	[codigo] [char](3) NOT NULL,
	[nome] [varchar](50) NOT NULL,
	[comissao] [decimal](18, 2) NOT NULL,
 CONSTRAINT [PK_REC_REP] PRIMARY KEY CLUSTERED 
(
	[nosso_numero] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[REM]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[REM](
	[remessa] [int] NOT NULL,
	[carteira] [int] NOT NULL CONSTRAINT [DF_REM_carteira]  DEFAULT ((0)),
	[data] [date] NOT NULL CONSTRAINT [DF_REM_data]  DEFAULT (getdate()),
	[valor_titulos] [money] NOT NULL CONSTRAINT [DF_REM_valor_bruto]  DEFAULT ((0)),
	[total_dias] [int] NOT NULL CONSTRAINT [DF_REM_total_dias]  DEFAULT ((0)),
	[valor_base] [money] NOT NULL CONSTRAINT [DF_REM_valor_base]  DEFAULT ((0)),
	[valor_liquido] [money] NOT NULL CONSTRAINT [DF_REM_valor_liquido]  DEFAULT ((0)),
	[valor_operacao] [money] NOT NULL CONSTRAINT [DF_REM_valor_operacao]  DEFAULT ((0)),
	[valor_tarifa] [money] NOT NULL CONSTRAINT [DF_REM_valor_tarifa]  DEFAULT ((0)),
	[valor_iof] [money] NOT NULL CONSTRAINT [DF_REM_valor_iof]  DEFAULT ((0.00)),
	[valor_juros] [money] NOT NULL CONSTRAINT [DF_REM_valor_juros]  DEFAULT ((0.00)),
	[taxa_juros] [decimal](18, 3) NOT NULL CONSTRAINT [DF_REM_taxa_juros_1]  DEFAULT ((0.00)),
	[numero_parcelas] [int] NOT NULL CONSTRAINT [DF_REM_numero_parcelas]  DEFAULT ((0)),
	[iof_adicional] [decimal](18, 3) NOT NULL CONSTRAINT [DF_REM_iof_adicional]  DEFAULT ((0)),
	[iof_diario] [decimal](18, 3) NOT NULL CONSTRAINT [DF_REM_iof_diario]  DEFAULT ((0)),
	[valor_iof_diario] [money] NOT NULL CONSTRAINT [DF_REM_valor_iof_diario]  DEFAULT ((0)),
	[valor_iof_adicional] [money] NOT NULL CONSTRAINT [DF_REM_valor_iof_adicional]  DEFAULT ((0)),
	[cet] [decimal](18, 3) NOT NULL CONSTRAINT [DF_REM_cet]  DEFAULT ((0)),
	[valor_cet] [money] NOT NULL CONSTRAINT [DF_REM_valor_cet]  DEFAULT ((0)),
 CONSTRAINT [PK_REM_1] PRIMARY KEY CLUSTERED 
(
	[remessa] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[REM_PAR]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[REM_PAR](
	[remessa] [int] NOT NULL,
	[nosso_numero] [int] NOT NULL,
	[parcela] [int] NOT NULL,
	[forma_pagto] [varchar](10) NOT NULL,
	[tipo_vencto] [varchar](3) NOT NULL,
	[vencto] [date] NOT NULL,
	[prazo] [int] NOT NULL,
	[valor] [money] NOT NULL,
 CONSTRAINT [PK_REM_PAR_1] PRIMARY KEY CLUSTERED 
(
	[remessa] ASC,
	[nosso_numero] ASC,
	[parcela] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[REP]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[REP](
	[codigo] [varchar](3) NOT NULL,
	[nome] [varchar](50) NOT NULL,
 CONSTRAINT [PK_REPR] PRIMARY KEY CLUSTERED 
(
	[codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[RET]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RET](
	[retorno] [int] NOT NULL,
	[carteira] [int] NOT NULL CONSTRAINT [DF_RET_carteira]  DEFAULT ((0)),
	[data] [date] NOT NULL CONSTRAINT [DF_RET_data]  DEFAULT (getdate()),
	[valor_titulos] [money] NOT NULL CONSTRAINT [DF_RET_valor_titulos]  DEFAULT ((0)),
	[valor_liquido] [money] NOT NULL CONSTRAINT [DF_RET_valor_liquido]  DEFAULT ((0)),
	[valor_operacao] [money] NOT NULL CONSTRAINT [DF_RET_valor_operacao_1]  DEFAULT ((0)),
	[valor_tarifa] [money] NOT NULL CONSTRAINT [DF_RET_valor_tarifa]  DEFAULT ((0)),
	[valor_iof] [money] NOT NULL CONSTRAINT [DF_RET_valor_iof]  DEFAULT ((0.00)),
	[valor_juros] [money] NOT NULL CONSTRAINT [DF_RET_valor_juros]  DEFAULT ((0.00)),
	[taxa_juros] [decimal](18, 3) NOT NULL CONSTRAINT [DF_RET_taxa_juros_1]  DEFAULT ((0.00)),
	[cet] [decimal](18, 3) NOT NULL CONSTRAINT [DF_RET_cet]  DEFAULT ((0)),
	[aceito] [bit] NOT NULL CONSTRAINT [DF_RET_aceito]  DEFAULT ((0)),
 CONSTRAINT [PK_RET_1] PRIMARY KEY CLUSTERED 
(
	[retorno] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[RET_PAR]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[RET_PAR](
	[retorno] [int] NOT NULL,
	[nosso_numero] [int] NOT NULL,
	[parcela] [int] NOT NULL,
	[forma_pagto] [varchar](10) NOT NULL,
	[tipo_vencto] [varchar](3) NOT NULL,
	[vencto] [date] NOT NULL,
	[prazo] [int] NOT NULL,
	[valor] [money] NOT NULL,
	[aceito] [bit] NOT NULL CONSTRAINT [DF_RETD_aceito]  DEFAULT ((0)),
 CONSTRAINT [PK_RET_PAR] PRIMARY KEY CLUSTERED 
(
	[retorno] ASC,
	[nosso_numero] ASC,
	[parcela] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[TRF]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TRF](
	[id] [int] NOT NULL CONSTRAINT [DF__TRF__id__1293BD5E]  DEFAULT (NEXT VALUE FOR [tarefa_seq]),
	[nome] [nvarchar](100) NOT NULL,
	[titulo] [nvarchar](50) NULL,
	[descricao] [nvarchar](50) NULL,
	[detalhes] [nvarchar](100) NULL,
	[documento] [nvarchar](max) NULL,
	[atribuir] [nvarchar](50) NULL,
	[atribuido] [nvarchar](50) NULL,
	[form] [nvarchar](100) NOT NULL,
	[parametros] [nvarchar](max) NULL,
	[prazo] [datetime] NULL,
	[criado] [datetime] NOT NULL CONSTRAINT [DF_TAREFA_DATA_CRIACAO]  DEFAULT (getdate()),
	[atualizado] [datetime] NULL,
	[concluido] [datetime] NULL,
	[cancelado] [datetime] NULL,
	[versao] [timestamp] NOT NULL,
 CONSTRAINT [PK_TAREFA] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TRFN]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TRFN](
	[transacao] [int] NOT NULL,
	[tarefa_origem] [int] NOT NULL,
	[tarefa_destino] [int] NOT NULL,
 CONSTRAINT [PK_FLUXO] PRIMARY KEY CLUSTERED 
(
	[transacao] ASC,
	[tarefa_origem] ASC,
	[tarefa_destino] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[USR]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[USR](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nome] [varchar](50) NOT NULL,
	[usuario] [varchar](20) NOT NULL,
	[senha] [varchar](32) NOT NULL,
	[perfil] [varchar](100) NULL,
	[departamento] [varchar](50) NULL,
	[email] [nvarchar](100) NULL,
 CONSTRAINT [PK_USUARIOS] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[USR_LNK]    Script Date: 20/02/2017 17:26:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[USR_LNK](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[perfil] [varchar](50) NOT NULL,
	[titulo] [varchar](50) NOT NULL,
	[descricao] [varchar](100) NULL,
	[form] [varchar](100) NULL,
	[padrao] [bit] NOT NULL CONSTRAINT [DF_USR_CNS_padrao]  DEFAULT ((0)),
 CONSTRAINT [PK_USR_CNS] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_CLI]    Script Date: 20/02/2017 17:26:55 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_CLI] ON [dbo].[CLI]
(
	[nome] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_CLI_1]    Script Date: 20/02/2017 17:26:55 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_CLI_1] ON [dbo].[CLI]
(
	[fantasia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_MAQUINA]    Script Date: 20/02/2017 17:26:55 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_MAQUINA] ON [dbo].[MAQUINA]
(
	[codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_MAQUINA_1]    Script Date: 20/02/2017 17:26:55 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_MAQUINA_1] ON [dbo].[MAQUINA]
(
	[nome] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[CLI] ADD  CONSTRAINT [DF_CLI_DESCONTO]  DEFAULT ((1)) FOR [desconto]
GO
ALTER TABLE [dbo].[PED] ADD  CONSTRAINT [DF_PED_NUMERO]  DEFAULT ((0)) FOR [numero]
GO
ALTER TABLE [dbo].[COB]  WITH CHECK ADD  CONSTRAINT [FK_COB_CRT] FOREIGN KEY([carteira])
REFERENCES [dbo].[CRT] ([id])
GO
ALTER TABLE [dbo].[COB] CHECK CONSTRAINT [FK_COB_CRT]
GO
ALTER TABLE [dbo].[COB]  WITH CHECK ADD  CONSTRAINT [FK_COB_EMP] FOREIGN KEY([cnpj])
REFERENCES [dbo].[EMP] ([cnpj])
GO
ALTER TABLE [dbo].[COB] CHECK CONSTRAINT [FK_COB_EMP]
GO
ALTER TABLE [dbo].[COB]  WITH CHECK ADD  CONSTRAINT [FK_COB_REC] FOREIGN KEY([nosso_numero])
REFERENCES [dbo].[REC] ([nosso_numero])
GO
ALTER TABLE [dbo].[COB] CHECK CONSTRAINT [FK_COB_REC]
GO
ALTER TABLE [dbo].[COB_PAR]  WITH CHECK ADD  CONSTRAINT [FK_COB_PAR_COB] FOREIGN KEY([carteira], [nosso_numero])
REFERENCES [dbo].[COB] ([carteira], [nosso_numero])
GO
ALTER TABLE [dbo].[COB_PAR] CHECK CONSTRAINT [FK_COB_PAR_COB]
GO
ALTER TABLE [dbo].[FN_CONTAS]  WITH CHECK ADD  CONSTRAINT [FK_FN_CONTAS_FN_BANCOS1] FOREIGN KEY([banco])
REFERENCES [dbo].[FN_BANCOS] ([id])
GO
ALTER TABLE [dbo].[FN_CONTAS] CHECK CONSTRAINT [FK_FN_CONTAS_FN_BANCOS1]
GO
ALTER TABLE [dbo].[FN_MOVIMENTO]  WITH CHECK ADD  CONSTRAINT [FK_FN_MOVIMENTO_FN_CONTAS1] FOREIGN KEY([conta])
REFERENCES [dbo].[FN_CONTAS] ([id])
GO
ALTER TABLE [dbo].[FN_MOVIMENTO] CHECK CONSTRAINT [FK_FN_MOVIMENTO_FN_CONTAS1]
GO
ALTER TABLE [dbo].[REC]  WITH CHECK ADD  CONSTRAINT [FK_REC_EMP] FOREIGN KEY([cnpj])
REFERENCES [dbo].[EMP] ([cnpj])
GO
ALTER TABLE [dbo].[REC] CHECK CONSTRAINT [FK_REC_EMP]
GO
ALTER TABLE [dbo].[REC_PAR]  WITH CHECK ADD  CONSTRAINT [FK_REC_PAR_REC] FOREIGN KEY([nosso_numero])
REFERENCES [dbo].[REC] ([nosso_numero])
GO
ALTER TABLE [dbo].[REC_PAR] CHECK CONSTRAINT [FK_REC_PAR_REC]
GO
ALTER TABLE [dbo].[REC_PED]  WITH CHECK ADD  CONSTRAINT [FK_REC_PED_REC] FOREIGN KEY([nosso_numero])
REFERENCES [dbo].[REC] ([nosso_numero])
GO
ALTER TABLE [dbo].[REC_PED] CHECK CONSTRAINT [FK_REC_PED_REC]
GO
ALTER TABLE [dbo].[REM]  WITH CHECK ADD  CONSTRAINT [FK_REM_CRT] FOREIGN KEY([carteira])
REFERENCES [dbo].[CRT] ([id])
GO
ALTER TABLE [dbo].[REM] CHECK CONSTRAINT [FK_REM_CRT]
GO
ALTER TABLE [dbo].[REM_PAR]  WITH CHECK ADD  CONSTRAINT [FK_REM_PAR_REC] FOREIGN KEY([nosso_numero])
REFERENCES [dbo].[REC] ([nosso_numero])
GO
ALTER TABLE [dbo].[REM_PAR] CHECK CONSTRAINT [FK_REM_PAR_REC]
GO
ALTER TABLE [dbo].[REM_PAR]  WITH CHECK ADD  CONSTRAINT [FK_REM_PAR_REM] FOREIGN KEY([remessa])
REFERENCES [dbo].[REM] ([remessa])
GO
ALTER TABLE [dbo].[REM_PAR] CHECK CONSTRAINT [FK_REM_PAR_REM]
GO
ALTER TABLE [dbo].[RET]  WITH CHECK ADD  CONSTRAINT [FK_RET_CRT] FOREIGN KEY([carteira])
REFERENCES [dbo].[CRT] ([id])
GO
ALTER TABLE [dbo].[RET] CHECK CONSTRAINT [FK_RET_CRT]
GO
ALTER TABLE [dbo].[RET_PAR]  WITH CHECK ADD  CONSTRAINT [FK_RET_PAR_REC] FOREIGN KEY([nosso_numero])
REFERENCES [dbo].[REC] ([nosso_numero])
GO
ALTER TABLE [dbo].[RET_PAR] CHECK CONSTRAINT [FK_RET_PAR_REC]
GO
ALTER TABLE [dbo].[RET_PAR]  WITH CHECK ADD  CONSTRAINT [FK_RET_PAR_RET] FOREIGN KEY([retorno])
REFERENCES [dbo].[RET] ([retorno])
GO
ALTER TABLE [dbo].[RET_PAR] CHECK CONSTRAINT [FK_RET_PAR_RET]
GO
ALTER TABLE [dbo].[TRFN]  WITH CHECK ADD  CONSTRAINT [FK_FLUXO_TAREFAS] FOREIGN KEY([tarefa_origem])
REFERENCES [dbo].[TRF] ([id])
GO
ALTER TABLE [dbo].[TRFN] CHECK CONSTRAINT [FK_FLUXO_TAREFAS]
GO
ALTER TABLE [dbo].[TRFN]  WITH CHECK ADD  CONSTRAINT [FK_FLUXO_TAREFAS1] FOREIGN KEY([tarefa_destino])
REFERENCES [dbo].[TRF] ([id])
GO
ALTER TABLE [dbo].[TRFN] CHECK CONSTRAINT [FK_FLUXO_TAREFAS1]
GO
USE [master]
GO
ALTER DATABASE [FINANCEIRO] SET  READ_WRITE 
GO
