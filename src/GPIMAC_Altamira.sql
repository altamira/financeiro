USE [GPIMAC_Altamira]
GO

/****** Object:  Table [dbo].[INTEGRACAO_EVENTO]    Script Date: 01/02/2017 17:40:39 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[INTEGRACAO_EVENTO](
	[sequencia] [int] IDENTITY(1,1) NOT NULL,
	[id] [int] NOT NULL,
	[uid] [uniqueidentifier] NOT NULL CONSTRAINT [DF_INTEGRACAO_EVENTO_uid]  DEFAULT (newid()),
	[timestamp] [datetime] NOT NULL CONSTRAINT [DF_INTEGRACAO_EVENTO_dt]  DEFAULT (getdate()),
	[evento] [nvarchar](50) NOT NULL,
	[descricao] [nvarchar](50) NULL,
	[detalhes] [nvarchar](100) NULL,
	[documento] [varchar](max) NULL,
	[reconhecido] [bit] NOT NULL CONSTRAINT [DF_INTEGRACAO_EVENTO_ack]  DEFAULT ((0)),
 CONSTRAINT [PK_INTEGRACAO_EVENTO] PRIMARY KEY CLUSTERED 
(
	[sequencia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


USE [GPIMAC_Altamira]
GO

/****** Object:  Trigger [dbo].[INTEGRACAO_EVENTO_PEDIDO_LIBERADO]    Script Date: 01/02/2017 17:41:10 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO








CREATE TRIGGER [dbo].[INTEGRACAO_EVENTO_PEDIDO_LIBERADO] 
   ON  [dbo].[LPV] 
   FOR UPDATE
AS 
BEGIN
	SET NOCOUNT ON;
		
	/*********************************************************************************************************
	* Evento: Pedido Liberado
	----------------------------------------------------------------------------------------------------------
	* Ocorre após o pedido ser cadastrado no sistema GPIMAC
	* O capmo flag LPV.LpLib muda de 'N' para 'S'
	*********************************************************************************************************/
	INSERT INTO INTEGRACAO_EVENTO 
		(id, evento, descricao, detalhes, documento)
	SELECT
		inserted.LPPED, 
		'PEDIDO_LIBERADO', 
		'Pedido ' + CAST(inserted.LPPED AS NVARCHAR),
		LTRIM(RTRIM(ISNULL(CACLI.CCFAN, ''))),
		'{' + '"numero": "' + CAST(inserted.LPPED AS NVARCHAR(10)) + '", ' + '"cliente": {' + '"cnpj": "' + LTRIM(RTRIM(inserted.CCCGC)) + '", ' + '"nome": "' + LTRIM(RTRIM(ISNULL(CACLI.CCNOM, ''))) + '", ' + '"fantasia": "' + LTRIM(RTRIM(ISNULL(CACLI.CCFAN, ''))) + '"' + '}}'
	FROM
		inserted INNER JOIN deleted ON inserted.LPPED = deleted.LPPED INNER JOIN CACLI ON deleted.CCCGC = CACLI.CCCGC
	WHERE 
		UPDATE(LpLib) AND 
		inserted.LpLib <> deleted.LpLib AND
		inserted.LpLib = 'S' AND
		NOT EXISTS (SELECT TOP 1 id FROM INTEGRACAO_EVENTO WHERE id = inserted.LPPED AND evento = 'PEDIDO_LIBERADO')

	/*********************************************************************************************************
	* Evento: Pedido Liberado Novamente
	----------------------------------------------------------------------------------------------------------
	* Ocorre após o pedido já ter sido liberado 1 ou mais vezes
	* O campo flag LPV.LpLib muda de 'N' para 'S'
	*********************************************************************************************************/
	INSERT INTO INTEGRACAO_EVENTO 
		(id, evento, descricao, detalhes, documento)
	SELECT
		inserted.LPPED, 
		'PEDIDO_LIBERADO_NOVAMENTE', 
		'Pedido ' + CAST(inserted.LPPED AS NVARCHAR),
		LTRIM(RTRIM(ISNULL(CACLI.CCFAN, ''))),
		'{' + '"numero": "' + CAST(inserted.LPPED AS NVARCHAR(10)) + '", ' + '"cliente": {' + '"cnpj": "' + LTRIM(RTRIM(inserted.CCCGC)) + '", ' + '"nome": "' + LTRIM(RTRIM(ISNULL(CACLI.CCNOM, ''))) + '", ' + '"fantasia": "' + LTRIM(RTRIM(ISNULL(CACLI.CCFAN, ''))) + '"' + '}}'
	FROM
		inserted INNER JOIN deleted ON inserted.LPPED = deleted.LPPED INNER JOIN CACLI ON deleted.CCCGC = CACLI.CCCGC
	WHERE 
		UPDATE(LpLib) AND 
		inserted.LpLib <> deleted.LpLib AND
		inserted.LpLib = 'S' AND
		EXISTS (SELECT TOP 1 id FROM INTEGRACAO_EVENTO WHERE id = inserted.LPPED AND evento = 'PEDIDO_LIBERADO')


	/*********************************************************************************************************
	* Evento: Pedido Retido em Vendas
	----------------------------------------------------------------------------------------------------------
	* Ocorre quando o campo 'Liberar Pedido' é desmarcado em um Pedido que já foi liberado.
	* O campo flag LPV.LpLib muda de 'S' para 'N'
	*********************************************************************************************************/
	INSERT INTO INTEGRACAO_EVENTO 
		(id, evento, descricao, detalhes, documento)
	SELECT
		inserted.LPPED, 
		'PEDIDO_RETIDO_EM_VENDAS', 
		'Pedido ' + CAST(inserted.LPPED AS NVARCHAR),
		LTRIM(RTRIM(ISNULL(CACLI.CCFAN, ''))),
		'{' + '"numero": "' + CAST(inserted.LPPED AS NVARCHAR(10)) + '", ' + '"cliente": {' + '"cnpj": "' + LTRIM(RTRIM(inserted.CCCGC)) + '", ' + '"nome": "' + LTRIM(RTRIM(ISNULL(CACLI.CCNOM, ''))) + '", ' + '"fantasia": "' + LTRIM(RTRIM(ISNULL(CACLI.CCFAN, ''))) + '"' + '}}'
	FROM
		inserted INNER JOIN deleted ON inserted.LPPED = deleted.LPPED INNER JOIN CACLI ON deleted.CCCGC = CACLI.CCCGC
	WHERE 
		UPDATE(LpLib) AND 
		inserted.LpLib <> deleted.LpLib AND
		inserted.LpLib = 'N' AND
		EXISTS (SELECT TOP 1 id FROM INTEGRACAO_EVENTO WHERE id = inserted.LPPED AND evento = 'PEDIDO_LIBERADO')

END








GO


