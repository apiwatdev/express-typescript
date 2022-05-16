CREATE TABLE `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(100) NOT NULL,
  `fristname` VARCHAR(100),
  `lastname` VARCHAR(100),
  `isActive` BOOLEAN DEFAULT false,
  PRIMARY KEY (`id`)
);