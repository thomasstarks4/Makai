USE [Makai]
GO
/****** Object:  StoredProcedure [dbo].[ExternalLinks_Select_ById]    Script Date: 3/30/2023 8:59:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER PROC [dbo].[ExternalLinks_Select_ById]
								@Id int 

AS

/*
-- =============================================
-- Author:		Starks, Thomas
-- Create date: 09FEB23
-- Description:	Selects ExternalLinks by their ID.
--				

-- MODIFIED BY: 
-- MODIFIED DATE: 13MAR23
-- Code Reviewer: John Herrera 
-- Note:
-- =============================================

----------------TEST CODE-----------------------
Declare @Id int = 29
Execute [dbo].[ExternalLinks_Select_ById]
				@Id


*/ 
BEGIN

SELECT el.Id as ExternalLinkId
	  ,el.UrlTypeId
	  ,el.Url
	  ,el.EntityId
	  ,el.EntityTypeId
	  from [dbo].[ExternalLinks] as el
	  WHERE Id = @Id
	
	  
	  
	  
	  
	  

END
	 