USE [master]
GO

/****** Object:  Database [BPM]    Script Date: 25/11/2016 17:39:44 ******/
CREATE DATABASE [BPM]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'BPM', FILENAME = N'F:\Databases\MSSQL11.MSSQLSERVER\MSSQL\DATA\BPM.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'BPM_log', FILENAME = N'F:\Databases\MSSQL11.MSSQLSERVER\MSSQL\DATA\BPM_log.ldf' , SIZE = 1280KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO

ALTER DATABASE [BPM] SET COMPATIBILITY_LEVEL = 110
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [BPM].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [BPM] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [BPM] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [BPM] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [BPM] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [BPM] SET ARITHABORT OFF 
GO

ALTER DATABASE [BPM] SET AUTO_CLOSE OFF 
GO

ALTER DATABASE [BPM] SET AUTO_CREATE_STATISTICS ON 
GO

ALTER DATABASE [BPM] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [BPM] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [BPM] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [BPM] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [BPM] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [BPM] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [BPM] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [BPM] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [BPM] SET  DISABLE_BROKER 
GO

ALTER DATABASE [BPM] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [BPM] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [BPM] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [BPM] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [BPM] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [BPM] SET READ_COMMITTED_SNAPSHOT OFF 
GO

ALTER DATABASE [BPM] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [BPM] SET RECOVERY FULL 
GO

ALTER DATABASE [BPM] SET  MULTI_USER 
GO

ALTER DATABASE [BPM] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [BPM] SET DB_CHAINING OFF 
GO

ALTER DATABASE [BPM] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO

ALTER DATABASE [BPM] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO

ALTER DATABASE [BPM] SET  READ_WRITE 
GO


