CREATE TABLE `book` (
 `id` INT NOT NULL AUTO_INCREMENT,
 `title` VARCHAR(255) NOT NULL,
 `description` VARCHAR(255),
 `author` VARCHAR(100),
 `publicationDate` DATE NOT NULL,
 `edition` INT NOT NULL,
  PRIMARY KEY (`id`)
)