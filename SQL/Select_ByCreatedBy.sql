USE [Makai]
GO
/****** Object:  StoredProcedure [dbo].[ExternalLinks_Select_ByCreatedBy]    Script Date: 3/30/2023 8:47:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




ALTER PROC [dbo].[ExternalLinks_Select_ByCreatedBy]
					@Id int 

AS

/*
-- =============================================
-- Author:		Starks, Thomas
-- Create date: 28FEB23
-- Description:	Selects all ExternalLinks by the User that created them.
--				

-- MODIFIED BY: Author
-- MODIFIED DATE: 13MAR23
-- Code Reviewer: John Herrera 
-- Note:
-- =============================================

----------------TEST CODE-----------------------
Declare @Id int = 8
Execute [dbo].[ExternalLinks_Select_ByCreatedBy]
				@Id


*/ 
BEGIN

Select el.Id as ExternalLinkId
	  ,ut.Id as UrlTypeId
	  ,ut.Name as UrlType
	  ,el.Url
	  ,el.EntityId
	  ,el.EntityTypeId
	  ,et.Name
	  ,el.UserId
	  ,u.FirstName as UserFirstName
	  ,u.LastName as UserLastName
	  ,u.Mi as UserMiddleInitial
	  ,u.AvatarUrl as AvatarUrl
	  from [dbo].[ExternalLinks] as el
	  inner join [dbo].[UrlTypes] as ut
	  on el.UrlTypeId = ut.Id
	  inner join [dbo].[Users] AS u 
	  on u.Id = el.UserId
	  inner join [dbo].EntityTypes as et
	  on el.EntityTypeId = et.Id
	  where @Id = u.Id

	  
	  
	  
	  
	  

END
	 
