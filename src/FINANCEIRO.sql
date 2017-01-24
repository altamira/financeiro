USE [master]
GO
/****** Object:  Database [FINANCEIRO]    Script Date: 24/01/2017 17:30:06 ******/
CREATE DATABASE [FINANCEIRO]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'FINANCEIRO', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\FINANCEIRO.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'FINANCEIRO_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\FINANCEIRO_log.ldf' , SIZE = 102144KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
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
/****** Object:  User [financeiro]    Script Date: 24/01/2017 17:30:06 ******/
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
/****** Object:  Sequence [dbo].[ERR_LOG_SEQ]    Script Date: 24/01/2017 17:30:06 ******/
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
/****** Object:  Sequence [dbo].[REMESSA_SEQ]    Script Date: 24/01/2017 17:30:06 ******/
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
/****** Object:  Sequence [dbo].[RETORNO_SEQ]    Script Date: 24/01/2017 17:30:06 ******/
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
/****** Object:  Sequence [dbo].[TAREFA_NAV_SEQ]    Script Date: 24/01/2017 17:30:06 ******/
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
/****** Object:  Sequence [dbo].[TAREFA_SEQ]    Script Date: 24/01/2017 17:30:06 ******/
CREATE SEQUENCE [dbo].[TAREFA_SEQ] 
 AS [int]
 START WITH 1
 INCREMENT BY 1
 MINVALUE -2147483648
 MAXVALUE 2147483647
 CACHE 
GO
/****** Object:  UserDefinedTableType [dbo].[COB_PARCELA_TYPE]    Script Date: 24/01/2017 17:30:06 ******/
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
/****** Object:  UserDefinedTableType [dbo].[COB_TYPE]    Script Date: 24/01/2017 17:30:06 ******/
CREATE TYPE [dbo].[COB_TYPE] AS TABLE(
	[carteira] [int] NOT NULL,
	[nosso_numero] [int] NOT NULL,
	[conta_contabil] [varchar](56) NOT NULL,
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
	[contato] [varchar](20) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[REC_PARCELA_TYPE]    Script Date: 24/01/2017 17:30:06 ******/
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
/****** Object:  UserDefinedTableType [dbo].[TAREFA_NOTIFICACAO_TYPE]    Script Date: 24/01/2017 17:30:06 ******/
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
/****** Object:  UserDefinedTableType [dbo].[TAREFA_TYPE]    Script Date: 24/01/2017 17:30:06 ******/
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
/****** Object:  StoredProcedure [dbo].[COB_INSERE]    Script Date: 24/01/2017 17:30:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO







CREATE PROCEDURE [dbo].[COB_INSERE]

	@TAREFA_ATUAL INT,
	@VERSAO INT,

	--@NOVA_TAREFA INT,

	--@TAREFA_COBRANCA_NOME NVARCHAR(100),
	--@TAREFA_COBRANCA_DESCRICAO NVARCHAR(100),

	@TAREFAS TAREFA_TYPE READONLY,

	@COBRANCA COB_TYPE READONLY,

	@PARCELAS COB_PARCELA_TYPE READONLY

AS
BEGIN
	SET NOCOUNT ON;

	------------------------------------- DECLARACAO DE VARIAVEIS ----------------------------------------------
	DECLARE @ULTIMA_VERSAO INT
	DECLARE @CONCLUIDO DATETIME

	DECLARE @PROX_TAREFA INT
	DECLARE @PROX_TAREFA_VERSAO INT

	DECLARE @NOVA_NAV INT

	DECLARE @TAREFA_NOTIFICACAO TAREFA_NOTIFICACAO_TYPE

	BEGIN TRY
		BEGIN TRANSACTION

		-------------------------------------- CONCLUIR A TAREFA ATUAL ----------------------------------------------

		UPDATE TRF SET
			concluido = GETDATE()
		WHERE
			id = @TAREFA_ATUAL AND
			concluido IS NULL AND
			versao = @VERSAO

		IF @@ROWCOUNT != 1
		BEGIN

			ROLLBACK TRANSACTION

			SELECT TOP 1 @ULTIMA_VERSAO = versao, @CONCLUIDO = concluido FROM TRF WHERE id = @TAREFA_ATUAL;

			IF @@ROWCOUNT != 1
			BEGIN
				INSERT INTO ERR_LOG (erro, mensagem, procedimento) 
				SELECT erro, mensagem, ERROR_PROCEDURE() FROM ERR WHERE erro = 7015;

				SELECT * FROM ERR WHERE erro = 7015;

				RETURN 7015;
			END

			IF (NOT @CONCLUIDO IS NULL)
			BEGIN
				INSERT INTO ERR_LOG (erro, mensagem, procedimento) 
				SELECT erro, mensagem, ERROR_PROCEDURE() FROM ERR WHERE erro = 7010;

				SELECT * FROM ERR WHERE erro = 7010;

				RETURN 7010;
			END
			
			IF (@ULTIMA_VERSAO <> @VERSAO)
			BEGIN
				INSERT INTO ERR_LOG (erro, mensagem, procedimento) 
				SELECT erro, mensagem, ERROR_PROCEDURE() FROM ERR WHERE erro = 7450;

				SELECT * FROM ERR WHERE erro = 7450;

				RETURN 7450;
			END

			SELECT '9999' AS erro, 'Erro interno ao concluir uma tarefa, contate o suporte técnico' AS mensagem;

			RETURN 9999;
		END

		INSERT INTO @TAREFA_NOTIFICACAO 
		SELECT id, nome, titulo, descricao, atribuir, form, parametros, prazo, criado, concluido, versao, '/tarefas/concluida/' + LTRIM(RTRIM(atribuir)) AS topico 
		FROM TRF 
		WHERE id = @TAREFA_ATUAL

/*
	(msg.payload.documento.cobranca.find( (c) => c.parcelas.find( (p) => !p.selected && !p.carteira) ) ?

	`
		----------------------- TAREFA AINDA PENDENTE, RECRIA A TAREFA -----------------------
		SELECT TOP 1 @PROX_TAREFA = id, @PROX_TAREFA_VERSAO = versao FROM TRF WHERE nome = '${tarefa_atual.nome}' AND concluido IS NULL

		IF @PROX_TAREFA IS NULL
		BEGIN

			SET @PROX_TAREFA = NEXT VALUE FOR tarefa_seq

			INSERT INTO TRF
				(id,
				nome,
				titulo,
				descricao,
				detalhes,
				documento,
				atribuir,
				form,
				parametros,
				prazo,
				criado,
				concluido)
			VALUES
				(@PROX_TAREFA,
				'${tarefa_atual.nome}',
				'${tarefa_atual.titulo}',
				'Saldo R$ ${msg.payload.documento.cobranca.reduce( (total, c) => total + c.parcelas.filter( (p) => !p.selected && !p.carteira).reduce( (soma, p) => soma + p.valor, 0.0), 0.0).toFixed(2).replace('.', ',')}',
				'',
				'${tarefa_atual.documento}',
				'${tarefa_atual.atribuir}',
				'${tarefa_atual.form}',
				NULL,
				NULL,
				GETDATE(),
				NULL)

			SET @NOVA_NAV = NEXT VALUE FOR tarefa_nav_seq

			INSERT TRFN (transacao, tarefa_origem, tarefa_destino) VALUES (NEXT VALUE FOR tarefa_nav_seq, @TAREFA_ATUAL, @PROX_TAREFA)

			INSERT INTO @TRF SELECT id, nome, titulo, descricao, atribuir, form, parametros, prazo, criado, concluido, versao, '/tarefas/nova/' + LTRIM(RTRIM(atribuir)) AS topico FROM TRF WHERE id = @PROX_TAREFA

		END
		ELSE
		BEGIN

			UPDATE TRF SET
				descricao = 'Saldo R$${msg.payload.documento.cobranca.reduce( (total, c) => total + c.parcelas.filter( (p) => !p.selected && !p.carteira).reduce( (soma, p) => soma + p.valor, 0.0), 0.0).toFixed(2).replace('.', ',')}',
				documento = '${tarefa_atual.documento}'
			WHERE
				id = @PROX_TAREFA
				AND versao = @PROX_TAREFA_VERSAO

			IF @@ROWCOUNT != 1
			BEGIN

				ROLLBACK TRANSACTION

				SELECT TOP 1 @ULTIMA_VERSAO = versao, @CONCLUIDO = concluido FROM TRF WHERE id = @TAREFA_ATUAL

				IF (NOT @CONCLUIDO IS NULL)
				BEGIN
					INSERT INTO ERR_LOG (erro, mensagem) SELECT erro, mensagem FROM ERR WHERE erro = 7010
					SELECT * FROM ERR WHERE erro = 7010
				END
				ELSE IF (@ULTIMA_VERSAO <> @VERSAO)
				BEGIN
					INSERT INTO ERR_LOG (erro, mensagem) SELECT erro, mensagem FROM ERR WHERE erro = 7450
					SELECT * FROM ERR WHERE erro = 7450
				END

				RETURN
			END

			INSERT INTO @TRF SELECT id, nome, titulo, descricao, atribuir, form, parametros, prazo, criado, concluido, versao, '/tarefas/atualizada/' + LTRIM(RTRIM(atribuir)) AS topico FROM TRF WHERE id = @PROX_TAREFA

		END
	`

	:

	`
	   -- tarefa finalizada e nenhuma tarefa nova criada --
	`

	) +

	(msg.payload.documento.cobranca.find( (c) => c.parcelas.find( (p) => p.selected && !p.carteira) ) ?

	`
	   -------------------------- PROXIMA TAREFA - REMESSA -----------------------

		SET @PROX_TAREFA = NEXT VALUE FOR tarefa_seq

		INSERT INTO TRF
			(id,
			nome,
			titulo,
			descricao,
			detalhes,
			documento,
			atribuir,
			form,
			parametros,
			prazo,
			criado,
			concluido)
		VALUES
			(@PROX_TAREFA,
			'${tarefa_remessa.nome}',
			'${tarefa_remessa.titulo}',
			'${tarefa_remessa.descricao}',
			'',
			'${tarefa_remessa.documento}',
			'${tarefa_remessa.atribuir}',
			'${tarefa_remessa.form}',
			NULL,
			NULL,
			GETDATE(),
			NULL)

		SET @NOVA_NAV = NEXT VALUE FOR tarefa_nav_seq

		INSERT TRFN (transacao, tarefa_origem, tarefa_destino) VALUES (NEXT VALUE FOR tarefa_nav_seq, @TAREFA_ATUAL, @PROX_TAREFA)

		INSERT INTO @TRF 
		SELECT id, nome, titulo, descricao, atribuir, form, parametros, prazo, criado, concluido, versao, '/tarefas/nova/' + LTRIM(RTRIM(atribuir)) AS topico 
		FROM TRF 
		WHERE id = @PROX_TAREFA
*/


		---------------------------------------------------- grava as parcelas ----------------------------------------------------
		/*IF EXISTS(SELECT NOSSO_NUMERO FROM COB_PAR WHERE nosso_numero = @NOSSO_NUMERO AND parcela = @PARCELA AND carteira = @CARTEIRA)
		BEGIN
    
		   ROLLBACK TRANSACTION
    
		   INSERT INTO ERR_LOG (erro, mensagem) SELECT erro, mensagem FROM ERR WHERE erro = 1123
		   SELECT * FROM ERR WHERE erro = 1123
    
		   RETURN
		END*/
    
		INSERT INTO COB (carteira, nosso_numero, conta_contabil, cnpj)
		SELECT carteira, nosso_numero, conta_contabil, cnpj	FROM @COBRANCA
    
		INSERT INTO COB_PAR
		SELECT * FROM @PARCELAS

		/*UPDATE CRT SET
		   remessa = remessa --+ (SELECT SUM(valor) FROM @PARCELAS)
		WHERE id = @CARTEIRA*/

		COMMIT TRANSACTION

	END TRY
	BEGIN CATCH

		DECLARE @ERR_ID INT
		DECLARE @ERROR_NUMBER INT

		---------------------------- REVERTE AS ALTERACOES ----------------------------
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION

		---------------------------- CAPTURA O ERRO ----------------------------
		SET @ERROR_NUMBER = ERROR_NUMBER()

		---------------------------- REGISTRA O ERRO ----------------------------
		SET @ERR_ID = NEXT VALUE FOR err_log_seq

		INSERT INTO err_log 
			(id, erro, nivel, situacao, procedimento, linha, mensagem)
		VALUES (@ERR_ID, @ERROR_NUMBER, ERROR_SEVERITY(), ERROR_STATE(), ERROR_PROCEDURE(), ERROR_LINE(), ERROR_MESSAGE())

		---------------------------- RETORNA O ERRO PARA O CLIENTE ----------------------------
		SELECT * FROM err_log WHERE id = @ERR_ID

		RETURN @ERROR_NUMBER

	END CATCH

	---------------------------- RETORNA O RESULTADO DA OPERACAO ----------------------------
	SELECT * FROM ERR WHERE erro = 0

	---------------------------- RETORNA AS NOTIFICACOES ----------------------------
	SELECT * FROM @TAREFA_NOTIFICACAO

	RETURN 0; -- EXECUTADO COM SUCESSO

END













GO
/****** Object:  StoredProcedure [dbo].[REC_INSERE]    Script Date: 24/01/2017 17:30:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO









--DROP PROCEDURE [dbo].[LANCAMENTO_CONTAS_RECEBER]
CREATE PROCEDURE [dbo].[REC_INSERE]

	@TAREFA_ATUAL INT,
	@VERSAO INT,

	@TAREFA_COBRANCA_NOME NVARCHAR(100),
	@TAREFA_COBRANCA_DESCRICAO NVARCHAR(100),

	@TAREFAS TAREFA_TYPE READONLY,

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

	@PARCELAS REC_PARCELA_TYPE READONLY

AS
BEGIN
	SET NOCOUNT ON;

	------------------------------------- DECLARACAO DE VARIAVEIS ----------------------------------------------
	DECLARE @ULTIMA_VERSAO INT
	DECLARE @CONCLUIDO DATETIME

	DECLARE @PROX_TAREFA INT
	DECLARE @PROX_TAREFA_VERSAO INT

	DECLARE @NOVA_NAV INT

	DECLARE @TAREFA_NOTIFICACAO TAREFA_NOTIFICACAO_TYPE

	/*IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION*/
        
	BEGIN TRY
		BEGIN TRANSACTION

		-------------------------------------- CONCLUIR A TAREFA ATUAL ----------------------------------------------

		UPDATE TRF SET
			concluido = GETDATE()
		WHERE
			id = @TAREFA_ATUAL AND
			concluido IS NULL AND
			versao = @VERSAO

		IF @@ROWCOUNT != 1
		BEGIN

			ROLLBACK TRANSACTION

			SELECT TOP 1 @ULTIMA_VERSAO = versao, @CONCLUIDO = concluido FROM TRF WHERE id = @TAREFA_ATUAL;

			IF @@ROWCOUNT != 1
			BEGIN
				INSERT INTO ERR_LOG (erro, mensagem, procedimento) 
				SELECT erro, mensagem, ERROR_PROCEDURE() FROM ERR WHERE erro = 7015;

				SELECT * FROM ERR WHERE erro = 7015;

				RETURN 7015;
			END

			IF (NOT @CONCLUIDO IS NULL)
			BEGIN
				INSERT INTO ERR_LOG (erro, mensagem, procedimento) 
				SELECT erro, mensagem, ERROR_PROCEDURE() FROM ERR WHERE erro = 7010;

				SELECT * FROM ERR WHERE erro = 7010;

				RETURN 7010;
			END
			
			IF (@ULTIMA_VERSAO <> @VERSAO)
			BEGIN
				INSERT INTO ERR_LOG (erro, mensagem, procedimento) 
				SELECT erro, mensagem, ERROR_PROCEDURE() FROM ERR WHERE erro = 7450;

				SELECT * FROM ERR WHERE erro = 7450;

				RETURN 7450;
			END

			SELECT '9999' AS erro, 'Erro interno ao concluir uma tarefa, contate o suporte técnico' AS mensagem;

			RETURN 9999;
		END

		INSERT INTO @TAREFA_NOTIFICACAO 
		SELECT id, nome, titulo, descricao, atribuir, form, parametros, prazo, criado, concluido, versao, '/tarefas/concluida/' + LTRIM(RTRIM(atribuir)) AS topico 
		FROM TRF 
		WHERE id = @TAREFA_ATUAL

		-------------------------------------- CRIAR OU ATUALIZAR A PROXIMA TAREFA ----------------------------------------------

		SELECT TOP 1 @PROX_TAREFA = id, @PROX_TAREFA_VERSAO = versao FROM TRF WHERE nome = @TAREFA_COBRANCA_NOME AND concluido IS NULL

		IF @PROX_TAREFA IS NULL
		BEGIN

			SET @PROX_TAREFA = NEXT VALUE FOR tarefa_seq

			INSERT INTO TRF 
				(id, nome, titulo, descricao, detalhes,	documento, atribuir, atribuido, form, parametros, prazo, criado, concluido)
			SELECT 
				@PROX_TAREFA, nome, titulo, descricao,	detalhes, '[' + documento + ']', atribuir, atribuido, form,	parametros, prazo, criado, concluido
			FROM 
				@TAREFAS
					
			INSERT INTO @TAREFA_NOTIFICACAO 
			SELECT id, nome, titulo, descricao, atribuir, form, parametros, prazo, criado, concluido, versao, '/tarefas/nova/' + LTRIM(RTRIM(atribuir)) AS topico 
			FROM TRF 
			WHERE id = @PROX_TAREFA

			SET @NOVA_NAV = NEXT VALUE FOR tarefa_nav_seq

			INSERT TRFN (transacao, tarefa_origem, tarefa_destino) VALUES (NEXT VALUE FOR tarefa_nav_seq, @TAREFA_ATUAL, @PROX_TAREFA)

		END
		ELSE
		BEGIN

			UPDATE TRF SET
				descricao = @TAREFA_COBRANCA_DESCRICAO,
				documento = STUFF(TRF.documento, LEN(TRF.documento), 1, ', ' + TAREFA.documento + ']')
			FROM
				@TAREFAS TAREFA
			WHERE
				TRF.id = @PROX_TAREFA
				AND TRF.versao = @PROX_TAREFA_VERSAO

			IF @@ROWCOUNT != 1
			BEGIN

				ROLLBACK TRANSACTION

				SELECT TOP 1 @ULTIMA_VERSAO = versao, @CONCLUIDO = concluido FROM TRF WHERE id = @TAREFA_ATUAL

				IF (NOT @CONCLUIDO IS NULL)
				BEGIN
					INSERT INTO ERR_LOG (erro, mensagem) SELECT erro, mensagem FROM ERR WHERE erro = 7010
					SELECT * FROM ERR WHERE erro = 7010
				END
				ELSE IF (@ULTIMA_VERSAO <> @VERSAO)
				BEGIN
					INSERT INTO ERR_LOG (erro, mensagem) SELECT erro, mensagem FROM ERR WHERE erro = 7450
					SELECT * FROM ERR WHERE erro = 7450
				END

				RETURN
			END

			INSERT INTO @TAREFA_NOTIFICACAO 
			SELECT id, nome, titulo, descricao, atribuir, form, parametros, prazo, criado, concluido, versao, '/tarefas/atualizada/' + LTRIM(RTRIM(atribuir)) AS topico 
			FROM TRF 
			WHERE id = @PROX_TAREFA

		END

		------------------------------------ VALIDACAO DE DADOS ----------------------------------------------

		IF @NOSSO_NUMERO = 0
		BEGIN

			ROLLBACK TRANSACTION

			INSERT INTO ERR_LOG (erro, mensagem) 
			SELECT erro, mensagem FROM ERR WHERE erro = 1234;

			SELECT * FROM ERR WHERE erro = 1234;

			RETURN 1234;
		END

		IF EXISTS(SELECT NOSSO_NUMERO FROM REC WHERE nosso_numero = @NOSSO_NUMERO)
		BEGIN

			ROLLBACK TRANSACTION

			INSERT INTO ERR_LOG (erro, mensagem) 
			SELECT erro, mensagem FROM ERR WHERE erro = 1235;

			SELECT * FROM ERR WHERE erro = 1235;

			RETURN 1235;
		END

		----------------------------------------- GRAVA RECEBIMENTO --------------------------------------------

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
			(nosso_numero, conta_contabil, cnpj/*, inscricao, fantasia, nome, logradouro, endereco, numero, complemento, bairro, municipio, cidade, cep, uf, ddd, telefone, contato*/)
		VALUES 
			(@NOSSO_NUMERO, @CONTA_CONTABIL, @CNPJ/*, @INSCRICAO, @FANTASIA, @NOME, @LOGRADOURO, @ENDERECO, @NUMERO, @COMPLEMENTO, @BAIRRO, @MUNICIPIO, @CIDADE, @CEP, @UF, @DDD, @TELEFONE, @CONTATO*/)

		INSERT INTO REC_PED (nosso_numero, numero) VALUES (@NOSSO_NUMERO, @PEDIDO)

		----------------------------------------- GRAVA PARCELAS --------------------------------------------

		INSERT INTO REC_PAR 
			(NOSSO_NUMERO, PARCELA, FORMA_PAGTO, TIPO_VENCTO, VENCTO, PRAZO, VALOR, ORIGEM)
		SELECT 
			NOSSO_NUMERO, PARCELA, FORMA_PAGTO, TIPO_VENCTO, VENCTO, PRAZO, VALOR, ORIGEM 
		FROM @PARCELAS

		-----------------------------------------------------------------------------------------------------

		COMMIT TRANSACTION

	END TRY
	BEGIN CATCH

		DECLARE @ERR_ID INT
		DECLARE @ERROR_NUMBER INT

		---------------------------- REVERTE AS ALTERACOES ----------------------------
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION

		---------------------------- CAPTURA O ERRO ----------------------------
		SET @ERROR_NUMBER = ERROR_NUMBER()

		---------------------------- REGISTRA O ERRO ----------------------------
		SET @ERR_ID = NEXT VALUE FOR err_log_seq

		INSERT INTO err_log 
			(id, erro, nivel, situacao, procedimento, linha, mensagem)
		VALUES (@ERR_ID, @ERROR_NUMBER, ERROR_SEVERITY(), ERROR_STATE(), ERROR_PROCEDURE(), ERROR_LINE(), ERROR_MESSAGE())

		---------------------------- RETORNA O ERRO PARA O CLIENTE ----------------------------
		SELECT * FROM err_log WHERE id = @ERR_ID

		RETURN @ERROR_NUMBER

	END CATCH

	---------------------------- RETORNA O RESULTADO DA OPERACAO ----------------------------
	SELECT * FROM ERR WHERE erro = 0

	---------------------------- RETORNA AS NOTIFICACOES ----------------------------
	SELECT * FROM @TAREFA_NOTIFICACAO

	RETURN 0; -- EXECUTADO COM SUCESSO

END










GO
/****** Object:  Table [dbo].[BAN]    Script Date: 24/01/2017 17:30:06 ******/
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
/****** Object:  Table [dbo].[CLI]    Script Date: 24/01/2017 17:30:06 ******/
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
/****** Object:  Table [dbo].[COB]    Script Date: 24/01/2017 17:30:06 ******/
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
 CONSTRAINT [PK_COB_1] PRIMARY KEY CLUSTERED 
(
	[carteira] ASC,
	[nosso_numero] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[COB_PAR]    Script Date: 24/01/2017 17:30:06 ******/
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
 CONSTRAINT [PK_COB_PAR_1] PRIMARY KEY CLUSTERED 
(
	[carteira] ASC,
	[nosso_numero] ASC,
	[parcela] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[CRT]    Script Date: 24/01/2017 17:30:06 ******/
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
 CONSTRAINT [PK_CNT] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[DUP]    Script Date: 24/01/2017 17:30:06 ******/
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
/****** Object:  Table [dbo].[DUP_CRT]    Script Date: 24/01/2017 17:30:06 ******/
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
/****** Object:  Table [dbo].[EMP]    Script Date: 24/01/2017 17:30:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[EMP](
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
 CONSTRAINT [PK_EMP] PRIMARY KEY CLUSTERED 
(
	[cnpj] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ERR]    Script Date: 24/01/2017 17:30:06 ******/
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
/****** Object:  Table [dbo].[ERR_LOG]    Script Date: 24/01/2017 17:30:06 ******/
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
/****** Object:  Table [dbo].[PED]    Script Date: 24/01/2017 17:30:06 ******/
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
/****** Object:  Table [dbo].[PED_CLI]    Script Date: 24/01/2017 17:30:06 ******/
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
/****** Object:  Table [dbo].[PED_DUP]    Script Date: 24/01/2017 17:30:06 ******/
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
/****** Object:  Table [dbo].[PED_REP]    Script Date: 24/01/2017 17:30:06 ******/
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
/****** Object:  Table [dbo].[REC]    Script Date: 24/01/2017 17:30:06 ******/
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
 CONSTRAINT [PK_RCB] PRIMARY KEY CLUSTERED 
(
	[nosso_numero] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[REC_PAR]    Script Date: 24/01/2017 17:30:06 ******/
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
 CONSTRAINT [PK_RCBD] PRIMARY KEY CLUSTERED 
(
	[nosso_numero] ASC,
	[parcela] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[REC_PED]    Script Date: 24/01/2017 17:30:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[REC_PED](
	[nosso_numero] [int] NOT NULL,
	[numero] [int] NOT NULL,
 CONSTRAINT [PK_RCB_PED] PRIMARY KEY CLUSTERED 
(
	[nosso_numero] ASC,
	[numero] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[REM]    Script Date: 24/01/2017 17:30:06 ******/
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
 CONSTRAINT [PK_REM] PRIMARY KEY CLUSTERED 
(
	[remessa] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[REM_PAR]    Script Date: 24/01/2017 17:30:06 ******/
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
 CONSTRAINT [PK_REM_PAR] PRIMARY KEY CLUSTERED 
(
	[remessa] ASC,
	[nosso_numero] ASC,
	[parcela] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[REP]    Script Date: 24/01/2017 17:30:06 ******/
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
/****** Object:  Table [dbo].[RET]    Script Date: 24/01/2017 17:30:06 ******/
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
 CONSTRAINT [PK_RET] PRIMARY KEY CLUSTERED 
(
	[retorno] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[RET_PAR]    Script Date: 24/01/2017 17:30:06 ******/
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
	[carteira] [int] NOT NULL,
	[forma_pagto] [varchar](10) NOT NULL,
	[tipo_vencto] [varchar](3) NOT NULL,
	[vencto] [date] NOT NULL,
	[prazo] [int] NOT NULL,
	[valor] [money] NOT NULL,
	[aceito] [bit] NOT NULL,
 CONSTRAINT [PK_RETD] PRIMARY KEY CLUSTERED 
(
	[nosso_numero] ASC,
	[parcela] ASC,
	[carteira] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[TRF]    Script Date: 24/01/2017 17:30:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TRF](
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
	[prazo] [datetime] NULL,
	[criado] [datetime] NOT NULL CONSTRAINT [DF_TAREFA_DATA_CRIACAO]  DEFAULT (getdate()),
	[concluido] [datetime] NULL,
	[versao] [timestamp] NOT NULL,
 CONSTRAINT [PK_TAREFA] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TRFN]    Script Date: 24/01/2017 17:30:06 ******/
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
/****** Object:  Table [dbo].[USR]    Script Date: 24/01/2017 17:30:06 ******/
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
/****** Object:  Index [IX_CLI]    Script Date: 24/01/2017 17:30:06 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_CLI] ON [dbo].[CLI]
(
	[nome] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_CLI_1]    Script Date: 24/01/2017 17:30:06 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_CLI_1] ON [dbo].[CLI]
(
	[fantasia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_RETD]    Script Date: 24/01/2017 17:30:06 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_RETD] ON [dbo].[RET_PAR]
(
	[nosso_numero] ASC,
	[parcela] ASC,
	[carteira] ASC
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
ALTER TABLE [dbo].[BAN]  WITH CHECK ADD  CONSTRAINT [FK_BAN_CRT] FOREIGN KEY([codigo])
REFERENCES [dbo].[CRT] ([id])
GO
ALTER TABLE [dbo].[BAN] CHECK CONSTRAINT [FK_BAN_CRT]
GO
ALTER TABLE [dbo].[DUP_CRT]  WITH CHECK ADD  CONSTRAINT [FK_DUP_CRT_CRT1] FOREIGN KEY([crt_id])
REFERENCES [dbo].[CRT] ([id])
GO
ALTER TABLE [dbo].[DUP_CRT] CHECK CONSTRAINT [FK_DUP_CRT_CRT1]
GO
ALTER TABLE [dbo].[DUP_CRT]  WITH CHECK ADD  CONSTRAINT [FK_DUP_CRT_DUP] FOREIGN KEY([dup_nosso_numero], [dup_parcela])
REFERENCES [dbo].[DUP] ([nosso_numero], [parcela])
GO
ALTER TABLE [dbo].[DUP_CRT] CHECK CONSTRAINT [FK_DUP_CRT_DUP]
GO
ALTER TABLE [dbo].[PED_CLI]  WITH CHECK ADD  CONSTRAINT [FK_PED_CLI_CLI] FOREIGN KEY([cli_cnpj])
REFERENCES [dbo].[CLI] ([cnpj])
GO
ALTER TABLE [dbo].[PED_CLI] CHECK CONSTRAINT [FK_PED_CLI_CLI]
GO
ALTER TABLE [dbo].[PED_CLI]  WITH CHECK ADD  CONSTRAINT [FK_PED_CLI_PED] FOREIGN KEY([ped_numero])
REFERENCES [dbo].[PED] ([numero])
GO
ALTER TABLE [dbo].[PED_CLI] CHECK CONSTRAINT [FK_PED_CLI_PED]
GO
ALTER TABLE [dbo].[PED_DUP]  WITH CHECK ADD  CONSTRAINT [FK_PED_DUP_DUP] FOREIGN KEY([dup_nosso_numero], [dup_parcela])
REFERENCES [dbo].[DUP] ([nosso_numero], [parcela])
GO
ALTER TABLE [dbo].[PED_DUP] CHECK CONSTRAINT [FK_PED_DUP_DUP]
GO
ALTER TABLE [dbo].[PED_DUP]  WITH CHECK ADD  CONSTRAINT [FK_PED_DUP_PED1] FOREIGN KEY([dup_nosso_numero])
REFERENCES [dbo].[PED] ([numero])
GO
ALTER TABLE [dbo].[PED_DUP] CHECK CONSTRAINT [FK_PED_DUP_PED1]
GO
ALTER TABLE [dbo].[PED_REP]  WITH CHECK ADD  CONSTRAINT [FK_PED_REP_PED] FOREIGN KEY([ped_numero])
REFERENCES [dbo].[PED] ([numero])
GO
ALTER TABLE [dbo].[PED_REP] CHECK CONSTRAINT [FK_PED_REP_PED]
GO
ALTER TABLE [dbo].[PED_REP]  WITH CHECK ADD  CONSTRAINT [FK_PED_REP_REP] FOREIGN KEY([rep_codigo])
REFERENCES [dbo].[REP] ([codigo])
GO
ALTER TABLE [dbo].[PED_REP] CHECK CONSTRAINT [FK_PED_REP_REP]
GO
ALTER TABLE [dbo].[REC]  WITH CHECK ADD  CONSTRAINT [FK_REC_EMP] FOREIGN KEY([cnpj])
REFERENCES [dbo].[EMP] ([cnpj])
GO
ALTER TABLE [dbo].[REC] CHECK CONSTRAINT [FK_REC_EMP]
GO
ALTER TABLE [dbo].[REC_PAR]  WITH CHECK ADD  CONSTRAINT [FK_RCBD_RCB] FOREIGN KEY([nosso_numero])
REFERENCES [dbo].[REC] ([nosso_numero])
GO
ALTER TABLE [dbo].[REC_PAR] CHECK CONSTRAINT [FK_RCBD_RCB]
GO
ALTER TABLE [dbo].[REC_PED]  WITH CHECK ADD  CONSTRAINT [FK_RCB_PED_RCB] FOREIGN KEY([nosso_numero])
REFERENCES [dbo].[REC] ([nosso_numero])
GO
ALTER TABLE [dbo].[REC_PED] CHECK CONSTRAINT [FK_RCB_PED_RCB]
GO
ALTER TABLE [dbo].[REM_PAR]  WITH CHECK ADD  CONSTRAINT [FK_REMD_REM] FOREIGN KEY([remessa])
REFERENCES [dbo].[REM] ([remessa])
GO
ALTER TABLE [dbo].[REM_PAR] CHECK CONSTRAINT [FK_REMD_REM]
GO
ALTER TABLE [dbo].[RET_PAR]  WITH CHECK ADD  CONSTRAINT [FK_RETD_RET] FOREIGN KEY([retorno])
REFERENCES [dbo].[RET] ([retorno])
GO
ALTER TABLE [dbo].[RET_PAR] CHECK CONSTRAINT [FK_RETD_RET]
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
