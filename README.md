# Cross Mountain Ranch
![Build Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiWEEveFhjYjQ3WGxvWGxMaWdVRHY2ay9DQmhoOVhCWSs5NHdoMkt1TEFSTnZPTFR6ckhzTTd1SXp2b1J4Mmgrd2Q2QlZKZzg2MGtsUTNLTEZUQjB0RDNnPSIsIml2UGFyYW1ldGVyU3BlYyI6Ilo3VDY2ci9OTEx6Ykl6R3UiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

### Steps to add new data model
* Create table in mysql (with unique column names, and an auto-increment id int primary key)
* Alter the schema for the pageContentMaps table to include new column
* add the table name // pageContentMaps new column to the tableIdMapping
* add the field list to componentFieldMapping
* add id column to pages in componentFieldMapping > pageContentMaps
* add new component logic to identifyingComponentFields
* add a new button to ContentForm
* add join to contentCRUD.js
