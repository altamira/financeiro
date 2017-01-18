USE [master]
GO
/****** Object:  Database [FINANCEIRO]    Script Date: 18/01/2017 17:26:28 ******/
CREATE DATABASE [FINANCEIRO]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'FINANCEIRO', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\FINANCEIRO.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'FINANCEIRO_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\FINANCEIRO_log.ldf' , SIZE = 69760KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
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
/****** Object:  User [financeiro]    Script Date: 18/01/2017 17:26:28 ******/
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
/****** Object:  Sequence [dbo].[ERR_LOG_SEQ]    Script Date: 18/01/2017 17:26:28 ******/
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
/****** Object:  Sequence [dbo].[REMESSA_SEQ]    Script Date: 18/01/2017 17:26:28 ******/
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
/****** Object:  Sequence [dbo].[RETORNO_SEQ]    Script Date: 18/01/2017 17:26:28 ******/
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
/****** Object:  Sequence [dbo].[TAREFA_NAV_SEQ]    Script Date: 18/01/2017 17:26:28 ******/
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
/****** Object:  Sequence [dbo].[TAREFA_SEQ]    Script Date: 18/01/2017 17:26:28 ******/
CREATE SEQUENCE [dbo].[TAREFA_SEQ] 
 AS [int]
 START WITH 1
 INCREMENT BY 1
 MINVALUE -2147483648
 MAXVALUE 2147483647
 CACHE 
GO
/****** Object:  StoredProcedure [dbo].[LANCAMENTO_CONTAS_RECEBER]    Script Date: 18/01/2017 17:26:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[LANCAMENTO_CONTAS_RECEBER]

	@TAREFA_ATUAL INT,
	@VERSAO INT,

	@NOSSO_NUMERO INT,
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

	@PARCELA INT = NULL,
	@FORMA_PAGTO VARCHAR(10) = NULL,
	@TIPO_VENCTO VARCHAR(3) = NULL,
	@VENCTO DATE = NULL,
	@PRAZO INT = NULL,
	@PORCENTAGEM DECIMAL(18, 3) = NULL,
	@VALOR MONEY = NULL,
	@DESCRICAO VARCHAR(50) = NULL,
	@ORIGEM VARCHAR(10) = NULL

AS
BEGIN
	SET NOCOUNT ON;

	------------------------------------- DECLARACAO DE VARIAVEIS ----------------------------------------------
	/*DECLARE @NOSSO_NUMERO INT
	DECLARE @CONTA_CONTABIL VARCHAR(20)
	DECLARE @CNPJ VARCHAR(20)
	DECLARE @INSCRICAO VARCHAR(12)
	DECLARE @FANTASIA VARCHAR(30)
	DECLARE @NOME VARCHAR(100)
	DECLARE @LOGRADOURO VARCHAR(5)
	DECLARE @ENDERECO VARCHAR(50)
	DECLARE @NUMERO VARCHAR(10)
	DECLARE @COMPLEMENTO VARCHAR(20)
	DECLARE @BAIRRO VARCHAR(30)
	DECLARE @MUNICIPIO INT
	DECLARE @CIDADE VARCHAR(20)
	DECLARE @CEP CHAR(9)
	DECLARE @UF CHAR(2)
	DECLARE @DDD VARCHAR(3)
	DECLARE @TELEFONE VARCHAR(15)
	DECLARE @CONTATO VARCHAR(20)

	DECLARE @PARCELA INT
	DECLARE @FORMA_PAGTO VARCHAR(10)
	DECLARE @TIPO_VENCTO VARCHAR(3)
	DECLARE @VENCTO DATE
	DECLARE @PRAZO INT
	DECLARE @PORCENTAGEM DECIMAL(18, 3)
	DECLARE @VALOR MONEY
	DECLARE @DESCRICAO VARCHAR(50)
	DECLARE @ORIGEM VARCHAR(10)

	DECLARE @TAREFA_ATUAL INT
	DECLARE @VERSAO INT*/

	DECLARE @ULTIMA_VERSAO INT
	DECLARE @CONCLUIDO DATETIME

	DECLARE @PROX_TAREFA INT
	DECLARE @PROX_TAREFA_VERSAO INT

	DECLARE @NOVA_NAV INT

	DECLARE @TRF TABLE (
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
		[versao] [int],
		[topico] [nvarchar](100) NOT NULL)

	/*IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION*/
        
	BEGIN TRY
		BEGIN TRANSACTION

		-------------------------------------- ATUALIZACAO DAS TAREFAS ----------------------------------------------
		--SET @TAREFA_ATUAL = CAST('${msg.req.params.tarefa}' AS INT) 
		--SET @VERSAO = CAST('${msg.payload.versao}' AS INT) 

		UPDATE TRF SET
			concluido = GETDATE()
		WHERE
			id = @TAREFA_ATUAL AND
			concluido IS NULL AND
			versao = @VERSAO

		IF @@ROWCOUNT != 1
		BEGIN

			ROLLBACK TRANSACTION

			SELECT TOP 1 @ULTIMA_VERSAO = versao, @CONCLUIDO = concluido FROM TRF WHERE id = @TAREFA_ATUAL

			IF @@ROWCOUNT != 1
			BEGIN
				INSERT INTO ERR_LOG (erro, mensagem, procedimento) SELECT erro, mensagem, ERROR_PROCEDURE() FROM ERR WHERE erro = 7015;

				SELECT * FROM ERR WHERE erro = 7015;

				RETURN 7015;
			END

			IF (NOT @CONCLUIDO IS NULL)
			BEGIN
				INSERT INTO ERR_LOG (erro, mensagem, procedimento) SELECT erro, mensagem, ERROR_PROCEDURE() FROM ERR WHERE erro = 7010;

				SELECT * FROM ERR WHERE erro = 7010;

				RETURN 7010;
			END
			ELSE IF (@ULTIMA_VERSAO <> @VERSAO)
			BEGIN
				INSERT INTO ERR_LOG (erro, mensagem, procedimento) SELECT erro, mensagem, ERROR_PROCEDURE() FROM ERR WHERE erro = 7450;

				SELECT * FROM ERR WHERE erro = 7450;

				RETURN 7450;
			END

			SELECT '9999' AS erro, 'Erro interno ao concluir uma tarefa, contate o suporte técnico' AS mensagem;

			RETURN 9999
		END

		INSERT INTO @TRF 
		SELECT id, nome, titulo, descricao, atribuir, form, parametros, prazo, criado, concluido, versao, '/tarefas/concluida/' + LTRIM(RTRIM(atribuir)) AS topico 
		FROM TRF WHERE id = @TAREFA_ATUAL

/*

	(msg.payload.documento.parcelas.find( p => p.forma_pagto === 'COBRANCA') ?

	`
		SELECT TOP 1 @PROX_TAREFA = id, @PROX_TAREFA_VERSAO = versao FROM TRF WHERE nome = '${tarefa_cobranca.nome}' AND concluido IS NULL

		IF @PROX_TAREFA IS NULL
		BEGIN

			SET @PROX_TAREFA = NEXT VALUE FOR tarefa_seq

			INSERT INTO TRF
				(id,
				nome,
				titulo,
				descricao,
				documento,
				atribuir,
				form,
				parametros,
				prazo,
				criado,
				concluido)
			VALUES
				(@PROX_TAREFA,
				'${tarefa_cobranca.nome}',
				'${tarefa_cobranca.titulo}',
				'${tarefa_cobranca.descricao}',
				'[${tarefa_cobranca.documento}]', 
				'${tarefa_cobranca.atribuir}',
				'${tarefa_cobranca.form}',
				NULL,
				NULL,
				GETDATE(),
				NULL)

			INSERT INTO @TRF SELECT id, nome, titulo, descricao, atribuir, form, parametros, prazo, criado, concluido, versao, '/tarefas/nova/' + LTRIM(RTRIM(atribuir)) AS topico FROM TRF WHERE id = @PROX_TAREFA

			SET @NOVA_NAV = NEXT VALUE FOR tarefa_nav_seq

			INSERT TRFN (transacao, tarefa_origem, tarefa_destino) VALUES (NEXT VALUE FOR tarefa_nav_seq, @TAREFA_ATUAL, @PROX_TAREFA)

		END
		ELSE
		BEGIN

			UPDATE TRF SET
				descricao = 'Saldo R$ ${msg.payload.documento.parcelas.reduce( (total, parcela) => total + parcela.valor, 0).toFixed(2).replace('.', ',')}',
				documento = STUFF(documento, LEN(documento), 1, ', ${tarefa_cobranca.documento}' + ']')
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
	   -- nenhuma tarefa nova será criada porque em nenhuma parcela a forma de pagto é COBRANCA --
	`

	) +

	`
		------------------------------------ VALIDACAO DE DADOS ----------------------------------------------

		SET @NOSSO_NUMERO = CAST('${msg.payload.documento.nosso_numero}' AS INT)

		IF EXISTS(SELECT NOSSO_NUMERO FROM RCB WHERE nosso_numero = @NOSSO_NUMERO)
		BEGIN

			ROLLBACK TRANSACTION

			INSERT INTO ERR_LOG (erro, mensagem) SELECT erro, mensagem FROM ERR WHERE erro = 1234
			SELECT * FROM ERR WHERE erro = 1234

			RETURN
		END

		----------------------------------------- ATRIBUICAO DE VALORES DE PARAMETROS --------------------------------------------
		SET @CONTA_CONTABIL = CAST('${msg.payload.documento.cliente.conta_contabil}' AS VARCHAR(20))
		SET @CNPJ = CAST('${msg.payload.documento.cliente.cnpj}' AS VARCHAR(20))
		SET @INSCRICAO = CAST('${msg.payload.documento.cliente.inscricao}' AS VARCHAR(14))
		SET @FANTASIA = CAST('${msg.payload.documento.cliente.fantasia}' AS VARCHAR(30))
		SET @NOME = CAST('${msg.payload.documento.cliente.nome}' AS VARCHAR(100))
		SET @LOGRADOURO = CAST('${msg.payload.documento.cliente.logradouro}' AS VARCHAR(5))
		SET @ENDERECO = CAST('${msg.payload.documento.cliente.endereco}' AS VARCHAR(50))
		SET @NUMERO = CAST('${msg.payload.documento.cliente.numero}' AS VARCHAR(10))
		SET @COMPLEMENTO = CAST('${msg.payload.documento.cliente.complemento}' AS VARCHAR(20))
		SET @BAIRRO = CAST('${msg.payload.documento.cliente.bairro}' AS VARCHAR(30))
		SET @MUNICIPIO = CAST('${msg.payload.documento.cliente.municipio}' AS INT)
		SET @CIDADE = CAST('${msg.payload.documento.cliente.cidade}' AS VARCHAR(20))
		SET @CEP = CAST('${msg.payload.documento.cliente.CEP}' AS CHAR(9))
		SET @UF = CAST('${msg.payload.documento.cliente.UF}' AS CHAR(2))
		SET @DDD = CAST('${msg.payload.documento.cliente.ddd}' AS VARCHAR(3))
		SET @TELEFONE = CAST('${msg.payload.documento.cliente.telefone}' AS VARCHAR(15))
		SET @CONTATO = CAST('${msg.payload.documento.cliente.contato}' AS VARCHAR(20))

		INSERT INTO RCB (nosso_numero, conta_contabil, cnpj, inscricao, fantasia, nome, logradouro, endereco, numero, complemento, bairro, municipio, cidade, cep, uf, ddd, telefone, contato)
		VALUES (@NOSSO_NUMERO, @CONTA_CONTABIL, @CNPJ, @INSCRICAO, @FANTASIA, @NOME, @LOGRADOURO, @ENDERECO, @NUMERO, @COMPLEMENTO, @BAIRRO, @MUNICIPIO, @CIDADE, @CEP, @UF, @DDD, @TELEFONE, @CONTATO)

		DECLARE @PEDIDO_NUMERO INT

		SET @PEDIDO_NUMERO = CAST('${msg.payload.documento.numero}' AS INT)

		INSERT INTO RCB_PED (nosso_numero, numero) VALUES (@NOSSO_NUMERO, @PEDIDO_NUMERO)
	` +

	msg.payload.documento.parcelas.reduce ( (sql, parcela) =>
    
		sql + 
	`
		SET @PARCELA = CAST('${parcela.parcela}' AS INT)
		SET @FORMA_PAGTO = CAST('${parcela.forma_pagto}' AS VARCHAR(10))
		SET @TIPO_VENCTO = CAST('${parcela.tipo_vencto}' AS VARCHAR(3))
		SET @VENCTO = CAST('${parcela.vencto}' AS DATE)
		SET @PRAZO = CAST('${parcela.prazo}' AS INT)
		SET @VALOR = CAST('${parcela.valor}' AS MONEY)
		SET @ORIGEM = CAST('${parcela.origem}' AS VARCHAR(10))
    
		INSERT INTO RCBD (NOSSO_NUMERO, PARCELA, FORMA_PAGTO, TIPO_VENCTO, VENCTO, PRAZO, VALOR, ORIGEM)
		VALUES (@NOSSO_NUMERO, @PARCELA, @FORMA_PAGTO, @TIPO_VENCTO, @VENCTO, @PRAZO, @VALOR, @ORIGEM)

	`
	, '') +

*/
		COMMIT TRANSACTION

	END TRY
	BEGIN CATCH

		DECLARE @ERR_ID INT
		DECLARE @ERROR_NUMBER INT
		DECLARE @ERROR_SEVERITY INT
		DECLARE @ERROR_STATE INT
		DECLARE @ERROR_PROCEDURE INT
		DECLARE @ERROR_LINE INT
		DECLARE @ERROR_MESSAGE NVARCHAR(MAX)

		SET @ERROR_NUMBER = ERROR_NUMBER()
		SET @ERROR_SEVERITY = ERROR_SEVERITY()
		SET @ERROR_STATE = ERROR_STATE()
		SET @ERROR_PROCEDURE = ERROR_PROCEDURE()
		SET @ERROR_LINE = ERROR_LINE()
		SET @ERROR_MESSAGE = ERROR_MESSAGE()

		ROLLBACK TRANSACTION

		SET @ERR_ID = NEXT VALUE FOR err_log_seq
		INSERT INTO err_log SELECT @ERR_ID AS id, @ERROR_NUMBER AS erro, @ERROR_SEVERITY AS nivel, @ERROR_STATE AS situacao, @ERROR_PROCEDURE AS procedimento, @ERROR_LINE AS linha, @ERROR_MESSAGE AS mensagem

		SELECT * FROM err_log WHERE id = @ERR_ID

		RETURN
	END CATCH

	SELECT * FROM @TRF
END


GO
/****** Object:  Table [dbo].[BAN]    Script Date: 18/01/2017 17:26:28 ******/
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
/****** Object:  Table [dbo].[CLI]    Script Date: 18/01/2017 17:26:28 ******/
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
/****** Object:  Table [dbo].[COB]    Script Date: 18/01/2017 17:26:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[COB](
	[nosso_numero] [int] NOT NULL,
	[parcela] [int] NOT NULL,
	[carteira] [int] NOT NULL,
	[remessa] [date] NOT NULL,
	[retorno] [date] NULL,
	[situacao] [varchar](10) NULL,
	[conta_contabil] [varchar](56) NOT NULL,
	[forma_pagto] [varchar](10) NOT NULL,
	[tipo_vencto] [varchar](3) NOT NULL,
	[vencto] [date] NOT NULL,
	[prazo] [int] NOT NULL,
	[valor] [money] NOT NULL,
	[origem] [varchar](10) NOT NULL,
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
 CONSTRAINT [PK_COB] PRIMARY KEY CLUSTERED 
(
	[nosso_numero] ASC,
	[parcela] ASC,
	[carteira] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[CRT]    Script Date: 18/01/2017 17:26:28 ******/
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
/****** Object:  Table [dbo].[DUP]    Script Date: 18/01/2017 17:26:28 ******/
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
/****** Object:  Table [dbo].[DUP_CRT]    Script Date: 18/01/2017 17:26:28 ******/
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
/****** Object:  Table [dbo].[ERR]    Script Date: 18/01/2017 17:26:28 ******/
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
/****** Object:  Table [dbo].[ERR_LOG]    Script Date: 18/01/2017 17:26:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ERR_LOG](
	[id] [int] IDENTITY(1,1) NOT NULL,
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
/****** Object:  Table [dbo].[PED]    Script Date: 18/01/2017 17:26:28 ******/
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
/****** Object:  Table [dbo].[PED_CLI]    Script Date: 18/01/2017 17:26:28 ******/
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
/****** Object:  Table [dbo].[PED_DUP]    Script Date: 18/01/2017 17:26:28 ******/
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
/****** Object:  Table [dbo].[PED_REP]    Script Date: 18/01/2017 17:26:28 ******/
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
/****** Object:  Table [dbo].[RCB]    Script Date: 18/01/2017 17:26:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[RCB](
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
/****** Object:  Table [dbo].[RCB_PED]    Script Date: 18/01/2017 17:26:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RCB_PED](
	[nosso_numero] [int] NOT NULL,
	[numero] [int] NOT NULL,
 CONSTRAINT [PK_RCB_PED] PRIMARY KEY CLUSTERED 
(
	[nosso_numero] ASC,
	[numero] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[RCBD]    Script Date: 18/01/2017 17:26:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[RCBD](
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
/****** Object:  Table [dbo].[REM]    Script Date: 18/01/2017 17:26:28 ******/
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
/****** Object:  Table [dbo].[REMD]    Script Date: 18/01/2017 17:26:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[REMD](
	[remessa] [int] NOT NULL,
	[nosso_numero] [int] NOT NULL,
	[parcela] [int] NOT NULL,
	[carteira] [int] NOT NULL,
	[forma_pagto] [varchar](10) NOT NULL,
	[tipo_vencto] [varchar](3) NOT NULL,
	[vencto] [date] NOT NULL,
	[prazo] [int] NOT NULL,
	[valor] [money] NOT NULL,
 CONSTRAINT [PK_REMD] PRIMARY KEY CLUSTERED 
(
	[nosso_numero] ASC,
	[parcela] ASC,
	[carteira] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[REP]    Script Date: 18/01/2017 17:26:28 ******/
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
/****** Object:  Table [dbo].[RET]    Script Date: 18/01/2017 17:26:28 ******/
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
/****** Object:  Table [dbo].[RETD]    Script Date: 18/01/2017 17:26:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[RETD](
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
/****** Object:  Table [dbo].[TRF]    Script Date: 18/01/2017 17:26:28 ******/
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
/****** Object:  Table [dbo].[TRFN]    Script Date: 18/01/2017 17:26:28 ******/
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
/****** Object:  Table [dbo].[USR]    Script Date: 18/01/2017 17:26:28 ******/
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
/****** Object:  Index [IX_CLI]    Script Date: 18/01/2017 17:26:28 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_CLI] ON [dbo].[CLI]
(
	[nome] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_CLI_1]    Script Date: 18/01/2017 17:26:28 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_CLI_1] ON [dbo].[CLI]
(
	[fantasia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_REMD]    Script Date: 18/01/2017 17:26:28 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_REMD] ON [dbo].[REMD]
(
	[nosso_numero] ASC,
	[parcela] ASC,
	[carteira] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_RETD]    Script Date: 18/01/2017 17:26:28 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_RETD] ON [dbo].[RETD]
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
ALTER TABLE [dbo].[RETD] ADD  CONSTRAINT [DF_RETD_aceito]  DEFAULT ((0)) FOR [aceito]
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
ALTER TABLE [dbo].[RCB_PED]  WITH CHECK ADD  CONSTRAINT [FK_RCB_PED_RCB] FOREIGN KEY([nosso_numero])
REFERENCES [dbo].[RCB] ([nosso_numero])
GO
ALTER TABLE [dbo].[RCB_PED] CHECK CONSTRAINT [FK_RCB_PED_RCB]
GO
ALTER TABLE [dbo].[RCBD]  WITH CHECK ADD  CONSTRAINT [FK_RCBD_RCB] FOREIGN KEY([nosso_numero])
REFERENCES [dbo].[RCB] ([nosso_numero])
GO
ALTER TABLE [dbo].[RCBD] CHECK CONSTRAINT [FK_RCBD_RCB]
GO
ALTER TABLE [dbo].[REMD]  WITH CHECK ADD  CONSTRAINT [FK_REMD_COB] FOREIGN KEY([nosso_numero], [parcela], [carteira])
REFERENCES [dbo].[COB] ([nosso_numero], [parcela], [carteira])
GO
ALTER TABLE [dbo].[REMD] CHECK CONSTRAINT [FK_REMD_COB]
GO
ALTER TABLE [dbo].[REMD]  WITH CHECK ADD  CONSTRAINT [FK_REMD_REM] FOREIGN KEY([remessa])
REFERENCES [dbo].[REM] ([remessa])
GO
ALTER TABLE [dbo].[REMD] CHECK CONSTRAINT [FK_REMD_REM]
GO
ALTER TABLE [dbo].[RETD]  WITH CHECK ADD  CONSTRAINT [FK_RETD_COB] FOREIGN KEY([nosso_numero], [parcela], [carteira])
REFERENCES [dbo].[COB] ([nosso_numero], [parcela], [carteira])
GO
ALTER TABLE [dbo].[RETD] CHECK CONSTRAINT [FK_RETD_COB]
GO
ALTER TABLE [dbo].[RETD]  WITH CHECK ADD  CONSTRAINT [FK_RETD_RET] FOREIGN KEY([retorno])
REFERENCES [dbo].[RET] ([retorno])
GO
ALTER TABLE [dbo].[RETD] CHECK CONSTRAINT [FK_RETD_RET]
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
