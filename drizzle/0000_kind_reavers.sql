CREATE TABLE `life_group` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`voucher` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
