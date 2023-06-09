USE [Makai]
GO
/****** Object:  StoredProcedure [dbo].[ExternalLinks_Delete_ById]    Script Date: 3/30/2023 9:00:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



ALTER proc [dbo].[ExternalLinks_Delete_ById]
								@Id int
as

/*
-- =============================================
-- Author:		Starks, Thomas
-- Create date: 28FEB23
-- Description:	Deletes External Link based on the Id

-- MODIFIED BY: Author
-- MODIFIED DATE: 13MAR23
-- Code Reviewer: John Herrera
-- Note:
-- =============================================

----------------TEST CODE-----------------------
Select * from [dbo].[ExternalLinks] 
Declare @Id int = 13
Execute [dbo].[ExternalLinks_Delete_ById]
				@Id
Select * from [dbo].[ExternalLinks] 

*/

Delete e from [dbo].[ExternalLinks] e 
where e.Id = @Id

