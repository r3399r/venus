CREATE TABLE user (
	id UUID NOT NULL DEFAULT gen_random_uuid(),
	bill_id UUID NOT NULL,
	ver INT8 NOT NULL,
	member_id UUID NOT NULL,
	method STRING NOT NULL,
	value FLOAT NULL,
	amount FLOAT NOT NULL,
	date_created TIMESTAMP NULL,
	date_updated TIMESTAMP NULL,
	PRIMARY KEY (id ASC)
);