-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema jobsgo
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `jobsgo` ;

-- -----------------------------------------------------
-- Schema jobsgo
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `jobsgo` ;
USE `jobsgo` ;

-- -----------------------------------------------------
-- Table `jobsgo`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jobsgo`.`user` (
  `id` VARCHAR(45) NOT NULL,
  `username` VARCHAR(16) NOT NULL,
  `name` VARCHAR(45) NULL,
  `email` VARCHAR(255) NULL,
  `phone` VARCHAR(15) NULL,
  `avatar` VARCHAR(255) NULL,
  `role` VARCHAR(20) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`, `username`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `phone_UNIQUE` (`phone` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `jobsgo`.`employer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jobsgo`.`employer` (
  `id` VARCHAR(45) NOT NULL,
  `about` LONGTEXT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_employer_1`
    FOREIGN KEY (`id`)
    REFERENCES `jobsgo`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `jobsgo`.`jobs_description`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jobsgo`.`jobs_description` (
  `id` VARCHAR(45) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` LONGTEXT NOT NULL,
  `requirement` LONGTEXT NOT NULL,
  `tag` VARCHAR(45) NULL,
  `author` VARCHAR(45) NOT NULL,
  `start_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `end_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_jobs_desciption_1_idx` (`author` ASC) VISIBLE,
  CONSTRAINT `fk_jobs_desciption_1`
    FOREIGN KEY (`author`)
    REFERENCES `jobsgo`.`employer` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `jobsgo`.`review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jobsgo`.`review` (
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  `id` VARCHAR(45) NOT NULL,
  `jobs_description_id` VARCHAR(45) NOT NULL,
  `content` LONGTEXT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_review_1_idx` (`jobs_description_id` ASC) VISIBLE,
  CONSTRAINT `fk_review_1`
    FOREIGN KEY (`jobs_description_id`)
    REFERENCES `jobsgo`.`jobs_description` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `jobsgo`.`jobseeker`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jobsgo`.`jobseeker` (
  `id` VARCHAR(45) NOT NULL,
  `interested` LONGTEXT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_employer_10`
    FOREIGN KEY (`id`)
    REFERENCES `jobsgo`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `jobsgo`.`application`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jobsgo`.`application` (
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  `jobseeker_id` VARCHAR(45) NOT NULL,
  `jobs_description_id` VARCHAR(45) NOT NULL,
  INDEX `fk_application_1_idx` (`jobs_description_id` ASC) VISIBLE,
  INDEX `fk_application_2_idx` (`jobseeker_id` ASC) VISIBLE,
  CONSTRAINT `fk_application_1`
    FOREIGN KEY (`jobs_description_id`)
    REFERENCES `jobsgo`.`jobs_description` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_application_2`
    FOREIGN KEY (`jobseeker_id`)
    REFERENCES `jobsgo`.`jobseeker` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
