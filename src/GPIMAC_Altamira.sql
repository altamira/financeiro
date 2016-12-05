USE [GPIMAC_Altamira]
GO

/****** Object:  Table [dbo].[INTEGRACAO_EVENTO]    Script Date: 05/12/2016 18:13:33 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[INTEGRACAO_EVENTO](
	[sequencial] [int] IDENTITY(1,1) NOT NULL,
	[evento] [nvarchar](20) NOT NULL,
	[timestamp] [datetime] NOT NULL CONSTRAINT [DF_INTEGRACAO_EVENTO_dt]  DEFAULT (getdate()),
	[id] [nvarchar](50) NOT NULL,
	[antes] [nvarchar](100) NOT NULL,
	[depois] [nvarchar](100) NOT NULL,
	[reconhecido] [bit] NOT NULL CONSTRAINT [DF_INTEGRACAO_EVENTO_ack]  DEFAULT ((0)),
	[msg] [varchar](max) NULL,
 CONSTRAINT [PK_INTEGRACAO_EVENTO] PRIMARY KEY CLUSTERED 
(
	[sequencial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


CREATE TRIGGER [dbo].[INTEGRACAO_EVENTO_PEDIDO_LIBERADO] 
   ON  [dbo].[LPV] 
   FOR UPDATE
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @antes CHAR(1)
	DECLARE @depois  CHAR(1)

	SET @antes = (SELECT LpLib FROM deleted)
	SET @depois  = (SELECT LpLib FROM inserted)

	IF	(UPDATE(LpLib) AND @antes <> @depois)
	BEGIN
		INSERT INTO INTEGRACAO_EVENTO 
		SELECT 'PEDIDO_LIBERADO', GETDATE(), inserted.LPPED, deleted.LpLib, inserted.LpLib, 0, 
				'{ ' +
				'"numero": "' + RTRIM(ISNULL(inserted.LPPED,'')) + '", ' +
				'"cliente": { ' +
					'"cnpj": "' + RTRIM(ISNULL(inserted.CCCGC,'')) + '"' +
				' }}'
		FROM deleted, inserted
	END

END

