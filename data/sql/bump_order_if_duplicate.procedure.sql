DROP PROCEDURE IF EXISTS bump_order_if_duplicate;
DELIMITER $$
create procedure bump_order_if_duplicate(IN newOrderIndex INT, IN existingPageId INT)
begin
  IF EXISTS (select orderWeight from content.pageContentMaps where content.pageContentMaps.pageId = existingPageId AND content.pageContentMaps.orderWeight = newOrderIndex) THEN
	UPDATE content.pageContentMaps
	SET orderWeight = orderWeight + 1
	WHERE pageId = existingPageId
	AND orderWeight >= newOrderIndex;
  END IF;
END$$