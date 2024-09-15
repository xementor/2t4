CREATE TABLE IF NOT EXISTS "Car" (
	"id" text PRIMARY KEY NOT NULL,
	"make" varchar NOT NULL,
	"model" varchar NOT NULL,
	"year" numeric NOT NULL,
	"color" text NOT NULL,
	"price" numeric NOT NULL,
	"mileage" numeric NOT NULL,
	"fuelType" text NOT NULL,
	"transmission" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Note" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" varchar NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL
);
