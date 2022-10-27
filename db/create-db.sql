-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema jobsgo
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `jobsgo` ;

-- -----------------------------------------------------
-- Schema jobsgo
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `jobsgo` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `jobsgo` ;

-- -----------------------------------------------------
-- Table `jobsgo`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jobsgo`.`user` (
  `id` VARCHAR(45) NOT NULL,
  `username` VARCHAR(16) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `phone` VARCHAR(15) NULL DEFAULT NULL,
  `avatar` VARCHAR(255) NULL DEFAULT NULL,
  `role` VARCHAR(20) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`, `username`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `phone_UNIQUE` (`phone` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `jobsgo`.`employer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jobsgo`.`employer` (
  `id` VARCHAR(45) NOT NULL,
  `about` LONGTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_employer_1`
    FOREIGN KEY (`id`)
    REFERENCES `jobsgo`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `jobsgo`.`job`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jobsgo`.`job` (
  `id` VARCHAR(45) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` LONGTEXT NOT NULL,
  `requirement` LONGTEXT NOT NULL,
  `tags` VARCHAR(45) NULL DEFAULT NULL,
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
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `jobsgo`.`jobseeker`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jobsgo`.`jobseeker` (
  `id` VARCHAR(45) NOT NULL,
  `interested` LONGTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_employer_10`
    FOREIGN KEY (`id`)
    REFERENCES `jobsgo`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `jobsgo`.`application`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jobsgo`.`application` (
  `jobseeker_id` VARCHAR(45) NOT NULL,
  `job_id` VARCHAR(45) NOT NULL,
  `marked` TINYINT NULL DEFAULT 0,
  `status` VARCHAR(45) NULL DEFAULT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL DEFAULT NULL,
  INDEX `fk_application_1_idx` (`job_id` ASC) VISIBLE,
  INDEX `fk_application_2_idx` (`jobseeker_id` ASC) VISIBLE,
  CONSTRAINT `fk_application_1`
    FOREIGN KEY (`job_id`)
    REFERENCES `jobsgo`.`job` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_application_2`
    FOREIGN KEY (`jobseeker_id`)
    REFERENCES `jobsgo`.`jobseeker` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `jobsgo`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jobsgo`.`comment` (
  `id` VARCHAR(45) NOT NULL,
  `job_id` VARCHAR(45) NOT NULL,
  `content` LONGTEXT NULL DEFAULT NULL,
  `author` VARCHAR(45) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_review_1_idx` (`job_id` ASC) VISIBLE,
  INDEX `fk_review_2_idx` (`author` ASC) VISIBLE,
  CONSTRAINT `fk_review_1`
    FOREIGN KEY (`job_id`)
    REFERENCES `jobsgo`.`job` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_review_2`
    FOREIGN KEY (`author`)
    REFERENCES `jobsgo`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
