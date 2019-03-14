USE [AstirTrotterDB]
GO
/****** Object:  Table [dbo].[Logs]    Script Date: 3/14/2019 11:53:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Logs](
	[CalledAt] [datetime] NOT NULL,
	[Method] [nvarchar](16) NOT NULL,
	[Request] [nvarchar](50) NOT NULL,
	[Response] [nvarchar](512) NOT NULL,
	[CallerIP] [nvarchar](16) NOT NULL,
	[CallerLocation] [nvarchar](50) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tokens]    Script Date: 3/14/2019 11:53:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tokens](
	[Token] [nvarchar](512) NOT NULL,
	[UserID] [nvarchar](32) NOT NULL,
	[CreatedAt] [datetime] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 3/14/2019 11:53:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserID] [nvarchar](32) NOT NULL,
	[FirstName] [nvarchar](20) NOT NULL,
	[LastName] [nvarchar](20) NOT NULL,
	[NickName] [nvarchar](50) NULL,
	[Gender] [bit] NOT NULL,
	[Birthday] [date] NOT NULL,
	[BirthPlayce] [nvarchar](256) NULL,
	[Address] [nvarchar](256) NULL,
	[ClassOrigin] [nvarchar](20) NULL,
	[SocialOrigin] [nvarchar](20) NULL,
	[NationalOrigin] [nvarchar](20) NULL,
	[Nationality] [nvarchar](20) NULL,
	[Picture] [image] NULL,
	[PhoneNumbers] [nvarchar](128) NULL,
	[Emails] [nvarchar](128) NULL,
	[MoreContactInfos] [nvarchar](128) NULL,
	[FatherID] [nvarchar](32) NULL,
	[MotherID] [nvarchar](32) NULL,
	[SpouseID] [nvarchar](32) NULL,
	[Verified] [bit] NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[DeletedAt] [datetime] NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UsersAbout]    Script Date: 3/14/2019 11:53:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsersAbout](
	[UserID] [nvarchar](32) NOT NULL,
	[AboutText] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UsersEducationHistory]    Script Date: 3/14/2019 11:53:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsersEducationHistory](
	[UserID] [nvarchar](32) NOT NULL,
	[PeriodStart] [date] NOT NULL,
	[PeriodEnd] [date] NULL,
	[SchoolName] [nvarchar](128) NOT NULL,
	[SchoolAddress] [nvarchar](256) NOT NULL,
	[Degree] [nvarchar](50) NULL,
	[Details] [nvarchar](512) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UsersSettings]    Script Date: 3/14/2019 11:53:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsersSettings](
	[UserID] [nvarchar](32) NOT NULL,
	[Credential] [nvarchar](50) NOT NULL,
	[ShareLevel] [xml] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Version]    Script Date: 3/14/2019 11:53:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Version](
	[Ver] [int] NOT NULL
) ON [PRIMARY]
GO
