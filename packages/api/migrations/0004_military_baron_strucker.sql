CREATE TABLE `Note` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`text` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE cascade
);
