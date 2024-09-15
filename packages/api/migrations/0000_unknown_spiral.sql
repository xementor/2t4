CREATE TABLE IF NOT EXISTS "Note" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" varchar NOT NULL,
	"content" text NOT NULL
);
