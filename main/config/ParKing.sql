CREATE DATABASE IF NOT EXISTS parking CHARACTER SET utf8 COLLATE utf8_hungarian_ci;

USE parking;

CREATE TABLE IF NOT EXISTS `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL UNIQUE,
	`phone_num` varchar(255) NOT NULL UNIQUE,
	`password` varchar(255) NOT NULL,
	`registered_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
	`start_time` datetime NOT NULL,
	`end_time` datetime NOT NULL,
	`parking_status` varchar(255),
	`payment_status` varchar(255) NOT NULL,
	`plate_num` varchar(255) NOT NULL,
	`booked_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`),
    
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE -- Törlés esetén felülír
        ON UPDATE CASCADE, -- Frissítés esetén felülír

    FOREIGN KEY (parking_space_id) REFERENCES parking_spaces(id)
        ON DELETE CASCADE -- Törlés esetén felülír
        ON UPDATE CASCADE) -- Frissítés esetén felülír
;

CREATE TABLE IF NOT EXISTS `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`message` text NOT NULL,
	`booked_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	
	PRIMARY KEY (`id`),

	FOREIGN KEY (user_id) REFERENCES users(id)
		ON DELETE CASCADE -- Törlés esetén felülír
        ON UPDATE CASCADE, -- Frissítés esetén felülír
)

INSERT INTO `parking_spaces` (`floor_num`, `parking_space_num`, `type`, `price_per_hour`, `is_available`) VALUES
(1, 1, 'Normál', 400, TRUE),
(1, 2, 'Normál', 400, TRUE),
(1, 3, 'Normál', 400, TRUE),
(1, 4, 'Normál', 400, TRUE),
(1, 5, 'Normál', 400, TRUE),
(1, 6, 'Normál', 400, TRUE),
(1, 7, 'Normál', 400, TRUE),
(1, 8, 'Normál', 400, TRUE),
(1, 9, 'Normál', 400, TRUE),
(1, 10, 'Normál', 400, TRUE),
(1, 11, 'Elektromos', 600, TRUE),
(1, 12, 'Elektromos', 600, TRUE),
(1, 13, 'Elektromos', 600, TRUE),
(1, 14, 'Mozgássérült', 300, TRUE),
(1, 15, 'Mozgássérült', 300, TRUE),
(1, 16, 'Elektromos', 600, TRUE),
(1, 17, 'Elektromos', 600, TRUE),
(1, 18, 'Elektromos', 600, TRUE),
(1, 19, 'Mozgássérült', 300, TRUE),
(1, 20, 'Mozgássérült', 300, TRUE),

(2, 1, 'Normál', 400, TRUE),
(2, 2, 'Normál', 400, TRUE),
(2, 3, 'Normál', 400, TRUE),
(2, 4, 'Normál', 400, TRUE),
(2, 5, 'Normál', 400, TRUE),
(2, 6, 'Normál', 400, TRUE),
(2, 7, 'Normál', 400, TRUE),
(2, 8, 'Normál', 400, TRUE),
(2, 9, 'Normál', 400, TRUE),
(2, 10, 'Normál', 400, TRUE),
(2, 11, 'Elektromos', 600, TRUE),
(2, 12, 'Elektromos', 600, TRUE),
(2, 13, 'Elektromos', 600, TRUE),
(2, 14, 'Mozgássérült', 300, TRUE),
(2, 15, 'Mozgássérült', 300, TRUE),
(2, 16, 'Elektromos', 600, TRUE),
(2, 17, 'Elektromos', 600, TRUE),
(2, 18, 'Elektromos', 600, TRUE),
(2, 19, 'Mozgássérült', 300, TRUE),
(2, 20, 'Mozgássérült', 300, TRUE),

(3, 1, 'Normál', 400, TRUE),
(3, 2, 'Normál', 400, TRUE),
(3, 3, 'Normál', 400, TRUE),
(3, 4, 'Normál', 400, TRUE),
(3, 5, 'Normál', 400, TRUE),
(3, 6, 'Normál', 400, TRUE),
(3, 7, 'Normál', 400, TRUE),
(3, 8, 'Normál', 400, TRUE),
(3, 9, 'Normál', 400, TRUE),
(3, 10, 'Normál', 400, TRUE),
(3, 11, 'Elektromos', 600, TRUE),
(3, 12, 'Elektromos', 600, TRUE),
(3, 13, 'Elektromos', 600, TRUE),
(3, 14, 'Mozgássérült', 300, TRUE),
(3, 15, 'Mozgássérült', 300, TRUE),
(3, 16, 'Elektromos', 600, TRUE),
(3, 17, 'Elektromos', 600, TRUE),
(3, 18, 'Elektromos', 600, TRUE),
(3, 19, 'Mozgássérült', 300, TRUE),
(3, 20, 'Mozgássérült', 300, TRUE),

(4, 1, 'Normál', 400, TRUE),
(4, 2, 'Normál', 400, TRUE),
(4, 3, 'Normál', 400, TRUE),
(4, 4, 'Normál', 400, TRUE),
(4, 5, 'Normál', 400, TRUE),
(4, 6, 'Normál', 400, TRUE),
(4, 7, 'Normál', 400, TRUE),
(4, 8, 'Normál', 400, TRUE),
(4, 9, 'Normál', 400, TRUE),
(4, 10, 'Normál', 400, TRUE),
(4, 11, 'Elektromos', 600, TRUE),
(4, 12, 'Elektromos', 600, TRUE),
(4, 13, 'Elektromos', 600, TRUE),
(4, 14, 'Mozgássérült', 300, TRUE),
(4, 15, 'Mozgássérült', 300, TRUE),
(4, 16, 'Elektromos', 600, TRUE),
(4, 17, 'Elektromos', 600, TRUE),
(4, 18, 'Elektromos', 600, TRUE),
(4, 19, 'Mozgássérült', 300, TRUE),
(4, 20, 'Mozgássérült', 300, TRUE),

(5, 1, 'Normál', 400, TRUE),
(5, 2, 'Normál', 400, TRUE),
(5, 3, 'Normál', 400, TRUE),
(5, 4, 'Normál', 400, TRUE),
(5, 5, 'Normál', 400, TRUE),
(5, 6, 'Normál', 400, TRUE),
(5, 7, 'Normál', 400, TRUE),
(5, 8, 'Normál', 400, TRUE),
(5, 9, 'Normál', 400, TRUE),
(5, 10, 'Normál', 400, TRUE),
(5, 11, 'Elektromos', 600, TRUE),
(5, 12, 'Elektromos', 600, TRUE),
(5, 13, 'Elektromos', 600, TRUE),
(5, 14, 'Mozgássérült', 300, TRUE),
(5, 15, 'Mozgássérült', 300, TRUE),
(5, 16, 'Elektromos', 600, TRUE),
(5, 17, 'Elektromos', 600, TRUE),
(5, 18, 'Elektromos', 600, TRUE),
(5, 19, 'Mozgássérült', 300, TRUE),
(5, 20, 'Mozgássérült', 300, TRUE);