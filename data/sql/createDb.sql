CREATE SCHEMA `content`;

use `content`;

CREATE TABLE `pages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `slug` VARCHAR(750) NOT NULL UNIQUE COMMENT 'Url slug for a given page',
  `label` VARCHAR(255) NOT NULL,
  `pageOrder` INT,
  PRIMARY KEY (`id`));

CREATE TABLE `pageContentMaps` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `pageId` INT,
  `sectionId` INT,
  `committeeMemberId` INT,
  `documentId` INT,
  `newsId` INT,
  `noticeId` INT,
  `orderWeight` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `page` (`pageId` ASC),
  CONSTRAINT `sections` UNIQUE (`pageId`, `sectionId`),
  CONSTRAINT `committeeMembers` UNIQUE (`pageId`, `committeeMemberId`),
  CONSTRAINT `newsArticles` UNIQUE (`pageId`, `newsId`),
  CONSTRAINT `notices` UNIQUE (`pageId`, `noticeId`),
  CONSTRAINT `documents` UNIQUE (`pageId`, `documentId`));

CREATE TABLE `sections` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255),
  `subtitle` VARCHAR(255),
  `disclosure` VARCHAR(5000),
  `content` VARCHAR(10000) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `committeeMembers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fullName` VARCHAR(1000) NOT NULL,
  `committeeName` VARCHAR(255),
  `committeePosition` VARCHAR(255),
  PRIMARY KEY (`id`));

CREATE TABLE `documents` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `docUrl` VARCHAR(1000) NOT NULL,
  `docTitle` VARCHAR(255) NOT NULL,
  `docLabel` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `news` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `published` DATETIME,
  `newsHeadline` VARCHAR(255) NOT NULL,
  `newsSubtitle` VARCHAR(512) NOT NULL,
  `newsContent` VARCHAR(10000) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `publishedDate` (`published` DESC));

CREATE TABLE `notices` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `noticeTitle` VARCHAR(5000) NOT NULL,
  `noticeDate` DATETIME,
  `noticeTime` VARCHAR(255),
  `noticeLocation` VARCHAR(255),
  `noticeContent` VARCHAR(1000),
  PRIMARY KEY (`id`));
