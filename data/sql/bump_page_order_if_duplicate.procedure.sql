CREATE DEFINER=`admin`@`%` PROCEDURE `bump_page_order_if_duplicate`(IN newOrderIndex INT)
begin
  IF EXISTS (select pageOrder from content.pages where content.pages.pageOrder = newOrderIndex) THEN
	UPDATE content.pages
	SET pageOrder = pageOrder + 1
	WHERE pageOrder >= newOrderIndex
	AND content.pages.id <> 0;
  END IF;
END