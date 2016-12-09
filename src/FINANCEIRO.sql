USE [master]
GO

/****** Object:  Database [FINANCEIRO]    Script Date: 09/12/2016 17:38:04 ******/
CREATE DATABASE [FINANCEIRO]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'FINANCEIRO', FILENAME = N'F:\Databases\MSSQL11.MSSQLSERVER\MSSQL\DATA\FINANCEIRO.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'FINANCEIRO_log', FILENAME = N'F:\Databases\MSSQL11.MSSQLSERVER\MSSQL\DATA\FINANCEIRO_log.ldf' , SIZE = 18240KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
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

ALTER DATABASE [FINANCEIRO] SET  READ_WRITE 
GO


