USE [Makai]
GO
/****** Object:  StoredProcedure [dbo].[ExternalLinks_Insert]    Script Date: 3/30/2023 8:59:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




ALTER proc [dbo].[ExternalLinks_Insert]
						@UserId int
						,@UrlTypeId int
						,@Url nvarchar(255)
						,@EntityId int
						,@EntityTypeId int
						,@Id int output

AS

/*
-- =============================================
-- Author:		Starks, Thomas
-- Create date: 28FEB23
-- Description:	Inserts into ExternalLinks table.
--				

-- MODIFIED BY: Author
-- MODIFIED DATE: 13MAR23
-- Code Reviewer: John Herrera
-- Note:
-- =============================================

----------------TEST CODE-----------------------
Declare @UserId int = 8
		,@UrlTypeId int = 1
		,@Url nvarchar(255) = 'https://www.johnherrerassite.com/865496854'
		,@EntityId int = 456654
		,@EntityTypeId int = 3
		,@Id int = 1

Execute [dbo].[ExternalLinks_Insert]
				@UserId 
				,@UrlTypeId
				,@Url
				,@EntityId
				,@EntityTypeId
				,@Id
				
*/
BEGIN
DECLARE @DateCreated datetime2(7) = GETUTCDATE()
						,@DateModified datetime2(7) = GETUTCDATE()

INSERT INTO [dbo].[ExternalLinks]
					([UserId]
					,[UrlTypeId]
					,[Url]
					,[EntityId]
					,[EntityTypeId]
					,[DateCreated]
					,[DateModified])

VALUES
	(@UserId
	,@UrlTypeId
	,@Url
	,@EntityId
	,@EntityTypeId
	,@DateCreated
	,@DateModified)

	SET @Id = SCOPE_IDENTITY()

END
	 