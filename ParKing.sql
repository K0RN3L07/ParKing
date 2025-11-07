CREATE DATABASE IF NOT EXISTS parking CHARACTER SET utf8 COLLATE utf8_hungarian_ci;

USE parking;

CREATE TABLE IF NOT EXISTS `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL UNIQUE,
	`phone_num` varchar(255) NOT NULL UNIQUE,
	`password` varchar(255) NOT NULL,
	`registered_at` timestamp NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `parking_spaces` (
	`id` int AUTO_INCREMENT NOT NULL,
	`floor_num` int NOT NULL,
	`parking_space_num` int NOT NULL,
	`type` varchar(255) NOT NULL,
	`price_per_hour` int NOT NULL,
	`is_available` boolean NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`parking_space_id` int NOT NULL,
	`start_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`end_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`payment_status` varchar(255) NOT NULL,
	`booked_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`plate_num` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`id`),
    
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE -- Törlés esetén felülír
        ON UPDATE CASCADE, -- Frissítés esetén felülír

    FOREIGN KEY (parking_space_id) REFERENCES parking_spaces(id)
        ON DELETE CASCADE -- Törlés esetén felülír
        ON UPDATE CASCADE) -- Frissítés esetén felülír
;