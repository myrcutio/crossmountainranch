CREATE SCHEMA `content`;

use `content`;

CREATE TABLE `pages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `slug` VARCHAR(750) NOT NULL UNIQUE COMMENT 'Url slug for a given page',
  `label` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `pageContentMaps` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `pageId` INT,
  `sectionId` INT,
  `committeeId` INT,
  `documentId` INT,
  `newsId` INT,
  `alertId` INT,
  `orderWeight` INT,
  PRIMARY KEY (`id`),
  INDEX `page` (`pageId` ASC),
  CONSTRAINT `sections` UNIQUE (`pageId`, `sectionId`),
  CONSTRAINT `committees` UNIQUE (`pageId`, `committeeId`),
  CONSTRAINT `newsArticles` UNIQUE (`pageId`, `newsId`),
  CONSTRAINT `alerts` UNIQUE (`pageId`, `alertId`),
  CONSTRAINT `documents` UNIQUE (`pageId`, `documentId`));

CREATE TABLE `sections` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255),
  `subtitle` VARCHAR(255),
  `date` DATETIME,
  `disclosure` VARCHAR(5000),
  `content` VARCHAR(10000),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

CREATE TABLE `members` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(255),
  `lastname` VARCHAR(255),
  `fullname` VARCHAR(1000) NOT NULL,
  `memberTitle` VARCHAR(255),
  `memberPosition` VARCHAR(255),
  `email` VARCHAR(255) UNIQUE,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

CREATE TABLE `committees` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

CREATE TABLE `committeeMemberAssociation` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `memberId` INT,
  `committeeId` INT,
  `orderWeight` INT,
  PRIMARY KEY (`id`),
  INDEX `committee` (`committeeId` ASC),
  CONSTRAINT `committeeMember` UNIQUE (`memberId`, `committeeId`));

CREATE TABLE `documents` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(1000) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `label` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `news` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `published` DATETIME,
  `title` VARCHAR(255) NOT NULL,
  `subtitle` VARCHAR(512) NOT NULL,
  `text` VARCHAR(10000) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `publishedDate` (`published` DESC));

CREATE TABLE `alerts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(5000) NOT NULL,
  `date` DATETIME,
  `location` VARCHAR(255),
  `description` VARCHAR(1000),
  PRIMARY KEY (`id`));