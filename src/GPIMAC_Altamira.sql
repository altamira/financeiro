USE [GPIMAC_Altamira]
GO

/****** Object:  Table [dbo].[INTEGRACAO_EVENTO]    Script Date: 20/02/2017 17:27:35 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[INTEGRACAO_EVENTO](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[chave] [varchar](20) NOT NULL,
	[timestamp] [datetime] NOT NULL CONSTRAINT [DF_INTEGRACAO_EVENTO_dt]  DEFAULT (getdate()),
	[origem] [varchar](50) NULL,
	[evento] [varchar](20) NOT NULL,
	[descricao] [varchar](50) NULL,
	[detalhes] [varchar](100) NULL,
	[documento] [varchar](max) NULL,
	[reconhecido] [bit] NOT NULL CONSTRAINT [DF_INTEGRACAO_EVENTO_ack]  DEFAULT ((0)),
	[uid] [uniqueidentifier] NOT NULL CONSTRAINT [DF_INTEGRACAO_EVENTO_uid]  DEFAULT (newid()),
 CONSTRAINT [PK_INTEGRACAO_EVENTO] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO









CREATE TRIGGER [dbo].[PEDIDO_LIBERADO] 
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
		(chave, origem, evento, descricao, detalhes, documento)
	SELECT
		CAST(inserted.LPPED AS VARCHAR), 
		'GPIMAC_Altamira.LPV.LpLib', 
		'PEDIDO_LIBERADO',
		'Pedido ' + CAST(inserted.LPPED AS NVARCHAR),
		LTRIM(RTRIM(ISNULL(CACLI.CCNOM, ''))),
		'{' + '"numero": "' + CAST(inserted.LPPED AS NVARCHAR(10)) + '", ' + '"cliente": {' + '"cnpj": "' + LTRIM(RTRIM(inserted.CCCGC)) + '", ' + '"nome": "' + LTRIM(RTRIM(ISNULL(CACLI.CCNOM, ''))) + '", ' + '"fantasia": "' + LTRIM(RTRIM(ISNULL(CACLI.CCFAN, ''))) + '"' + '}}'
	FROM
		inserted INNER JOIN deleted ON inserted.LPPED = deleted.LPPED INNER JOIN CACLI ON deleted.CCCGC = CACLI.CCCGC
	WHERE 
		UPDATE(LpLib) AND 
		inserted.LpLib <> deleted.LpLib AND
		inserted.LpLib = 'S' AND
		NOT EXISTS (SELECT TOP 1 id FROM INTEGRACAO_EVENTO WHERE id = inserted.LPPED AND evento = 'PEDIDO_LIBERADO')


END

GO
