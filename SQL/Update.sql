USE [Makai]
GO
/****** Object:  StoredProcedure [dbo].[ExternalLinks_Update]    Script Date: 3/30/2023 8:59:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



ALTER proc [dbo].[ExternalLinks_Update]
						@Id int 
						,@UserId int
						,@UrlTypeId int
						,@Url nvarchar(255)
						,@EntityId int
						,@EntityTypeId int
						

AS

/*
-- =============================================
-- Author:		Starks, Thomas
-- Create date: 28FEB23
-- Description:	Updates ExternalLinks table with a given Id.

-- MODIFIED BY: Author
-- MODIFIED DATE: 13MAR23
-- Code Reviewer: John Herrera
-- Note:
-- =============================================

----------------TEST CODE-----------------------
Declare @Id int = 13
		,@UserId int = 8
		,@UrlTypeId int = 4
		,@Url nvarchar(255) =  'https://www.twitter.com/3425235'
		,@EntityId int = 8594645
		,@EntityTypeId int = 5
		

Execute [dbo].[ExternalLinks_Update]
				@Id
				,@UserId
				,@UrlTypeId
				,@Url
				,@EntityId
				,@EntityTypeId
				
Select * from dbo.ExternalLinks

where Id = @Id
				

*/
BEGIN
DECLARE @DateModified datetime2(7) = GETUTCDATE()

UPDATE [dbo].[ExternalLinks]
   SET [UserId] = @UserId
      ,[UrlTypeId] = @UrlTypeId
	  ,[Url] = @Url
      ,[EntityId] = @EntityId
      ,[EntityTypeId] = @EntityTypeId
      ,[DateModified] = @DateModified


 WHERE Id = @Id
END

