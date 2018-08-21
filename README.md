# Cross Mountain Ranch

### Steps to add new data model
* Create table in mysql (with unique column names, and an auto-increment id int primary key)
* Alter the schema for the pageContentMaps table to include new column
* add the table name // pageContentMaps new column to the tableIdMapping
* add the field list to componentFieldMapping
* add new component logic to identifyingComponentFields
* add a new button to ContentForm