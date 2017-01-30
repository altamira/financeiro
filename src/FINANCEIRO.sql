USE [master]
GO
/****** Object:  Database [FINANCEIRO]    Script Date: 30/01/2017 17:12:39 ******/
CREATE DATABASE [FINANCEIRO]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'FINANCEIRO', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\FINANCEIRO.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'FINANCEIRO_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\FINANCEIRO_log.ldf' , SIZE = 136064KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
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
EXEC sys.sp_db_vardecimal_storage_format N'FINANCEIRO', N'ON'
GO
USE [FINANCEIRO]
GO
/****** Object:  User [financeiro]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  Sequence [dbo].[ERR_LOG_SEQ]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  Sequence [dbo].[REMESSA_SEQ]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  Sequence [dbo].[RETORNO_SEQ]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  Sequence [dbo].[TAREFA_NAV_SEQ]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  Sequence [dbo].[TAREFA_SEQ]    Script Date: 30/01/2017 17:12:40 ******/
CREATE SEQUENCE [dbo].[TAREFA_SEQ] 
 AS [int]
 START WITH 1
 INCREMENT BY 1
 MINVALUE -2147483648
 MAXVALUE 2147483647
 CACHE 
GO
/****** Object:  UserDefinedTableType [dbo].[COB_PARCELA_TYPE]    Script Date: 30/01/2017 17:12:40 ******/
CREATE TYPE [dbo].[COB_PARCELA_TYPE] AS TABLE(
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
/****** Object:  UserDefinedTableType [dbo].[COB_TYPE]    Script Date: 30/01/2017 17:12:40 ******/
CREATE TYPE [dbo].[COB_TYPE] AS TABLE(
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
	[cidade] [varchar](20) NULL,
	[cep] [varchar](9) NULL,
	[uf] [char](2) NULL,
	[ddd] [varchar](3) NULL,
	[telefone] [varchar](15) NULL,
	[contato] [varchar](20) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[ERR_LOG_TYPE]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  UserDefinedTableType [dbo].[PAGADOR_TYPE]    Script Date: 30/01/2017 17:12:40 ******/
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
	[cidade] [varchar](20) NULL,
	[cep] [varchar](9) NULL,
	[uf] [char](2) NULL,
	[ddd] [varchar](3) NULL,
	[telefone] [varchar](15) NULL,
	[contato] [varchar](20) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[REC_PARCELA_TYPE]    Script Date: 30/01/2017 17:12:40 ******/
CREATE TYPE [dbo].[REC_PARCELA_TYPE] AS TABLE(
	[nosso_numero] [int] NOT NULL,
	[parcela] [int] NOT NULL,
	[forma_pagto] [varchar](10) NOT NULL,
	[tipo_vencto] [varchar](3) NOT NULL,
	[vencto] [date] NOT NULL,
	[prazo] [int] NOT NULL,
	[valor] [money] NOT NULL,
	[origem] [varchar](10) NOT NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[REM_PARCELA_TYPE]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  UserDefinedTableType [dbo].[RET_PARCELA_TYPE]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  UserDefinedTableType [dbo].[TAREFA_NAV_TYPE]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  UserDefinedTableType [dbo].[TAREFA_NOTIFICACAO_TYPE]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  UserDefinedTableType [dbo].[TAREFA_TYPE]    Script Date: 30/01/2017 17:12:40 ******/
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
	[concluido] [datetime2](7) NULL,
	[versao] [int] NOT NULL
)
GO
/****** Object:  StoredProcedure [dbo].[COB_INSERE]    Script Date: 30/01/2017 17:12:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO










CREATE PROCEDURE [dbo].[COB_INSERE]

	@CARTEIRA INT,

	@COBRANCA COB_TYPE READONLY,

	@PARCELAS COB_PARCELA_TYPE READONLY,

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
		INSERT INTO COB (carteira, nosso_numero, conta_contabil, cnpj, inscricao, fantasia, nome, logradouro, endereco, numero, complemento, bairro, municipio, cidade, cep, uf, ddd, telefone, contato)
		SELECT carteira, nosso_numero, conta_contabil, cnpj, inscricao, fantasia, nome, logradouro, endereco, numero, complemento, bairro, municipio, cidade, cep, uf, ddd, telefone, contato	FROM @COBRANCA
    
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
			SELECT TOP 1 id, nome, titulo, descricao, detalhes, documento, atribuir, atribuido, form, parametros, prazo, criado, concluido,	versao
			FROM TRF WHERE id = @TAREFA

			SELECT TOP 1 @DESCRICAO = descricao, @DOCUMENTO = documento FROM @TAREFAS WHERE operacao = 'REPETIR'

			UPDATE @ATUALIZA SET
				descricao = @DESCRICAO,
				documento = @DOCUMENTO

			INSERT @NOTIFICACAO EXEC TAREFA_REPETIR @ATUALIZA
		END

		DECLARE @PROXIMA TAREFA_TYPE

		INSERT INTO @PROXIMA 
		SELECT TOP 1 id, nome, titulo, descricao, detalhes, documento, atribuir, atribuido, form, parametros, prazo, criado, concluido, versao
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
		IF @@TRANCOUNT > 0
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
/****** Object:  StoredProcedure [dbo].[ERRO_NOTIFICA]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  StoredProcedure [dbo].[REC_INSERE]    Script Date: 30/01/2017 17:12:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO







CREATE PROCEDURE [dbo].[REC_INSERE]

	@NOSSO_NUMERO INT,

	@PEDIDO INT,

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
	@CIDADE VARCHAR(20),
	@CEP CHAR(9),
	@UF CHAR(2),
	@DDD VARCHAR(3),
	@TELEFONE VARCHAR(15),
	@CONTATO VARCHAR(20),

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

		INSERT INTO REC_PED (nosso_numero, numero) VALUES (@NOSSO_NUMERO, @PEDIDO)

		----------------------------------------- GRAVA PARCELAS --------------------------------------------

		INSERT INTO REC_PAR 
			(nosso_numero, parcela, forma_pagto, tipo_vencto, vencto, prazo, valor, origem)
		SELECT 
			nosso_numero, parcela, forma_pagto, tipo_vencto, vencto, prazo, valor, origem 
		FROM @PARCELAS

		/*****************************************************************************************
		*                                   ATUALIZA TAREFAS
		*****************************************************************************************/
		DECLARE @TAREFA INT
		DECLARE @VERSAO INT

		SELECT TOP 1 @TAREFA = id, @VERSAO = versao FROM @TAREFAS WHERE operacao = 'CONCLUIR'

		INSERT @NOTIFICACAO EXEC TAREFA_CONCLUIR @TAREFA, @VERSAO

		----------------------------- CRIAR OU ATUALIZAR A PROXIMA TAREFA -----------------------------
		DECLARE @ATUALIZA TAREFA_TYPE

		INSERT INTO @ATUALIZA
		SELECT TOP 1 id, nome, titulo, descricao, detalhes, documento, atribuir, atribuido, form, parametros, prazo, criado, concluido,	versao
		FROM TRF WHERE nome = (SELECT TOP 1 nome FROM @TAREFAS WHERE operacao = 'PROXIMA') AND concluido IS NULL

		IF NOT EXISTS (SELECT * FROM @ATUALIZA)
		BEGIN
			DECLARE @PROXIMA TAREFA_TYPE

			INSERT INTO @PROXIMA 
			SELECT TOP 1 id, nome, titulo, descricao, detalhes, '[' + documento + ']', atribuir, atribuido, form, parametros, prazo, criado, concluido, versao
			FROM @TAREFAS WHERE operacao = 'PROXIMA'

			INSERT @NOTIFICACAO EXEC TAREFA_INCLUIR @PROXIMA
		END
		ELSE
		BEGIN
			DECLARE @DESCRICAO NVARCHAR(50)
			DECLARE @DOCUMENTO NVARCHAR(MAX)

			SELECT TOP 1 @DESCRICAO = descricao, @DOCUMENTO = documento FROM @TAREFAS WHERE operacao = 'PROXIMA'

			UPDATE @ATUALIZA SET
				descricao = @DESCRICAO,
				documento = @DOCUMENTO

			INSERT @NOTIFICACAO EXEC TAREFA_ATUALIZAR @ATUALIZA
		END

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
	SELECT * FROM @NOTIFICACAO

	RETURN @ERR; 

END






GO
/****** Object:  StoredProcedure [dbo].[REM_INSERE]    Script Date: 30/01/2017 17:12:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO













CREATE PROCEDURE [dbo].[REM_INSERE]

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
		SELECT TOP 1 id, nome, titulo, descricao, detalhes, documento, atribuir, atribuido, form, parametros, prazo, criado, concluido, versao
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
		IF @@TRANCOUNT > 0
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
/****** Object:  StoredProcedure [dbo].[RET_INSERE]    Script Date: 30/01/2017 17:12:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO











CREATE PROCEDURE [dbo].[RET_INSERE]

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
		SELECT TOP 1 id, nome, titulo, descricao, detalhes, documento, atribuir, atribuido, form, parametros, prazo, criado, concluido, versao
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
		IF @@TRANCOUNT > 0
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
/****** Object:  StoredProcedure [dbo].[TAREFA_ATUALIZAR]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  StoredProcedure [dbo].[TAREFA_CONCLUIR]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  StoredProcedure [dbo].[TAREFA_INCLUIR]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  StoredProcedure [dbo].[TAREFA_REPETIR]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  StoredProcedure [dbo].[TAREFAS_NAV]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  Table [dbo].[BAN]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  Table [dbo].[CLI]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  Table [dbo].[COB]    Script Date: 30/01/2017 17:12:40 ******/
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
	[cidade] [varchar](20) NULL,
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
/****** Object:  Table [dbo].[COB_PAR]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  Table [dbo].[CRT]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  Table [dbo].[DUP]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  Table [dbo].[DUP_CRT]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  Table [dbo].[EMP]    Script Date: 30/01/2017 17:12:40 ******/
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
	[cidade] [varchar](20) NULL,
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
/****** Object:  Table [dbo].[ERR]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  Table [dbo].[ERR_LOG]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  Table [dbo].[PED]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  Table [dbo].[PED_CLI]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  Table [dbo].[PED_DUP]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  Table [dbo].[PED_REP]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  Table [dbo].[REC]    Script Date: 30/01/2017 17:12:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[REC](
	[nosso_numero] [int] NOT NULL,
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
	[cidade] [varchar](20) NULL,
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
/****** Object:  Table [dbo].[REC_PAR]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  Table [dbo].[REC_PED]    Script Date: 30/01/2017 17:12:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[REC_PED](
	[nosso_numero] [int] NOT NULL,
	[numero] [int] NOT NULL,
 CONSTRAINT [PK_REC_PED] PRIMARY KEY CLUSTERED 
(
	[nosso_numero] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[REM]    Script Date: 30/01/2017 17:12:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[REM](
	[remessa] [int] NOT NULL,
	[carteira] [int] NOT NULL,
	[data] [date] NOT NULL,
	[valor_titulos] [money] NOT NULL,
	[total_dias] [int] NOT NULL,
	[valor_base] [money] NOT NULL,
	[valor_liquido] [money] NOT NULL,
	[valor_operacao] [money] NOT NULL,
	[valor_tarifa] [money] NOT NULL,
	[valor_iof] [money] NOT NULL,
	[valor_juros] [money] NOT NULL,
	[taxa_juros] [decimal](18, 3) NOT NULL,
	[numero_parcelas] [int] NOT NULL,
	[iof_adicional] [decimal](18, 3) NOT NULL,
	[iof_diario] [decimal](18, 3) NOT NULL,
	[valor_iof_diario] [money] NOT NULL,
	[valor_iof_adicional] [money] NOT NULL,
	[cet] [decimal](18, 3) NOT NULL,
	[valor_cet] [money] NOT NULL,
 CONSTRAINT [PK_REM_1] PRIMARY KEY CLUSTERED 
(
	[remessa] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[REM_PAR]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  Table [dbo].[REP]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  Table [dbo].[RET]    Script Date: 30/01/2017 17:12:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RET](
	[retorno] [int] NOT NULL,
	[carteira] [int] NOT NULL,
	[data] [date] NOT NULL,
	[valor_titulos] [money] NOT NULL,
	[valor_liquido] [money] NOT NULL,
	[valor_operacao] [money] NOT NULL,
	[valor_tarifa] [money] NOT NULL,
	[valor_iof] [money] NOT NULL,
	[valor_juros] [money] NOT NULL,
	[taxa_juros] [decimal](18, 3) NOT NULL,
	[cet] [decimal](18, 3) NOT NULL,
	[aceito] [bit] NOT NULL,
 CONSTRAINT [PK_RET_1] PRIMARY KEY CLUSTERED 
(
	[retorno] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[RET_PAR]    Script Date: 30/01/2017 17:12:40 ******/
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
	[aceito] [bit] NOT NULL,
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
/****** Object:  Table [dbo].[TRF]    Script Date: 30/01/2017 17:12:40 ******/
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
	[versao] [timestamp] NOT NULL,
 CONSTRAINT [PK_TAREFA] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TRFN]    Script Date: 30/01/2017 17:12:40 ******/
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
/****** Object:  Table [dbo].[USR]    Script Date: 30/01/2017 17:12:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[USR](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nome] [varchar](50) NOT NULL,
	[login] [varchar](50) NOT NULL,
	[senha] [varchar](50) NOT NULL,
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
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_CLI]    Script Date: 30/01/2017 17:12:40 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_CLI] ON [dbo].[CLI]
(
	[nome] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_CLI_1]    Script Date: 30/01/2017 17:12:40 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_CLI_1] ON [dbo].[CLI]
(
	[fantasia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[CLI] ADD  CONSTRAINT [DF_CLI_DESCONTO]  DEFAULT ((1)) FOR [desconto]
GO
ALTER TABLE [dbo].[PED] ADD  CONSTRAINT [DF_PED_NUMERO]  DEFAULT ((0)) FOR [numero]
GO
ALTER TABLE [dbo].[REM] ADD  CONSTRAINT [DF_REM_carteira]  DEFAULT ((0)) FOR [carteira]
GO
ALTER TABLE [dbo].[REM] ADD  CONSTRAINT [DF_REM_data]  DEFAULT (getdate()) FOR [data]
GO
ALTER TABLE [dbo].[REM] ADD  CONSTRAINT [DF_REM_valor_bruto]  DEFAULT ((0)) FOR [valor_titulos]
GO
ALTER TABLE [dbo].[REM] ADD  CONSTRAINT [DF_REM_total_dias]  DEFAULT ((0)) FOR [total_dias]
GO
ALTER TABLE [dbo].[REM] ADD  CONSTRAINT [DF_REM_valor_base]  DEFAULT ((0)) FOR [valor_base]
GO
ALTER TABLE [dbo].[REM] ADD  CONSTRAINT [DF_REM_valor_liquido]  DEFAULT ((0)) FOR [valor_liquido]
GO
ALTER TABLE [dbo].[REM] ADD  CONSTRAINT [DF_REM_valor_operacao]  DEFAULT ((0)) FOR [valor_operacao]
GO
ALTER TABLE [dbo].[REM] ADD  CONSTRAINT [DF_REM_valor_tarifa]  DEFAULT ((0)) FOR [valor_tarifa]
GO
ALTER TABLE [dbo].[REM] ADD  CONSTRAINT [DF_REM_valor_iof]  DEFAULT ((0.00)) FOR [valor_iof]
GO
ALTER TABLE [dbo].[REM] ADD  CONSTRAINT [DF_REM_valor_juros]  DEFAULT ((0.00)) FOR [valor_juros]
GO
ALTER TABLE [dbo].[REM] ADD  CONSTRAINT [DF_REM_taxa_juros_1]  DEFAULT ((0.00)) FOR [taxa_juros]
GO
ALTER TABLE [dbo].[REM] ADD  CONSTRAINT [DF_REM_numero_parcelas]  DEFAULT ((0)) FOR [numero_parcelas]
GO
ALTER TABLE [dbo].[REM] ADD  CONSTRAINT [DF_REM_iof_adicional]  DEFAULT ((0)) FOR [iof_adicional]
GO
ALTER TABLE [dbo].[REM] ADD  CONSTRAINT [DF_REM_iof_diario]  DEFAULT ((0)) FOR [iof_diario]
GO
ALTER TABLE [dbo].[REM] ADD  CONSTRAINT [DF_REM_valor_iof_diario]  DEFAULT ((0)) FOR [valor_iof_diario]
GO
ALTER TABLE [dbo].[REM] ADD  CONSTRAINT [DF_REM_valor_iof_adicional]  DEFAULT ((0)) FOR [valor_iof_adicional]
GO
ALTER TABLE [dbo].[REM] ADD  CONSTRAINT [DF_REM_cet]  DEFAULT ((0)) FOR [cet]
GO
ALTER TABLE [dbo].[REM] ADD  CONSTRAINT [DF_REM_valor_cet]  DEFAULT ((0)) FOR [valor_cet]
GO
ALTER TABLE [dbo].[RET] ADD  CONSTRAINT [DF_RET_carteira]  DEFAULT ((0)) FOR [carteira]
GO
ALTER TABLE [dbo].[RET] ADD  CONSTRAINT [DF_RET_data]  DEFAULT (getdate()) FOR [data]
GO
ALTER TABLE [dbo].[RET] ADD  CONSTRAINT [DF_RET_valor_titulos]  DEFAULT ((0)) FOR [valor_titulos]
GO
ALTER TABLE [dbo].[RET] ADD  CONSTRAINT [DF_RET_valor_liquido]  DEFAULT ((0)) FOR [valor_liquido]
GO
ALTER TABLE [dbo].[RET] ADD  CONSTRAINT [DF_RET_valor_operacao_1]  DEFAULT ((0)) FOR [valor_operacao]
GO
ALTER TABLE [dbo].[RET] ADD  CONSTRAINT [DF_RET_valor_tarifa]  DEFAULT ((0)) FOR [valor_tarifa]
GO
ALTER TABLE [dbo].[RET] ADD  CONSTRAINT [DF_RET_valor_iof]  DEFAULT ((0.00)) FOR [valor_iof]
GO
ALTER TABLE [dbo].[RET] ADD  CONSTRAINT [DF_RET_valor_juros]  DEFAULT ((0.00)) FOR [valor_juros]
GO
ALTER TABLE [dbo].[RET] ADD  CONSTRAINT [DF_RET_taxa_juros_1]  DEFAULT ((0.00)) FOR [taxa_juros]
GO
ALTER TABLE [dbo].[RET] ADD  CONSTRAINT [DF_RET_cet]  DEFAULT ((0)) FOR [cet]
GO
ALTER TABLE [dbo].[RET] ADD  CONSTRAINT [DF_RET_aceito]  DEFAULT ((0)) FOR [aceito]
GO
ALTER TABLE [dbo].[RET_PAR] ADD  CONSTRAINT [DF_RETD_aceito]  DEFAULT ((0)) FOR [aceito]
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
